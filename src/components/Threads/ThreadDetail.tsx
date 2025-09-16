"use client";

import { ArrowBigDown, ArrowBigUp, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type {
	CorrectedCommentType,
	ThreadSingle,
} from "@/lib/Models/BaseModels";
import TimeAgo from "../TimeAgo";
import ThreadComments from "./ThreadComments";

interface ThreadDetailProps {
	thread: ThreadSingle;
	comments: CorrectedCommentType[];
}

const ThreadDetail = ({ thread, comments }: ThreadDetailProps) => {
	const {
		title,
		content,
		vote_count,
		comment_count,
		created_at,
		username,
		id,
	} = thread;

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
							className="transition-all duration-200 cursor-pointer hover:bg-red-300 hover:text-red-600 p-1 rounded-full"
						>
							<ArrowBigUp />
						</button>
						<span className="block font-bold text-lg text-foreground">
							{vote_count}
						</span>
						<button
							type="button"
							className="transition-all duration-200 cursor-pointer hover:bg-red-300 hover:text-red-600 p-1 rounded-full"
						>
							<ArrowBigDown />
						</button>
					</div>
					<Button
						variant="outline"
						className="flex items-center gap-1.5 text-lg"
						size="lg"
					>
						<Bookmark />
						Save
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
