import { Skeleton } from "@/components/ui/skeleton";

const MessageSkeleton = ({ width }: { width: string }) => (
	<div className="max-w-md">
		<Skeleton className={`h-16 rounded-lg ${width}`} />
	</div>
);

const bubbleWidths = ["w-2/3", "w-1/2", "w-3/4", "w-1/2", "w-5/6", "w-2/3"];
const loading = () => {
	return (
		<div className="flex flex-col h-full">
			<div className="p-4 border-b">
				<Skeleton className="h-4 w-48 rounded-md" />
			</div>

			<div className="flex-1 p-4 min-h-0 overflow-y-auto custom-scrollbar space-y-4">
				<div className="flex justify-start">
					<MessageSkeleton width={bubbleWidths[0]} />
				</div>
				<div className="flex justify-start">
					<MessageSkeleton width={bubbleWidths[1]} />
				</div>
				<div className="flex justify-end">
					<MessageSkeleton width={bubbleWidths[2]} />
				</div>
				<div className="flex justify-start">
					<MessageSkeleton width={bubbleWidths[3]} />
				</div>
				<div className="flex justify-end">
					<MessageSkeleton width={bubbleWidths[4]} />
				</div>
				<div className="flex justify-end">
					<MessageSkeleton width={bubbleWidths[5]} />
				</div>
			</div>

			<div className="p-4 border-t">
				<Skeleton className="w-full h-20 rounded-md" />
			</div>
		</div>
	);
};

export default loading;
