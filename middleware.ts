import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  console.log("middleware");

  if (!request.cookies.has("jwt")) {
    const url = new URL("/auth/login", request.url);
    console.log("url ", url.toString());
    return Response.redirect(url);
  }
  console.log("Cookie is here, move to next request");
  NextResponse.next();
}

export const config = {
  matcher: ["/", "/guides"],
};
