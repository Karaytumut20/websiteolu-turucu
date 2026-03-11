import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import { DynamicRenderer } from "@/components/renderer/DynamicRenderer";
import LZUTF8 from "lzutf8";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

// Next.js 15: params and searchParams are Promises
interface PageProps {
    params: Promise<{ tenant_id: string; slug: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function TenantPage({ params }: PageProps) {
    const { tenant_id, slug } = await params;

    let tenantIdToSearch = tenant_id;

    // Since middleware rewrites custom domains to `/app/[custom_domain]/[slug]`
    // We need to resolve the tenant_id from the domain if it's not a UUID
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(tenant_id);

    if (!isUUID) {
        // Treat tenant_id as custom_domain or subdomain
        const tenant = await prisma.tenant.findFirst({
            where: {
                OR: [
                    { custom_domain: tenant_id },
                    { subdomain: tenant_id }
                ]
            }
        });

        if (!tenant) {
            return notFound();
        }
        tenantIdToSearch = tenant.id;
    }

    // Fetch from DB
    const page = await prisma.page.findUnique({
        where: {
            tenant_id_slug: {
                tenant_id: tenantIdToSearch,
                slug: slug,
            },
        },
        include: {
            tenant: true
        }
    });

    if (!page || !page.content) {
        return notFound();
    }

    // Check subscription status
    if (page.tenant.subscription_status !== "ACTIVE") {
        // MVP logic: In a real scenario, we might show a suspension page
        console.warn(`Tenant ${page.tenant.id} is INACTIVE`);
    }

    try {
        // If the content is compressed as Base64 string from lzutf8, decompress it.
        let parsedNodes;
        if (typeof page.content === "string") {
            try {
                const decompressed = LZUTF8.decompress(page.content, { inputEncoding: "Base64" });
                parsedNodes = JSON.parse(decompressed);
            } catch (e) {
                // Fallback if not compressed
                parsedNodes = JSON.parse(page.content);
            }
        } else {
            // It's already parsed JSONB object
            parsedNodes = page.content;

            // If the object stores a string inside some wrapper, handle it, but typically JSONB stores the raw object
            if (typeof parsedNodes === "object" && typeof (parsedNodes as any).compressed === "string") {
                const decompressed = LZUTF8.decompress((parsedNodes as any).compressed, { inputEncoding: "Base64" });
                parsedNodes = JSON.parse(decompressed);
            } else if (typeof parsedNodes === "string") {
                // Some ORMs return stringified JSONB
                const decompressed = LZUTF8.decompress(parsedNodes as any, { inputEncoding: "Base64" });
                parsedNodes = JSON.parse(decompressed);
            }
        }

        // Pass decompressed JSON to Dynamic Server-Component Renderer
        return (
            <main className="min-h-screen">
                <DynamicRenderer nodes={parsedNodes} />
            </main>
        );
    } catch (error) {
        console.error("Failed to parse or decompress page content:", error);
        return <div>Error loading page content.</div>;
    }
}
