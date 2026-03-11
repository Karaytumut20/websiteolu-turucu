import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email as string },
                    include: { tenant: true }
                });

                if (!user) {
                    return null;
                }

                const isValid = await bcrypt.compare(
                    credentials.password as string,
                    user.password_hash
                );

                if (!isValid) {
                    return null;
                }

                return {
                    id: user.id,
                    email: user.email,
                    tenantId: user.tenant_id,
                    tenantName: user.tenant.name
                };
            }
        })
    ],
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            if (user) {
                token.tenantId = (user as any).tenantId;
                token.tenantName = (user as any).tenantName;
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                (session.user as any).tenantId = token.tenantId;
                (session.user as any).tenantName = token.tenantName;
            }
            return session;
        }
    },
    pages: {
        signIn: "/login",
    },
    session: { strategy: "jwt" }
});
