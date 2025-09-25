import { Menu } from "lucide-react";
import { Suspense } from "react";
import LoadingSidebarMessage from "@/components/Loadings/LoadingSidebarMessage";
import SidebarMessages from "@/components/Messages/SidebarMessages";
import { Button } from "@/components/ui/button";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
	return (
		<main className="max-w-7xl mx-auto py-8 flex flex-col h-screen px-4 md:px-8">
			<div className="text-center py-8 px-4 flex justify-between items-center">
				<div className="block md:hidden">
					<Sheet>
						<SheetTrigger asChild>
							<Button variant="outline" size="icon">
								<Menu className="block md:hidden" />
							</Button>
						</SheetTrigger>
						<SheetContent>
							<SheetHeader>
								<SheetTitle>Chats</SheetTitle>
							</SheetHeader>
							<Suspense fallback={<LoadingSidebarMessage />}>
								<SidebarMessages />
							</Suspense>
						</SheetContent>
					</Sheet>
				</div>
				<div className="hidden md:block" />
				<h1 className="text-4xl font-bold md:text-7xl tracking-tighter">
					Your Messages
				</h1>
				<div />
			</div>
			<div className="flex-1 min-h-0 hidden md:block">
				<ResizablePanelGroup
					direction="horizontal"
					className="rounded-lg border "
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
			</div>
			<div className="block md:hidden p-2 border min-h-0 flex-1">
				{children}
			</div>
		</main>
	);
};

export default layout;
