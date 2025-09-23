import SidebarMessages from "@/components/Messages/SidebarMessages";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import { createClient } from "@/lib/supabase/server";

const layout = async ({
	children,
}: Readonly<{ children: React.ReactNode }>) => {
	const supabase = await createClient();

	const {
		data: { user },
		error,
	} = await supabase.auth.getUser();

	if (!user || error) throw new Error();

	const { data: conversations } = await supabase.rpc("get_user_conversations", {
		current_user_id: user.id,
	});

	return (
		<main className="max-w-7xl mx-auto py-8 flex flex-col h-[calc(100vh-4rem)]">
			<div className="text-center py-8 px-4">
				<h1 className="text-5xl font-bold md:text-7xl tracking-tighter">
					Your Messages
				</h1>
			</div>
			<div className="mt-10 px-4 md:px-8 flex-1">
				<ResizablePanelGroup
					direction="horizontal"
					className="rounded-lg border"
				>
					<ResizablePanel defaultSize={30}>
						<SidebarMessages messages={conversations ?? []} />
					</ResizablePanel>
					<ResizableHandle disabled />
					<ResizablePanel defaultSize={70}>{children}</ResizablePanel>
				</ResizablePanelGroup>
			</div>
		</main>
	);
};

export default layout;
