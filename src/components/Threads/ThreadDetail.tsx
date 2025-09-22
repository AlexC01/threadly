/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: <Im already cleaning the HTML> */
"use client";

import type { User } from "@supabase/supabase-js";
import DOMPurify from "dompurify";
import {
	ArrowBigDown,
	ArrowBigUp,
	Bookmark,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type {
	CorrectedCommentType,
	CorrectedThreadSingle,
} from "@/lib/Models/BaseModels";
import { calculateScore, handleLikesThreads } from "@/lib/services/handleLikes";
import useAuth from "@/lib/stores/useAuth";
import { supabase } from "@/lib/supabase/client";
import TimeAgo from "../TimeAgo";
import ThreadComments from "./ThreadComments";
import DeleteModal from "../DeleteModal";

interface ThreadDetailProps {
	thread: CorrectedThreadSingle;
	comments: CorrectedCommentType[];
	currentUser: User | null;
}

const ThreadDetail = ({ thread, comments, currentUser }: ThreadDetailProps) => {
	const router = useRouter();
	const { user } = useAuth();
	const {
		title,
		vote_count,
		comment_count,
		created_at,
		username,
		id,
		user_vote,
		user_id,
		is_bookmarked,
	} = thread;
	const [voteCount, setVoteCount] = useState(vote_count);
	const [userVote, setUserVote] = useState(user_vote);
	const [isBookmarked, setIsBookmarked] = useState(is_bookmarked);
	const [content, setContent] = useState("");
	const [loadingDelete, setLoadingDelete] = useState(false);

	const handleLikes = async (voteType: number | null) => {
		if (!user) {
			toast.error("In order to vote please log in or create an account");
			return;
		}

		const currentVote = userVote;
		const scoreChange = calculateScore(currentVote, voteType);

		setVoteCount((prevVoteCount) => prevVoteCount + scoreChange);
		setUserVote(voteType);

		const resp = await handleLikesThreads(id, voteType, user.id);

		if (resp) toast.error(resp);
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

	const deleteThread = async () => {
		setLoadingDelete(true);
		try {
			const { error } = await supabase.from("threads").delete().match({ id });
			if (error) throw new Error();

			toast.success("Thread deleted successfully");

			router.replace("/");
			router.refresh();
		} catch (err) {
			toast.error(
				"There was an error deleting the thread, please try again later",
			);
		} finally {
			setLoadingDelete(false);
		}
	};

	useEffect(() => {
		const clean = DOMPurify.sanitize(thread.content);
		setContent(clean);
	}, [thread]);

	return (
		<>
			<Card className="px-4 sm:px-3 md:px-6 flex flex-col">
				<div className="flex justify-between items-center">
					<p className="text-muted-foreground text-sm mb-1">
						{!username ? "Anonymous" : username} -{" "}
						<TimeAgo dateString={created_at} />
					</p>
					{currentUser && currentUser.id === user_id && (
						<DeleteModal loading={loadingDelete} onClick={deleteThread}  description="This action cannot be undone. This will permanently delete your thread and remove it from our servers."/>
					)}
				</div>
				<h2 className="font-bold text-2xl md:text-4xl">{title}</h2>
				<div
					className="mt-0 tiptap text-muted-foreground"
					dangerouslySetInnerHTML={{ __html: content }}
				/>
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
				currentUser={currentUser}
			/>
		</>
	);
};

export default ThreadDetail;
