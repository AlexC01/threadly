"use client";

import ErrorPage from "@/components/ErrorPage";

const error = () => {
	return (
		<ErrorPage
			title="Messages error"
			description="There was an error loading this chat, please try again later"
		/>
	);
};

export default error;
