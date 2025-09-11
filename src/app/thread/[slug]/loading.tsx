import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
	return (
		<main className="min-h-screen">
			<div className="max-w-7xl mx-auto py-12 md:py-16">
				<div className="mb-8">
					<Skeleton className="h-4 w-[250px] bg-gray-400 rounded-lg" />
				</div>
				<Card className="p-6 flex flex-col gap-4">
					{/* Mimics the "Posted by..." line */}
					<Skeleton className="h-4 w-[250px] bg-gray-400 rounded-lg" />

					{/* Mimics the large title */}
					<Skeleton className="h-10 w-full bg-gray-400 rounded-lg" />

					{/* Mimics the content paragraph */}
					<div className="space-y-2">
						<Skeleton className="h-4 w-full bg-gray-400 rounded-lg" />
						<Skeleton className="h-4 w-full bg-gray-400 rounded-lg" />
						<Skeleton className="h-4 w-4/5 bg-gray-400 rounded-lg" />
					</div>

					{/* Mimics the bottom action bar */}
					<div className="flex justify-between items-center mt-4">
						<Skeleton className="h-8 w-[100px] bg-gray-400 rounded-lg" />
						<Skeleton className="h-10 w-[120px] bg-gray-400 rounded-lg" />
					</div>
				</Card>

				<Separator className="my-10" />

				{/* Skeletons for the comments section */}
				<div className="space-y-6">
					<Skeleton className="h-24 w-full bg-gray-400 rounded-lg" />
					<Skeleton className="h-24 w-full bg-gray-400 rounded-lg" />
					<Skeleton className="h-24 w-full bg-gray-400 rounded-lg" />
				</div>
			</div>
		</main>
	);
};

export default loading;
