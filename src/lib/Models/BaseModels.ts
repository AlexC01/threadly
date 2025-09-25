import type { Database, Tables } from "./supabase";

export type ThreadWithStats =
	Database["public"]["Functions"]["get_threads_with_stats"]["Returns"][number];

export type CorrectedThreadWithStats = Omit<ThreadWithStats, "user_vote"> & {
	user_vote: number | null;
};

export type ThreadBookmarks =
	Database["public"]["Functions"]["get_bookmarked_threads"]["Returns"][number];

export type CorrectedThreadBookmarks = Omit<ThreadBookmarks, "user_vote"> & {
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

export type UserStatsType =
	Database["public"]["Functions"]["get_user_stats"]["Returns"][number];

export type UserThreadsType =
	Database["public"]["Functions"]["get_threads_by_user"]["Returns"][number];

export type CorrectedUserThreadsType = Omit<UserThreadsType, "user_vote"> & {
	user_vote: number | null;
};

export type UserCommentsType =
	Database["public"]["Functions"]["get_posts_by_user"]["Returns"][number];

export type CorrectedUserCommentsType = Omit<UserCommentsType, "user_vote"> & {
	user_vote: number | null;
};

export type UserConversationsType =
	Database["public"]["Functions"]["get_user_conversations"]["Returns"][number];

export type MessagesArray = Tables<"messages">;

export type UsernameFromConversation =
	Database["public"]["Functions"]["get_conversation_participant"]["Returns"][number];

export type SearchThreadsType =
	Database["public"]["Functions"]["search_threads"]["Returns"][number];

export type CorrectedSearchThreadsType = Omit<
	SearchThreadsType,
	"user_vote"
> & {
	user_vote: number | null;
};
