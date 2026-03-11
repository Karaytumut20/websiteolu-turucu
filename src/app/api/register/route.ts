import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password, tenantName } = body;

        if (!email || !password || !tenantName) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { message: "User already exists" },
                { status: 409 }
            );
        }

        // Generate a default subdomain based on tenantName
        const baseSubdomain = tenantName.toLowerCase().replace(/[^a-z0-9]/g, "");
        let subdomain = baseSubdomain;
        let counter = 1;

        // Ensure subdomain uniqueness
        while (await prisma.tenant.findUnique({ where: { subdomain } })) {
            subdomain = `${baseSubdomain}${counter}`;
            counter++;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Create Tenant and User transactionally
        const user = await prisma.$transaction(async (tx) => {
            const tenant = await tx.tenant.create({
                data: {
                    name: tenantName,
                    subdomain: subdomain,
                },
            });

            return await tx.user.create({
                data: {
                    email,
                    password_hash: hashedPassword,
                    tenant_id: tenant.id,
                },
            });
        });

        return NextResponse.json(
            { message: "Account created successfully", tenantId: user.tenant_id },
            { status: 201 }
        );
    } catch (error) {
        console.error("Registration Error: ", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
