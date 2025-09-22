import LoadingThreadCard from "@/components/Loadings/LoadingThreadCard";
import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
	return (
		<main className="min-h-screen">
			<div className="max-w-7xl mx-auto py-12 md:py-16">
				<div className="text-center py-12 px-4">
					<Skeleton className="h-12 w-1/2 mx-auto " />
				</div>
				<div className="mt-10 px-4 md:px-8">
					<section className="mt-10 relative">
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
							<LoadingThreadCard />
							<LoadingThreadCard />
							<LoadingThreadCard />
							<LoadingThreadCard />
						</div>
					</section>
				</div>
			</div>
		</main>
	);
};

export default loading;
