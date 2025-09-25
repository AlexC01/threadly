/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <explanation> */
"use client";

import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { useChatScroll } from "@/customHooks/useChatScroll";
import {
	shouldShowDateDivider,
	shouldShowTimestamp,
} from "@/lib/helpers/MessagesHelpers";
import type {
	MessagesArray,
	UsernameFromConversation,
} from "@/lib/Models/BaseModels";
import { supabase } from "@/lib/supabase/client";
import TimeAgo from "../TimeAgo";
import ChatBox from "./ChatBox";

interface ChatWindowProps {
	conversation: MessagesArray[];
	otherUser: UsernameFromConversation;
	currentUserId: string;
	conversation_id: string;
}

const ChatWindow = ({
	conversation,
	otherUser,
	currentUserId,
	conversation_id,
}: ChatWindowProps) => {
	const [messages, setMessages] = useState<MessagesArray[]>(conversation);
	const { containerRef, scrollToBottom } = useChatScroll();

	useEffect(() => {
		let channel: ReturnType<typeof supabase.channel> | null = null;
		async function init() {
			const {
				data: { session },
			} = await supabase.auth.getSession();

			if (!session) return;

			supabase.realtime.setAuth(session.access_token);

			channel = supabase
				.channel(`public:messages:conversation_id=eq.${conversation_id}`)
				.on(
					"postgres_changes",
					{
						event: "INSERT",
						schema: "public",
						table: "messages",
						filter: `conversation_id=eq.${conversation_id}`,
					},
					(payload) => {
						const newMessage = payload.new as MessagesArray;
						setMessages((prev) => {
							if (prev.some((m) => m.id === newMessage.id)) return prev;
							const withoutOptimistic = prev.filter(
								(m) =>
									!(
										m.id < 0 &&
										m.sender_id === newMessage.sender_id &&
										m.content === newMessage.content
									),
							);

							return [...withoutOptimistic, newMessage];
						});
					},
				)
				.subscribe();
		}
		init();
		return () => {
			if (channel) supabase.removeChannel(channel);
		};
	}, [conversation_id]);

	useEffect(() => {
		scrollToBottom();
	}, [messages, scrollToBottom]);

	const addOptimisticMessage = (message: MessagesArray) => {
		setMessages((prev) => [...prev, message]);
	};

	return (
		<div className="flex flex-col h-full">
			<div className="p-4 border-b">
				<p className="font-semibold text-lg">Chat with {otherUser.username}</p>
			</div>

			<div
				className="flex-1 p-4 min-h-0 overflow-y-auto custom-scrollbar space-y-4"
				ref={containerRef}
			>
				{messages.map((message, index) => {
					const prevMessage = messages[index - 1];
					const nextMessage = messages[index + 1];

					const showDateDivider = shouldShowDateDivider(message, prevMessage);
					const showTimeStamp = shouldShowTimestamp(message, nextMessage);

					const isCurrentUser = message.sender_id === currentUserId;

					return (
						<div key={message.id}>
							{showDateDivider && (
								<div className="text-center text-sm text-muted-foreground my-4">
									{format(new Date(message.created_at), "MMMM d, yyyy")}
								</div>
							)}

							<div
								className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
							>
								<div className="max-w-md">
									<div
										className={`border p-2 shadow-md rounded-xl max-w-sm ${message.sender_id === currentUserId ? "bg-muted-foreground text-primary-foreground" : "bg-muted"}`}
									>
										{message.content}
									</div>
									{showTimeStamp && (
										<p
											className={`text-xs text-muted-foreground mt-1 ${isCurrentUser ? "text-right" : "text-left"}`}
										>
											<TimeAgo dateString={message.created_at} />
										</p>
									)}
								</div>
							</div>
						</div>
					);
				})}
			</div>
			<div className="p-4 border-t">
				<ChatBox
					conversation_id={+conversation_id}
					sender_id={currentUserId}
					addOptimisticMessage={addOptimisticMessage}
				/>
			</div>
		</div>
	);
};

export default ChatWindow;
