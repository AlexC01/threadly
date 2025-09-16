const routes = {
	home: "/",
	about: "/about",
	account: "/account",
	profile: "/profile",
	guidelines: "/guidelines",
	thread: "/thread",
};

export const publicRoutes = [routes.account];
export const protectedRoutes = [routes.profile];

export default routes;
