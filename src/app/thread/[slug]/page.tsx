import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import ThreadDetail from "@/components/Threads/ThreadDetail";
import routes from "@/lib/routes";
import { createClient } from "@/lib/supabase/server";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
	const supabase = await createClient();
	const { slug } = await params;

	const { data: thread, error } = await supabase
		.rpc("get_thread_details_by_slug", { slug_input: slug })
		.single();

	if (error || !thread) {
		return <div>Thread Not Found</div>;
	}

	const { data: posts } = await supabase
		.rpc("get_posts_for_thread", {
			thread_id_input: thread.id,
		})
		.range(0, 4);

	return (
		<main className="min-h-screen">
			<div className="max-w-7xl mx-auto py-12 md:py-16 px-4 md:px-8 xl:px-4">
				<div className="mb-8">
					<Link
						href={routes.home}
						className="flex items-center gap-2 hover:underline cursor-pointer"
					>
						<ChevronLeft className="w-4 h-4" />
						<span className="inline-block text-muted-foreground">
							Back to all threads
						</span>
					</Link>
				</div>
				<ThreadDetail thread={thread} comments={posts || []} />
			</div>
		</main>
	);
};

export default page;
