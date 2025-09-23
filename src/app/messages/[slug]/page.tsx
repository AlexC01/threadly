import ChatWindow from "@/components/Messages/ChatWindow";
import type {
	MessageWithUsername,
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

	let username: UsernameFromConversation | null = null;
	let conversationsMessages: MessageWithUsername[] | null = null;

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
				.select("*, profiles(username)")
				.eq("conversation_id", +slug)
				.order("created_at", { ascending: true }),
		]);

		username = usernameResp.data;
		conversationsMessages = conversationResp.data;
	} catch (err) {
		throw new Error();
	}

	return (
		<ChatWindow
			conversation={conversationsMessages ?? []}
			username={username ? username.username : ""}
			currentUserId={user.id}
		/>
	);
};

export default page;
