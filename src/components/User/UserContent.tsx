/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: <explanation> */
"use client";
import DOMPurify from "dompurify";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type {
	CorrectedUserCommentsType,
	CorrectedUserThreadsType,
} from "@/lib/Models/BaseModels";
import routes from "@/lib/routes";
import { calculateScore, handleLikesThreads } from "@/lib/services/handleLikes";
import useAuth from "@/lib/stores/useAuth";
import ThreadCard from "../Threads/ThreadCard";
import TimeAgo from "../TimeAgo";

interface UserContentProps {
	initialThreads: CorrectedUserThreadsType[];
	profile: boolean;
	initialComments: CorrectedUserCommentsType[];
}

const UserContent = ({
	initialThreads,
	profile,
	initialComments,
}: UserContentProps) => {
	const [threads, setThreads] = useState<CorrectedUserThreadsType[]>(
		initialThreads || [],
	);
	const [comments, setComments] = useState<CorrectedUserCommentsType[]>([]);
	const { user } = useAuth();

	const handleLikeThread = async (
		threadId: number,
		voteType: number | null,
	) => {
		if (!user) {
			toast.error("In order to vote please log in or create an account");
			return;
		}
		const currentThread = threads.find((t) => t.id === threadId);
		if (!currentThread) return;
		const currentVote = currentThread.user_vote;
		const scoreChange = calculateScore(currentVote, voteType);
		setThreads((prevThreads) =>
			prevThreads.map((t) =>
				t.id === threadId
					? {
							...t,
							vote_count: t.vote_count + scoreChange,
							user_vote: voteType,
						}
					: t,
			),
		);
		const resp = await handleLikesThreads(threadId, voteType, user.id);
		if (resp) toast.error(resp);
	};

	useEffect(() => {
		if (initialComments.length > 0) {
			const commentsContent = initialComments.map((comment) => {
				const clean = DOMPurify.sanitize(comment.post_content);
				return { ...comment, post_content: clean };
			});
			setComments(commentsContent);
		}
	}, [initialComments]);

	return (
		<div className="mt-8 px-4 md:px-8">
			<Tabs defaultValue="threads">
				<TabsList className="px-4 py-8 space-x-2">
					<TabsTrigger
						value="threads"
						className="px-4 py-5 text-lg font-bold cursor-pointer"
					>
						Threads
					</TabsTrigger>
					<TabsTrigger
						value="replies"
						className="px-4 py-5 text-lg font-bold cursor-pointer"
					>
						Replies
					</TabsTrigger>
				</TabsList>
				<TabsContent value="threads" className="mt-4">
					<section className="mt-6 relative">
						{threads.length === 0 && (
							<p className="text-center font-bold text-lg">
								{profile
									? "You dont have any threads created yet"
									: "User does not have any threads created"}
							</p>
						)}
						{threads.length > 0 && (
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
								{threads.map((thread) => (
									<ThreadCard
										key={thread.id}
										thread={thread}
										handleLikeThread={handleLikeThread}
									/>
								))}
							</div>
						)}
					</section>
				</TabsContent>
				<TabsContent value="replies" className="mt-4">
					<section className="mt-6 relative">
						{comments.length === 0 && (
							<p className="text-center font-bold text-lg">
								{profile
									? "You dont have any replies posted yet"
									: "User does not have any replies"}
							</p>
						)}
						{comments.length > 0 && (
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
								{comments.map((comment) => (
									<Card
										key={comment.post_id}
										className="p-4 flex-col mb-7 gap-5"
									>
										<p className="text-muted-foreground text-sm">
											Replied to{" "}
											<Link
												href={`${routes.thread}/${comment.thread_slug}`}
												className="font-semibold text-foreground hover:underline"
											>
												{comment.thread_title}
											</Link>
											{" - "}
											<TimeAgo dateString={comment.post_created_at} />
										</p>
										<div
											className="mt-0 tiptap"
											dangerouslySetInnerHTML={{ __html: comment.post_content }}
										/>
									</Card>
								))}
							</div>
						)}
					</section>
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default UserContent;
