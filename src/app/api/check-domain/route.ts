import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function GET(req: Request) {
    // Caddy passes the domain in the "domain" query parameter
    const url = new URL(req.url);
    const domain = url.searchParams.get("domain");

    if (!domain) {
        return NextResponse.json({ error: "Missing domain parameter" }, { status: 400 });
    }

    try {
        // Check if the domain is registered as a custom_domain for any tenant
        const tenant = await prisma.tenant.findUnique({
            where: { custom_domain: domain },
        });

        if (tenant) {
            // Return 200 OK so Caddy knows to issue the certificate
            return new NextResponse(null, { status: 200 });
        } else {
            // We can also allow subdomains if we use a wildcard or specific rules
            return new NextResponse(null, { status: 404 });
        }
    } catch (error) {
        console.error("Domain check error:", error);
        return new NextResponse(null, { status: 500 });
    }
}
