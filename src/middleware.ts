import { NextRequest, NextResponse } from "next/server";
import { getCookieServer } from '@/lib/cookieServer';
import { api } from '@/services/api';

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    if (pathname === "/_next" || pathname === "/") {
        return NextResponse.next();
    }

    // Check if user is authenticated
    const token = await getCookieServer();

    if (pathname.startsWith("/dashboard")) {
        if (!token) {
            return NextResponse.redirect(new URL("/", req.url));
        }

        const isValid = await validateToken(token as string);

        if (!isValid) {
            return NextResponse.redirect(new URL("/", req.url));
        }
    }

    return NextResponse.next();
}

async function validateToken(token: string) {
    if (!token) {
        return false;
    }

    try {
        await api.get("/me", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}