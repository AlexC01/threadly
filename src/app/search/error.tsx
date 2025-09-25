"use client";

import ErrorPage from "@/components/ErrorPage";

const error = () => {
	return (
		<ErrorPage
			title="Search"
			description="There was an error loading this search, please try again later"
		/>
	);
};

export default error;
