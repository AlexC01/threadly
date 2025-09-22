"use client";

import ErrorPage from "@/components/ErrorPage";

const error = () => {
	return (
		<ErrorPage
			title="Thread Details"
			description="There was an error loading this thread, please try again later"
		/>
	);
};

export default error;
