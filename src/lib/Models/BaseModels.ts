import type { Database } from "./supabase";

export type ThreadWithStats =
	Database["public"]["Functions"]["get_threads_with_stats"]["Returns"][number];
