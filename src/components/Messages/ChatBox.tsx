"use client";

import { LoaderCircle, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { MessagesArray } from "@/lib/Models/BaseModels";
import { supabase } from "@/lib/supabase/client";

interface ChatBoxProps {
	conversation_id: number;
	sender_id: string;
	addOptimisticMessage: (message: MessagesArray) => void;
}

const ChatBox = ({
	conversation_id,
	sender_id,
	addOptimisticMessage,
}: ChatBoxProps) => {
	const [content, setContent] = useState("");
	const [loading, setLoading] = useState(false);

	const sendMessage = async () => {
		if (content.trim() === "") return;
		setLoading(true);

		const messagePayload: MessagesArray = {
			id: -Date.now(),
			content,
			sender_id,
			created_at: new Date().toISOString(),
			conversation_id: conversation_id,
		};
		addOptimisticMessage(messagePayload);
		setContent("");

		try {
			await supabase
				.from("messages")
				.insert({ conversation_id, content, sender_id });
		} catch (err) {
			console.error(err);
			toast.error("Error while sending message, please try again");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<Textarea
				placeholder="Write a message..."
				value={content}
				onChange={(e) => setContent(e.target.value)}
			/>
			<div className="justify-end flex">
				<Button
					disabled={content === "" || loading}
					className="mt-3 flex items-center gap-2"
					onClick={sendMessage}
				>
					Send
					{loading && <LoaderCircle className="animate-spin" />}
					{!loading && <Send />}
				</Button>
			</div>
		</div>
	);
};

export default ChatBox;
