/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: <The content of the comments contains HTML, and we are sanitizing it before displaying it> */
"use client";
import DOMPurify from "dompurify";
import {
	ArrowBigDown,
	ArrowBigUp,
	Loader,
	LoaderCircle,
	Send,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { ThreadCommentsType } from "@/lib/Models/BaseModels";
import { supabase } from "@/lib/supabaseClient";
import { TiptapEditor } from "../RichTextEditor";
import TimeAgo from "../TimeAgo";

interface ThreadCommentsProps {
	initialComments: ThreadCommentsType[];
	thread_id: number;
	comment_count: number;
}

const MAX_COMMENTS = 5;

const ThreadComments = ({
	initialComments,
	thread_id,
	comment_count,
}: ThreadCommentsProps) => {
	const [loading, setLoading] = useState(false);
	const [loadingComments, setLoadingComments] = useState(false);
	const [content, setContent] = useState("");
	const [comments, setComments] = useState(initialComments);

	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(comments.length === MAX_COMMENTS);

	const fetchComments = async (pageNumber: number) => {
		setLoadingComments(true);
		const from = pageNumber * MAX_COMMENTS;
		const to = from + MAX_COMMENTS - 1;
		try {
			const { data, error } = await supabase
				.rpc("get_posts_for_thread", {
					thread_id_input: thread_id,
				})
				.range(from, to);

			if (error) throw new Error();
			else {
				if (pageNumber === 0) {
					setComments(data);
					setPage(1);
				} else {
					setComments((prev) => [...prev, ...data]);
					setPage((prevPage) => prevPage + 1);
				}
				setHasMore(data.length === MAX_COMMENTS);
			}
		} catch (err) {
			console.error(err);
			toast.error("Error fetching comments, please reload the page");
		} finally {
			setLoadingComments(false);
		}
	};

	const handleSubmit = async () => {
		if (content.trim() === "") return;
		setLoading(true);
		try {
			const { error } = await supabase
				.from("posts")
				.insert({ thread_id, content });

			if (error) throw new Error();
			else {
				toast.success("Comment was submited");
				setContent("");
				fetchComments(0);
			}
		} catch (err) {
			console.error(err);
			toast.error("Error while submiting reply");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="mt-20">
			<div className="flex flex-col gap-4">
				<TiptapEditor
					content={content}
					limit={3000}
					onChange={(newContent: string) => setContent(newContent)}
				/>
				<Button
					disabled={
						content.replace(/<.+?>/g, "").trim() === "" ||
						loading ||
						loadingComments
					}
					onClick={handleSubmit}
					className="self-end flex items-center"
				>
					{!loading && (
						<>
							Submit Reply
							<Send />
						</>
					)}
					{loading && (
						<>
							Loading...
							<LoaderCircle className="animate-spin" />
						</>
					)}
				</Button>
			</div>
			<Separator className="mt-12" />
			<h2 className="mt-4 text-xl font-bold">Replies ({comment_count})</h2>
			{comments.length === 0 && (
				<div className="mt-4 flex justify-center items-center flex-col">
					<h3 className="text-2xl font-semibold text-muted-foreground">
						Be the first to comment
					</h3>
					<p className="mt-4 max-w-md text-center text-muted-foreground">
						Nobody's responded to this post yet. Add your thoughts and get the
						conversation going.
					</p>
				</div>
			)}
			<div className="mt-5 relative">
				{comments.length > 0 &&
					comments.map((comment) => {
						const clean = DOMPurify.sanitize(comment.content);
						return (
							<Card key={comment.id} className="p-4 flex flex-col mb-7 gap-5">
								<p className="text-muted-foreground text-sm">
									{!comment.username ? "Anonymous" : comment.username} -{" "}
									<TimeAgo dateString={comment.created_at} />
								</p>
								<div
									className="mt-0 tiptap"
									dangerouslySetInnerHTML={{ __html: clean }}
								/>
								<div className="flex flex-row gap-2 items-center mt-2">
									<button
										type="button"
										aria-label="Upvote Comment"
										className="transition-all duration-200 cursor-pointer hover:bg-red-300 hover:text-red-600 p-1 rounded-full"
									>
										<ArrowBigUp />
									</button>
									<span className="block font-bold text-lg text-foreground">
										{comment.vote_count}
									</span>
									<button
										type="button"
										aria-label="Downvote Comment"
										className="transition-all duration-200 cursor-pointer hover:bg-red-300 hover:text-red-600 p-1 rounded-full"
									>
										<ArrowBigDown />
									</button>
								</div>
							</Card>
						);
					})}
				{hasMore && (
					<div className="flex justify-center mt-10">
						<Button
							onClick={() => fetchComments(page)}
							disabled={loadingComments}
							className="flex items-center"
							aria-label="Load More comments"
						>
							{loadingComments ? "Loading..." : "Load More"}
							{loadingComments && <Loader className="animate-spin" />}
						</Button>
					</div>
				)}
			</div>
		</div>
	);
};

export default ThreadComments;
