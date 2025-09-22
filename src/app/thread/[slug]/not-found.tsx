import NotFoundPage from "@/components/NotFoundPage";

const notFound = () => {
	return (
		<NotFoundPage
			title="Thread does not exist"
			description="Thread not found, please try again with another thread"
		/>
	);
};

export default notFound;
