import type { Database } from "./supabase";

export type ThreadWithStats =
	Database["public"]["Functions"]["get_threads_with_stats"]["Returns"][number];

export type CorrectedThreadWithStats = Omit<ThreadWithStats, "user_vote"> & {
	user_vote: number | null;
};

export type ThreadSingle =
	Database["public"]["Functions"]["get_thread_details_by_slug"]["Returns"][number];

export type CorrectedThreadSingle = Omit<ThreadSingle, "user_vote"> & {
	user_vote: number | null;
};

export type ThreadCommentsType =
	Database["public"]["Functions"]["get_posts_for_thread"]["Returns"][number];

export type CorrectedCommentType = Omit<ThreadCommentsType, "user_vote"> & {
	user_vote: number | null;
};
