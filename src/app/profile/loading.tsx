import LoadingThreadCard from "@/components/Loadings/LoadingThreadCard";
import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";

const loading = () => {
	return (
		<main className="min-h-screen">
			<div className="max-w-7xl mx-auto py-12 md:py-16">
				<div className="flex justify-center w-full items-center px-6 md:px-0">
					<Card className="w-full max-w-md">
						<CardHeader className="flex justify-center flex-col items-center space-y-3">
							<Skeleton className="h-16 w-16 rounded-full" />
							<Skeleton className="h-7 w-40" />
							<Skeleton className="h-4 w-48" />
							<div className="flex items-center space-x-4 pt-2">
								<Skeleton className="h-4 w-20" />
								<Skeleton className="h-4 w-20" />
							</div>
						</CardHeader>
					</Card>
				</div>

				<div className="mt-8 px-4 md:px-8">
					<Tabs defaultValue="threads">
						<TabsList className="px-4 py-8 space-x-2">
							<Skeleton className="h-10 w-24 rounded-md" />
							<Skeleton className="h-10 w-24 rounded-md" />
						</TabsList>
						<TabsContent value="threads" className="mt-4">
							<section className="mt-6 relative">
								<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
									<LoadingThreadCard />
									<LoadingThreadCard />
									<LoadingThreadCard />
									<LoadingThreadCard />
								</div>
							</section>
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</main>
	);
};

export default loading;
