import CreateThreadForm from "@/components/Threads/CreateThreadForm";

const page = () => {
	return (
		<main className="min-h-screen">
			<div className="max-w-7xl mx-auto py-12 md:py-16">
				<div className="text-center py-12 px-4">
					<h1 className="text-5xl font-bold md:text-7xl tracking-tighter">
						Create Thread
					</h1>
				</div>
				<div className="mt-6 px-4 md:px-8">
					<CreateThreadForm />
				</div>
			</div>
		</main>
	);
};

export default page;
