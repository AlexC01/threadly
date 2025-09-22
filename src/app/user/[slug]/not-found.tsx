import NotFoundPage from "@/components/NotFoundPage";

const notFound = () => {
	return (
		<NotFoundPage
			title="User does not exist"
			description="User not found, please try again with another user"
		/>
	);
};

export default notFound;
