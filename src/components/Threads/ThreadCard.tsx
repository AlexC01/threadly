import { ArrowBigDown, ArrowBigUp, MessageCircleMore } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import type { ThreadInterface } from "@/lib/Models/ThreadModel";
import routes from "@/lib/routes";

interface ThreadCardProps {
	thread: ThreadInterface;
}

const ThreadCard = ({ thread }: ThreadCardProps) => {
	const { title, slug, content, user_id, vote_count, comment_count } = thread;

	return (
		<Card className="relative group px-4 sm:px-3 md:pl-2 md:pr-4 flex flex-row gap-3 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer">
			<div className="hidden md:flex flex-col justify-center items-center gap-3 border-r pr-1 z-10 relative">
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
			<div className="flex flex-col flex-1">
				<p className="text-muted-foreground text-xs mb-3 md:hidden">
					{!user_id ? "Anonymous" : user_id}
				</p>
				<h2 className="font-bold text-xl mb-4">
					<Link
						href={`${routes.thread}/${slug}`}
						className="group-hover:underline"
					>
						{title}
						<span className="absolute inset-0" aria-hidden="true" />
					</Link>
				</h2>
				<p className="lg:max-w-prose line-clamp-3 text-muted-foreground">
					{content}
				</p>
				<div className="mt-auto pt-4 flex justify-between items-center">
					<p className="hidden md:block text-muted-foreground text-xs">
						{!user_id ? "Anonymous" : user_id}
					</p>
					<div className="flex md:hidden flex-row gap-2 items-center z-10 relative">
						<button type="button">
							<ArrowBigUp />
						</button>
						<span className="block font-bold text-lg text-foreground">
							{vote_count}
						</span>
						<button type="button">
							<ArrowBigDown />
						</button>
					</div>
					<button
						type="button"
						className="flex items-center gap-1 px-2 py-1 cursor-pointer hover:bg-red-300 hover:text-red-600 rounded-full transition-colors duration-200 z-10 relative"
					>
						<MessageCircleMore />
						<span className="inline-block">{comment_count}</span>
					</button>
				</div>
			</div>
		</Card>
	);
};

export default ThreadCard;
