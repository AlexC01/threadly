import { ArrowBigDown, ArrowBigUp, MessageCircleMore } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const ThreadCard = () => {
	return (
		<Card className="px-4 sm:px-3 md:pl-2 md:pr-4 flex flex-row gap-3 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all cursor-pointer">
			<div className="hidden md:flex flex-col justify-center items-center gap-3 border-r pr-1">
				<button
					type="button"
					className="transition-all duration-200 cursor-pointer hover:bg-red-300 hover:text-red-600 p-1 rounded-full"
				>
					<ArrowBigUp />
				</button>
				<span className="block font-bold text-lg text-foreground">44</span>
				<button
					type="button"
					className="transition-all duration-200 cursor-pointer hover:bg-red-300 hover:text-red-600 p-1 rounded-full"
				>
					<ArrowBigDown />
				</button>
			</div>
			<div className="flex flex-col flex-1">
				<p className="text-muted-foreground text-xs mb-3 md:hidden">
					Posted by Anonymous#142 - 2 hours ago
				</p>
				<h2 className="font-bold text-xl mb-4">
					How can this be even possible with torrentio? I dont Understand
				</h2>
				<p className="lg:max-w-prose line-clamp-3 text-muted-foreground">
					Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
					faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi
					pretium tellus pellentesque sem placerat. In id cursus mi pretium
					tellus pretium tellus pellentesque sem placerat. In id cursus mi
					pretium tellus
				</p>
				<div className="mt-6 flex justify-between items-center">
					<p className="hidden md:block text-muted-foreground text-xs">
						Posted by Anonymous#142 - 2 hours ago
					</p>
					<div className="flex md:hidden flex-row gap-2 items-center">
						<button type="button">
							<ArrowBigUp />
						</button>
						<span className="block font-bold text-lg text-foreground">44</span>
						<button type="button">
							<ArrowBigDown />
						</button>
					</div>
					<button type="button" className="flex items-center gap-2">
						<MessageCircleMore />
						<span className="inline-block">44</span>
					</button>
				</div>
			</div>
		</Card>
	);
};

export default ThreadCard;
