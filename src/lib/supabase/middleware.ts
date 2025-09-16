/** biome-ignore-all lint/suspicious/useIterableCallbackReturn: <explanation> */
import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import routes, { protectedRoutes, publicRoutes } from "../routes";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export async function updateSession(request: NextRequest) {
	let supabaseResponse = NextResponse.next({
		request,
	});

	const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
		cookies: {
			getAll() {
				return request.cookies.getAll();
			},
			setAll(cookiesToSet) {
				cookiesToSet.forEach(({ name, value, options }) =>
					request.cookies.set(name, value),
				);
				supabaseResponse = NextResponse.next({
					request,
				});
				cookiesToSet.forEach(({ name, value, options }) =>
					supabaseResponse.cookies.set(name, value, options),
				);
			},
		},
	});

	// Do not run code between createServerClient and
	// supabase.auth.getUser(). A simple mistake could make it very hard to debug
	// issues with users being randomly logged out.

	// IMPORTANT: DO NOT REMOVE auth.getUser()

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (user && publicRoutes.includes(request.nextUrl.pathname)) {
		const url = request.nextUrl.clone();
		url.pathname = routes.home;
		return NextResponse.redirect(url);
	} else if (!user && protectedRoutes.includes(request.nextUrl.pathname)) {
		// no user, potentially respond by redirecting the user to the login page
		const url = request.nextUrl.clone();
		url.pathname = routes.account;
		return NextResponse.redirect(url);
	}

	// IMPORTANT: You *must* return the supabaseResponse object as it is.
	// If you're creating a new response object with NextResponse.next() make sure to:
	// 1. Pass the request in it, like so:
	//    const myNewResponse = NextResponse.next({ request })
	// 2. Copy over the cookies, like so:
	//    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
	// 3. Change the myNewResponse object to fit your needs, but avoid changing
	//    the cookies!
	// 4. Finally:
	//    return myNewResponse
	// If this is not done, you may be causing the browser and server to go out
	// of sync and terminate the user's session prematurely!

	return supabaseResponse;
}
