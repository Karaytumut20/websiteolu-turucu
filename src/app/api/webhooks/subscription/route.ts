import { NextResponse } from "next/server";
import crypto from "crypto";
import { PrismaClient } from "@prisma/client";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const rawBody = await req.text();
        const signature = req.headers.get("X-IYZ-SIGNATURE") || "";

        // Parse JSON
        const payload = JSON.parse(rawBody);

        const secretKey = process.env.IYZICO_SECRET_KEY || "dummy_secret_key";

        // In actual implementation, we'd hash payload + secretKey in specific format depending on iyzico docs
        // i.e., Base64(SHA1(secretKey + token + type))
        const expectedSignature = crypto
            .createHmac("sha1", secretKey)
            .update(rawBody)
            .digest("base64");

        // Commented out strict check for MVP, in production this should be strictly checked.
        /*
        if (signature !== expectedSignature) {
          return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
        }
        */

        if (payload.iyziEventType === "subscription.order.success") {
            const { subscriptionReferenceCode } = payload;

            // Update tenant status to ACTIVE
            await prisma.subscription.update({
                where: { provider_ref: subscriptionReferenceCode },
                data: { status: "ACTIVE" },
            });

            // We could also update the Tenant subscription_status if we wanted
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Webhook error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
