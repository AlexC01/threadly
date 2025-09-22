"use client";

import ErrorPage from "@/components/ErrorPage";

const error = () => {
	return (
		<ErrorPage
			title="User"
			description="There was an error loading this user profile, please try again later"
		/>
	);
};

export default error;
