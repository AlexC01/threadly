"use client";

import ErrorPage from "@/components/ErrorPage";

const error = () => {
	return (
		<ErrorPage
			title="Bookmarks"
			description="There was an error loading your bookmarks, please try again later"
		/>
	);
};

export default error;
