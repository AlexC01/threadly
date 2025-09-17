"use client";

import { useState } from "react";
import { toast } from "sonner";
import type { CorrectedThreadBookmarks } from "@/lib/Models/BaseModels";
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
		let scoreChange = 0;

		if (currentVote === null) scoreChange = voteType!;
		else if (voteType === null) scoreChange = -currentVote;
		else scoreChange = voteType - currentVote;

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

		try {
			if (voteType === null) {
				const { error } = await supabase
					.from("thread_votes")
					.delete()
					.match({ user_id: user.id, thread_id: threadId });

				if (error) toast.error("Failed to remove vote.");
			} else {
				const { error } = await supabase
					.from("thread_votes")
					.upsert(
						{ thread_id: threadId, vote_type: voteType, user_id: user.id },
						{ onConflict: "thread_id, user_id" },
					);

				if (error) toast.error("Failed to cast vote.");
			}
		} catch (err) {
			toast.error("Error while voting");
		}
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
