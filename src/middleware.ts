import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  
  // Get hostname (e.g. 'builder.com', 'test.builder.com')
  const hostname = req.headers.get("host") || "";

  // Define allowed domains (in production, read from env)
  const mainDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "builder.com";

  // Exclude app/dashboard, login, api etc.
  if (
    url.pathname.startsWith("/app") ||
    url.pathname.startsWith("/api") ||
    hostname === "localhost:3000" ||
    hostname === mainDomain
  ) {
    return NextResponse.next();
  }

  // Handle subdomain and custom domain
  let tenantDomain = hostname;

  // Rewrite /app/[tenant_id]/[slug]
  // Since we don't have direct DB access in Edge runtime without Prisma Edge,
  // we pass the hostname through to the app router layout/page to fetch tenant_id.
  // We rewrite the URL to /app/[tenantDomain] + path
  const searchParams = req.nextUrl.searchParams.toString();
  const searchString = searchParams ? `?${searchParams}` : "";

  return NextResponse.rewrite(
    new URL(`/app/${tenantDomain}${url.pathname}${searchString}`, req.url)
  );
}
