import SearchThreads from "@/components/Search/SearchThreads";
import { createClient } from "@/lib/supabase/server";

const page = async ({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	const { q } = await searchParams;

	if (!q) {
		return (
			<main className="min-h-screen">
				<div className="max-w-7xl mx-auto py-12 md:py-16">
					<div className="px-4">
						<h1 className="text-2xl text-center md:text-4xl">
							No results were found
						</h1>
					</div>
				</div>
			</main>
		);
	}

	const { data: threads, error } = await supabase.rpc("search_threads", {
		current_user_id: user ? user.id : undefined,
		search_term: q,
	});

	if (error) throw new Error("Error while searching");

	return (
		<main className="min-h-screen">
			<div className="max-w-7xl mx-auto py-12 md:py-16">
				<div className="px-4">
					<h1 className="text-2xl md:text-4xl">
						Results for: <span className="font-semibold">{q}</span>
					</h1>
				</div>
				<div className="mt-10 px-4 md:px-8">
					{threads && threads.length > 0 && (
						<SearchThreads initialThreads={threads ?? []} />
					)}
					{(!threads || threads.length === 0) && (
						<h2 className="text-center text-lg">No results were found...</h2>
					)}
				</div>
			</div>
		</main>
	);
};

export default page;
