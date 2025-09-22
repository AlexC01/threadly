/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: <The content of the comments contains HTML, and we are sanitizing it before displaying it> */
/** biome-ignore-all lint/style/noNonNullAssertion: <explanation> */
"use client";
import type { User } from "@supabase/supabase-js";
import DOMPurify from "dompurify";
import {
	ArrowBigDown,
	ArrowBigUp,
	Loader,
	LoaderCircle,
	Send,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { CorrectedCommentType } from "@/lib/Models/BaseModels";
import routes from "@/lib/routes";
import { calculateScore } from "@/lib/services/handleLikes";
import useAuth from "@/lib/stores/useAuth";
import { supabase } from "@/lib/supabase/client";
import DeleteModal from "../DeleteModal";
import { TiptapEditor } from "../RichTextEditor";
import TimeAgo from "../TimeAgo";

interface ThreadCommentsProps {
	initialComments: CorrectedCommentType[];
	thread_id: number;
	comment_count: number;
	currentUser: User | null;
}

const MAX_COMMENTS = 5;

const ThreadComments = ({
	initialComments,
	thread_id,
	comment_count,
	currentUser,
}: ThreadCommentsProps) => {
	const { user } = useAuth();
	const [loading, setLoading] = useState(false);
	const [loadingComments, setLoadingComments] = useState(false);
	const [content, setContent] = useState("");
	const [comments, setComments] = useState<CorrectedCommentType[]>([]);
	const [loadingDelete, setLoadingDelete] = useState(false);

	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(
		initialComments.length === MAX_COMMENTS,
	);

	const fetchComments = async (pageNumber: number) => {
		setLoadingComments(true);
		const from = pageNumber * MAX_COMMENTS;
		const to = from + MAX_COMMENTS - 1;
		try {
			const { data, error } = await supabase
				.rpc("get_posts_for_thread", {
					thread_id_input: thread_id,
					current_user_id: user ? user.id : undefined,
				})
				.range(from, to);

			if (error) throw new Error();
			else {
				const cleanComments = data.map((comment) => {
					const clean = DOMPurify.sanitize(comment.content);
					return { ...comment, content: clean };
				});
				if (pageNumber === 0) {
					setComments(cleanComments);
					setPage(1);
				} else {
					setComments((prev) => [...prev, ...cleanComments]);
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
				.insert({ thread_id, content, user_id: user ? user.id : undefined });

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

	const handleCommentLikes = async (
		commentId: number,
		voteType: number | null,
	) => {
		if (!user) {
			toast.error("In order to vote please log in or create an account");
			return;
		}

		const currentComment = comments.find((c) => c.id === commentId);
		if (!currentComment) return;

		const currentVote = currentComment.user_vote;
		const scoreChange = calculateScore(currentVote, voteType);

		setComments((prevComments) =>
			prevComments.map((c) =>
				c.id === commentId
					? {
							...c,
							vote_count: c.vote_count + scoreChange,
							user_vote: voteType,
						}
					: c,
			),
		);

		try {
			if (voteType === null) {
				const { error } = await supabase
					.from("post_votes")
					.delete()
					.match({ user_id: user.id, post_id: commentId });

				if (error) toast.error("Failed to remove vote.");
			} else {
				const { error } = await supabase
					.from("post_votes")
					.upsert(
						{ post_id: commentId, vote_type: voteType, user_id: user.id },
						{ onConflict: "post_id, user_id" },
					);

				if (error) toast.error("Failed to cast vote.");
			}
		} catch (err) {
			toast.error("Error while voting");
		}
	};

	const deleteThread = async (commentId: number) => {
		setLoadingDelete(true);
		try {
			const { error } = await supabase
				.from("posts")
				.delete()
				.match({ id: commentId });
			if (error) throw new Error();

			toast.success("Comment deleted successfully");
			fetchComments(0);
		} catch (err) {
			toast.error(
				"There was an error deleting the comment, please try again later",
			);
		} finally {
			setLoadingDelete(false);
		}
	};

	useEffect(() => {
		if (initialComments.length > 0) {
			const commentsContent = initialComments.map((comment) => {
				const clean = DOMPurify.sanitize(comment.content);
				return { ...comment, content: clean };
			});
			setComments(commentsContent);
		}
	}, [initialComments]);

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
						return (
							<Card key={comment.id} className="p-4 flex flex-col mb-7 gap-5">
								<div className="flex justify-between items-center">
									<p className="text-muted-foreground text-sm">
										{comment.username && (
											<Link
												className="font-semibold text-foreground hover:underline z-10 relative"
												href={`${routes.user}/${comment.username}`}
											>
												{comment.username}
											</Link>
										)}
										{!comment.username && "Anonymous"} -{" "}
										<TimeAgo dateString={comment.created_at} />
									</p>
									{currentUser && currentUser.id === comment.user_id && (
										<DeleteModal
											loading={loadingDelete}
											onClick={() => deleteThread(comment.id)}
											description="This action cannot be undone. This will permanently delete your comment."
										/>
									)}
								</div>
								<div
									className="mt-0 tiptap"
									dangerouslySetInnerHTML={{ __html: comment.content }}
								/>
								<div className="flex flex-row gap-2 items-center mt-2">
									<button
										type="button"
										aria-label="Upvote Comment"
										onClick={() =>
											handleCommentLikes(
												comment.id,
												comment.user_vote === 1 ? null : 1,
											)
										}
										className={`transition-all duration-200 cursor-pointer hover:bg-red-300 hover:text-red-600 p-1 rounded-full ${comment.user_vote === 1 ? "bg-red-300 text-red-600" : ""}`}
									>
										<ArrowBigUp />
									</button>
									<span className="block font-bold text-lg text-foreground">
										{comment.vote_count}
									</span>
									<button
										type="button"
										onClick={() =>
											handleCommentLikes(
												comment.id,
												comment.user_vote === -1 ? null : -1,
											)
										}
										aria-label="Downvote Comment"
										className={`transition-all duration-200 cursor-pointer hover:bg-red-300 hover:text-red-600 p-1 rounded-full ${comment.user_vote === -1 ? "bg-red-300 text-red-600" : ""}`}
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
