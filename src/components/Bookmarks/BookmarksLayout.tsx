"use client";

import { useState } from "react";
import { toast } from "sonner";
import type { CorrectedThreadBookmarks } from "@/lib/Models/BaseModels";
import { calculateScore, handleLikesThreads } from "@/lib/services/handleLikes";
import useAuth from "@/lib/stores/useAuth";
import { supabase } from "@/lib/supabase/client";
import ThreadCard from "../Threads/ThreadCard";

interface BookmarksLayoutProps {
	initialThreads: CorrectedThreadBookmarks[];
}

const BookmarksLayout = ({ initialThreads }: BookmarksLayoutProps) => {
	const { user } = useAuth();

	const [threads, setThreads] = useState<CorrectedThreadBookmarks[]>(
		initialThreads || [],
	);

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

	return (
		<section className="mt-10 relative">
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
			{threads.length === 0 && (
				<h2 className="text-center text-lg text-muted-foreground">
					You haven't add any threads to your bookmarks yet.
				</h2>
			)}
		</section>
	);
};

export default BookmarksLayout;
