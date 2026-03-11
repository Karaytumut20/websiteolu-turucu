import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const resolvedParams = await params;
    try {
        const session = await auth();
        if (!session || !session.user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const tenantId = (session.user as any).tenantId;

        const page = await prisma.page.findUnique({
            where: { id: resolvedParams.id },
        });

        if (!page || page.tenant_id !== tenantId) {
            return new NextResponse("Not Found", { status: 404 });
        }

        return NextResponse.json(page);
    } catch (error) {
        console.error("Page Get Error", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const resolvedParams = await params;
    try {
        const session = await auth();
        if (!session || !session.user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const tenantId = (session.user as any).tenantId;
        const body = await req.json();
        const { content } = body;

        if (!content || !content.format || !content.data) {
            return new NextResponse("Invalid content format", { status: 400 });
        }

        // Verify ownership
        const existingPage = await prisma.page.findUnique({
            where: { id: resolvedParams.id },
        });

        if (!existingPage || existingPage.tenant_id !== tenantId) {
            return new NextResponse("Not Found or Unauthorized", { status: 404 });
        }

        const updatedPage = await prisma.page.update({
            where: { id: resolvedParams.id },
            data: { content },
        });

        return NextResponse.json(updatedPage);
    } catch (error) {
        console.error("Page Update (Save) Error", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
