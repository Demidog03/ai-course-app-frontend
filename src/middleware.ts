import {NextRequest, NextResponse} from "next/server";
import {UserProfile, UserRolesEnum} from "@/modules/users/apis/users.api.types";

const privateRoutes = [
    { path: '/courses', allowedRoles: [UserRolesEnum.USER, UserRolesEnum.AUTHOR, UserRolesEnum.ADMIN] },
    { path: '/courses/:id', allowedRoles: [UserRolesEnum.USER, UserRolesEnum.AUTHOR, UserRolesEnum.ADMIN] },
    { path: '/courses/edit/:id', allowedRoles: [UserRolesEnum.AUTHOR, UserRolesEnum.ADMIN] },
]

const publicRoutes = ['/login', '/register']

export function middleware(req: NextRequest) {
    const token = req.cookies.get('token')?.value
    const user = JSON.parse(req.cookies.get('user')?.value || 'null') as UserProfile | null

    const { pathname } = req.nextUrl

    const isPublicRoute = publicRoutes.includes(pathname)

    if (!(token && user) && !isPublicRoute) {
        return NextResponse.redirect(new URL('/login', req.url))
    }
    if (token && user && pathname === '/') {
        return NextResponse.redirect(new URL('/courses', req.url))
    }
    if (token && user && isPublicRoute) {
        return NextResponse.redirect(new URL('/courses', req.url))
    }

    // Проверка пути по доступу (role guard)
    const matchedRoute = privateRoutes.find(route => route.path === pathname)

    if (matchedRoute) {
        if (!user?.role?.name || !matchedRoute.allowedRoles.includes(user.role.name)) {
            return NextResponse.redirect(new URL('/courses', req.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}