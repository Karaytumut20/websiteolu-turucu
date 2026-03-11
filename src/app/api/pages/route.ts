import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function GET(req: Request) {
    try {
        const session = await auth();
        if (!session || !session.user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const tenantId = (session.user as any).tenantId;

        const pages = await prisma.page.findMany({
            where: { tenant_id: tenantId },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(pages);
    } catch (error) {
        console.error("Pages API Error", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session || !session.user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const tenantId = (session.user as any).tenantId;

        const body = await req.json();
        const { title, slug } = body;

        if (!title || !slug) {
            return new NextResponse("Missing title or slug", { status: 400 });
        }

        // Default basic empty Craft.js node state for a new page
        const emptyState = {
            ROOT: {
                type: "Container",
                isCanvas: true,
                props: {
                    padding: 20,
                    background: "#ffffff",
                },
                displayName: "Container",
                custom: {},
                hidden: false,
                nodes: [],
                linkedNodes: {},
            },
        };

        const page = await prisma.page.create({
            data: {
                title,
                slug,
                tenant_id: tenantId,
                content: emptyState,
            },
        });

        return NextResponse.json(page, { status: 201 });
    } catch (error: any) {
        if (error.code === 'P2002') {
            return new NextResponse("A page with this slug already exists", { status: 409 });
        }
        console.error("Pages API Error", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
