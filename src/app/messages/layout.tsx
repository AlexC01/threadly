import { Suspense } from "react";
import LoadingSidebarMessage from "@/components/Loadings/LoadingSidebarMessage";
import SidebarMessages from "@/components/Messages/SidebarMessages";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
	return (
		<main className="max-w-7xl mx-auto py-8 flex flex-col h-screen">
			<div className="text-center py-8 px-4">
				<h1 className="text-5xl font-bold md:text-7xl tracking-tighter">
					Your Messages
				</h1>
			</div>
			<ResizablePanelGroup
				direction="horizontal"
				className="rounded-lg border flex-1 min-h-0"
			>
				<ResizablePanel defaultSize={30} minSize={25}>
					<Suspense fallback={<LoadingSidebarMessage />}>
						<SidebarMessages />
					</Suspense>
				</ResizablePanel>
				<ResizableHandle disabled />
				<ResizablePanel defaultSize={70} minSize={30}>
					{children}
				</ResizablePanel>
			</ResizablePanelGroup>
		</main>
	);
};

export default layout;
