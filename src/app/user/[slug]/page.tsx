import { notFound } from "next/navigation";
import ProfileHeader from "@/components/User/Profile/ProfileHeader";
import UserContent from "@/components/User/UserContent";
import type {
	CorrectedUserCommentsType,
	CorrectedUserThreadsType,
	UserStatsType,
} from "@/lib/Models/BaseModels";
import { createClient } from "@/lib/supabase/server";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
	const supabase = await createClient();

	const { slug } = await params;

	const { data: profile, error } = await supabase
		.from("profiles")
		.select("id, username, created_at")
		.eq("username", slug)
		.single();

	if (!profile) notFound();

	if (error) throw new Error();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	let stats: UserStatsType | null = null;
	let threads: CorrectedUserThreadsType[] | null = null;
	let posts: CorrectedUserCommentsType[] | null = null;

	try {
		const [statsRes, threadsRes, postsRes] = await Promise.all([
			supabase.rpc("get_user_stats", { user_id_input: profile.id }).single(),
			supabase.rpc("get_threads_by_user", {
				user_id_input: profile.id,
				current_user_id: user ? user.id : undefined,
			}),
			supabase.rpc("get_posts_by_user", {
				user_id_input: profile.id,
				current_user_id: user ? user.id : undefined,
			}),
		]);

		stats = statsRes.data;
		threads = threadsRes.data;
		posts = postsRes.data;
	} catch (err) {
		throw new Error();
	}

	return (
		<main className="min-h-screen">
			<div className="max-w-7xl mx-auto py-12 md:py-16">
				<ProfileHeader
					userInfo={{
						username: profile.username ?? "Anonymous",
						created_at: profile.created_at ?? "",
					}}
					stats={stats}
					edit={user ? user.id === profile.id : false}
				/>
				<UserContent
					initialThreads={threads || []}
					profile
					initialComments={posts || []}
				/>
			</div>
		</main>
	);
};

export default page;
