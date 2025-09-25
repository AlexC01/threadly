import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const SidebarItemSkeleton = () => {
	return (
		<div className="border rounded-lg p-2">
			<div className="flex justify-between items-center">
				<Skeleton className="h-6 w-24 rounded-md" />
				<Skeleton className="h-4 w-16 rounded-md" />
			</div>
			<Skeleton className="h-4 w-full mt-2 rounded-md" />
		</div>
	);
};

const LoadingSidebarMessage = () => {
	return (
		<div className="p-2.5 space-y-2 overflow-y-auto">
			<SidebarItemSkeleton />
			<SidebarItemSkeleton />
			<SidebarItemSkeleton />
			<SidebarItemSkeleton />
			<SidebarItemSkeleton />
		</div>
	);
};

export default LoadingSidebarMessage;
