import BookmarksLayout from "@/components/Bookmarks/BookmarksLayout";
import { createClient } from "@/lib/supabase/server";

const page = async () => {
	const supabase = await createClient();

	const { data } = await supabase.auth.getUser();

	if (!data.user) {
		return (
			<main className="min-h-screen">
				<div className="max-w-7xl mx-auto py-12 md:py-16">
					<div className="text-center py-12 px-4">
						<h1 className="text-5xl font-bold md:text-7xl tracking-tighter">
							There was an error, please try again
						</h1>
					</div>
				</div>
			</main>
		);
	}

	const { data: threads } = await supabase.rpc("get_bookmarked_threads", {
		current_user_id: data.user.id,
	});

	return (
		<main className="min-h-screen">
			<div className="max-w-7xl mx-auto py-12 md:py-16">
				<div className="text-center py-12 px-4">
					<h1 className="text-5xl font-bold md:text-7xl tracking-tighter">
						Your Bookmarks
					</h1>
				</div>
				<div className="mt-10 px-4 md:px-8">
					<BookmarksLayout initialThreads={threads ?? []} />
				</div>
			</div>
		</main>
	);
};

export default page;
