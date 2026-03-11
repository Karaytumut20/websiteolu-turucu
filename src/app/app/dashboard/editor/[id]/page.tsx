import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";
import { redirect, notFound } from "next/navigation";
import { Editor } from "@/components/editor/Editor";

const prisma = new PrismaClient();

export default async function EditorPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const resolvedParams = await params;
    const session = await auth();

    if (!session || !session.user) {
        redirect("/login");
    }

    const tenantId = (session.user as any).tenantId;

    // Verify the page belongs to this tenant
    const page = await prisma.page.findUnique({
        where: { id: resolvedParams.id },
    });

    if (!page || page.tenant_id !== tenantId) {
        notFound();
    }

    // Pass JSON data or stringified data if present
    // If the content is an object (or jsonb) from Prisma, we need to pass it to Editor
    // Note: LZUTF8 requires a base64 string, so if it's stored as plain JSON we must stringify
    const contentState = !page.content
        ? undefined
        : (typeof page.content === "string" ? page.content : JSON.stringify(page.content));

    return (
        <div className="h-screen w-full bg-background overflow-hidden">
            <Editor pageId={page.id} initialState={contentState} />
        </div>
    );
}
