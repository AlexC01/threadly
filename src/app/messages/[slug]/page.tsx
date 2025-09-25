import { notFound } from "next/navigation";
import ChatWindow from "@/components/Messages/ChatWindow";
import type {
	MessagesArray,
	UsernameFromConversation,
} from "@/lib/Models/BaseModels";
import { createClient } from "@/lib/supabase/server";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
	const supabase = await createClient();
	const { slug } = await params;

	const {
		data: { user },
		error,
	} = await supabase.auth.getUser();

	if (!user || error) throw new Error();

	let otherUser: UsernameFromConversation | null = null;
	let conversationsMessages: MessagesArray[] | null = null;

	try {
		const [usernameResp, conversationResp] = await Promise.all([
			supabase
				.rpc("get_conversation_participant", {
					conversation_id_input: +slug,
					current_user_id: user.id,
				})
				.single(),
			supabase
				.from("messages")
				.select("*")
				.eq("conversation_id", +slug)
				.order("created_at", { ascending: true }),
		]);

		otherUser = usernameResp.data;
		conversationsMessages = conversationResp.data;
	} catch (err) {
		throw new Error("Error");
	}

	if (
		!otherUser ||
		!conversationsMessages ||
		conversationsMessages.length === 0
	)
		notFound();

	return (
		<ChatWindow
			conversation={conversationsMessages ?? []}
			otherUser={otherUser ?? { id: "", username: "" }}
			currentUserId={user.id}
			conversation_id={slug}
		/>
	);
};

export default page;
