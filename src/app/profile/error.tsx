"use client";

import ErrorPage from "@/components/ErrorPage";

const error = () => {
	return (
		<ErrorPage
			title="Profile"
			description="There was an error loading your profile, please try again later"
		/>
	);
};

export default error;
