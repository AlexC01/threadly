import ProfileHeader from "@/components/User/Profile/ProfileHeader";
import UserContent from "@/components/User/UserContent";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type {
	CorrectedUserCommentsType,
	CorrectedUserThreadsType,
	UserStatsType,
} from "@/lib/Models/BaseModels";
import { createClient } from "@/lib/supabase/server";

const page = async () => {
	const supabase = await createClient();

	const {
		data: { user },
		error,
	} = await supabase.auth.getUser();

	if (!user || error) throw new Error();

	let stats: UserStatsType | null = null;
	let threads: CorrectedUserThreadsType[] | null = null;
	let posts: CorrectedUserCommentsType[] | null = null;

	try {
		const [statsRes, threadsRes, postsRes] = await Promise.all([
			supabase.rpc("get_user_stats", { user_id_input: user.id }).single(),
			supabase.rpc("get_threads_by_user", {
				user_id_input: user.id,
				current_user_id: user.id,
			}),
			supabase.rpc("get_posts_by_user", {
				user_id_input: user.id,
				current_user_id: user.id,
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
				<ProfileHeader userInfo={user} stats={stats} edit />
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
