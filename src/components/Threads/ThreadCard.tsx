import { ArrowBigDown, ArrowBigUp, MessageCircleMore } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const ThreadCard = () => {
	return (
		<Card className="px-4 flex flex-row gap-4">
			<div className="hidden md:flex flex-col justify-center items-center gap-5">
				<button type="button">
					<ArrowBigUp />
				</button>
				<span className="block font-bold text-lg text-foreground">44</span>
				<button type="button">
					<ArrowBigDown />
				</button>
			</div>
			<div className="hidden md:block">
				<Separator orientation="vertical" />
			</div>
			<div className="flex flex-col flex-1">
				<p className="text-muted-foreground text-xs mb-3 md:hidden">
					Posted by Anonymous#142 - 2 hours ago
				</p>
				<h2 className="font-bold text-xl mb-4">
					How can this be even possible with torrentio? I dont Understand
				</h2>
				<p className="max-w-prose line-clamp-3 text-muted-foreground">
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
					<div className="flex items-center gap-2">
						<MessageCircleMore />
						<span className="inline-block">44</span>
					</div>
				</div>
			</div>
		</Card>
	);
};

export default ThreadCard;
