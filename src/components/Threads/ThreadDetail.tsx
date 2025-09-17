/** biome-ignore-all lint/style/noNonNullAssertion: <explanation> */
"use client";

import { ArrowBigDown, ArrowBigUp, Bookmark } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type {
	CorrectedCommentType,
	CorrectedThreadSingle,
} from "@/lib/Models/BaseModels";
import useAuth from "@/lib/stores/useAuth";
import { supabase } from "@/lib/supabase/client";
import TimeAgo from "../TimeAgo";
import ThreadComments from "./ThreadComments";

interface ThreadDetailProps {
	thread: CorrectedThreadSingle;
	comments: CorrectedCommentType[];
}

const ThreadDetail = ({ thread, comments }: ThreadDetailProps) => {
	const { user } = useAuth();
	const {
		title,
		content,
		vote_count,
		comment_count,
		created_at,
		username,
		id,
		user_vote,
		is_bookmarked,
	} = thread;
	const [voteCount, setVoteCount] = useState(vote_count);
	const [userVote, setUserVote] = useState(user_vote);
	const [isBookmarked, setIsBookmarked] = useState(is_bookmarked);

	const handleLikes = async (voteType: number | null) => {
		if (!user) {
			toast.error("In order to vote please log in or create an account");
			return;
		}

		const currentVote = userVote;
		let scoreChange = 0;

		if (currentVote === null) scoreChange = voteType!;
		else if (voteType === null) scoreChange = -currentVote;
		else scoreChange = voteType - currentVote;

		setVoteCount((prevVoteCount) => prevVoteCount + scoreChange);
		setUserVote(voteType);

		try {
			if (voteType === null) {
				const { error } = await supabase
					.from("thread_votes")
					.delete()
					.match({ user_id: user.id, thread_id: id });

				if (error) toast.error("Failed to remove vote.");
			} else {
				const { error } = await supabase
					.from("thread_votes")
					.upsert(
						{ thread_id: id, vote_type: voteType, user_id: user.id },
						{ onConflict: "thread_id, user_id" },
					);

				if (error) toast.error("Failed to cast vote.");
			}
		} catch (err) {
			toast.error("Error while voting");
		}
	};

	const handleBookmark = async () => {
		if (!user) {
			toast.error("In order to vote please log in or create an account");
			return;
		}
		const value = isBookmarked;
		setIsBookmarked(!isBookmarked);

		try {
			if (!value) {
				const { error } = await supabase
					.from("bookmarks")
					.insert({ thread_id: id, user_id: user.id });
				if (error) toast.error("Failed to add bookmark.");
			} else {
				const { error } = await supabase
					.from("bookmarks")
					.delete()
					.match({ user_id: user.id, thread_id: id });
				if (error) toast.error("Failed to remove bookmark.");
			}
		} catch (err) {
			toast.error("Error while doing this action, please try again");
		}
	};

	return (
		<>
			<Card className="px-4 sm:px-3 md:px-6 flex flex-col">
				<p className="text-muted-foreground text-sm mb-1">
					{!username ? "Anonymous" : username} -{" "}
					<TimeAgo dateString={created_at} />
				</p>
				<h2 className="font-bold text-2xl md:text-4xl">{title}</h2>
				<p className="text-muted-foreground text-lg">{content}</p>
				<div className="flex justify-between items-center">
					<div className="flex flex-row gap-2 items-center">
						<button
							type="button"
							onClick={() => handleLikes(userVote === 1 ? null : 1)}
							className={`transition-all duration-200 cursor-pointer hover:bg-red-300 hover:text-red-600 p-1 rounded-full ${userVote === 1 ? "bg-red-300 text-red-600" : ""}`}
						>
							<ArrowBigUp />
						</button>
						<span className="block font-bold text-lg text-foreground">
							{voteCount}
						</span>
						<button
							type="button"
							onClick={() => handleLikes(userVote === -1 ? null : -1)}
							className={`transition-all duration-200 cursor-pointer hover:bg-red-300 hover:text-red-600 p-1 rounded-full ${userVote === -1 ? "bg-red-300 text-red-600" : ""}`}
						>
							<ArrowBigDown />
						</button>
					</div>
					<Button
						variant="outline"
						onClick={handleBookmark}
						className={`flex items-center font-bold gap-1.5 uppercase text-lg ${isBookmarked ? "translate-x-0.5 translate-y-0.5 shadow-none bg-accent text-white" : ""}`}
						size="icon"
					>
						<Bookmark fill={isBookmarked ? "white" : "none"} />
					</Button>
				</div>
			</Card>
			<ThreadComments
				initialComments={comments}
				thread_id={id}
				comment_count={comment_count}
			/>
		</>
	);
};

export default ThreadDetail;
