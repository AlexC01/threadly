const routes = {
	home: "/",
	about: "/about",
	account: "/account",
	user: "/user",
	profile: "/profile",
	bookmarks: "/bookmarks",
	guidelines: "/guidelines",
	thread: "/thread",
	createThread: "/thread/create",
};

export const publicRoutes = [routes.account];
export const protectedRoutes = [routes.profile, routes.bookmarks];

export default routes;
