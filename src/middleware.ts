import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const protectedRoutes = ["/auth/profile", "/admin/dashboard"];

export async function middleware(req: NextRequest) {
    const { nextUrl } = req;
    const sessionCookie = getSessionCookie(req);

    const res = NextResponse.next();

    const isLoggedIn = !!sessionCookie;
    const isOnProtectedRoute = protectedRoutes.includes(nextUrl.pathname);

    if (isOnProtectedRoute && !isLoggedIn) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    return res;
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
    ],
};
