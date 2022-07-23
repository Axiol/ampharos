import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export const middleware = async (request: NextRequest) => {
  const paths = request.nextUrl.pathname.split('/')

  const link = await (await fetch(`${request.nextUrl.origin}/api/url/${paths[2]}`)).json()

  if(!link?.url) {
    return NextResponse.redirect(request.nextUrl.origin)
  }

  return NextResponse.redirect(link.url)
}

export const config = {
  matcher: '/l/:path*'
}