"use client";

import ErrorPage from "@/components/ErrorPage";

const error = () => {
	return (
		<ErrorPage
			title="Messages Error"
			description="There was an error loading the messages page, please try again later"
		/>
	);
};

export default error;
