import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingThreadCard = () => {
	return (
		<Card className="p-4 flex flex-row gap-3">
			{/* Skeleton for Vote Section */}
			<div className="hidden md:flex flex-col items-center gap-1 text-muted-foreground pt-2">
				<Skeleton className="h-6 w-6 rounded-md bg-gray-400" />
				<Skeleton className="h-5 w-8 my-1 bg-gray-400" />
				<Skeleton className="h-6 w-6 rounded-md bg-gray-400" />
			</div>

			<div className="flex flex-col flex-1 space-y-3">
				<Skeleton className="h-6 w-3/4 bg-gray-400" />
				<div className="space-y-2">
					<Skeleton className="h-4 w-full bg-gray-400 " />
					<Skeleton className="h-4 w-5/6 bg-gray-400" />
				</div>
				<div className="flex justify-between items-center pt-4">
					<Skeleton className="h-4 w-1/3 bg-gray-400" />
					<Skeleton className="h-4 w-1/4 bg-gray-400" />
				</div>
			</div>
		</Card>
	);
};

export default LoadingThreadCard;
