export interface ThreadInterface {
	id: number;
	created_at: string;
	title: string;
	content: string;
	user_id: number | null;
	comment_count: number;
	vote_count: number;
	slug: string;
}
