import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUser } from "./lib/github/client";

// Define paths that don't require authentication
const PUBLIC_PATHS = ["/login", "/api"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const { data: user, error } = await getUser();

  if (pathname.startsWith("/login") && user) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  if (error || !user) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
