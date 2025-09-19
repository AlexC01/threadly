"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type {
	CorrectedUserCommentsType,
	CorrectedUserThreadsType,
} from "@/lib/Models/BaseModels";
import { calculateScore, handleLikesThreads } from "@/lib/services/handleLikes";
import useAuth from "@/lib/stores/useAuth";
import ThreadCard from "../Threads/ThreadCard";

interface UserContentProps {
	initialThreads: CorrectedUserThreadsType[];
	profile: boolean;
	comments: CorrectedUserCommentsType[];
}

const UserContent = ({ initialThreads, profile }: UserContentProps) => {
	const [threads, setThreads] = useState<CorrectedUserThreadsType[]>(
		initialThreads || [],
	);
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
					<section className="mt-10 relative">
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
			</Tabs>
		</div>
	);
};

export default UserContent;
