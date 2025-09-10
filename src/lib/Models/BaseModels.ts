import type { Database } from "./supabase";

export type ThreadWithStats =
	Database["public"]["Functions"]["get_threads_with_stats"]["Returns"][number];

export type ThreadSingle =
	Database["public"]["Functions"]["get_thread_details_by_slug"]["Returns"][number];
