const routes = {
	home: "/",
	about: "/about",
	account: "/account",
	profile: "/profile",
	bookmarks: "/bookmarks",
	guidelines: "/guidelines",
	thread: "/thread",
	createThread: "/thread/create",
};

export const publicRoutes = [routes.account];
export const protectedRoutes = [routes.profile];

export default routes;
