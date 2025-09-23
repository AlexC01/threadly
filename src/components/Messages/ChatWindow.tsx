"use client";

import { format } from "date-fns";
import { useEffect } from "react";
import {
	shouldShowDateDivider,
	shouldShowTimestamp,
} from "@/lib/helpers/MessagesHelpers";
import type { MessageWithUsername } from "@/lib/Models/BaseModels";
import TimeAgo from "../TimeAgo";

interface ChatWindowProps {
	conversation: MessageWithUsername[];
	username: string;
	currentUserId: string;
}

const ChatWindow = ({
	conversation,
	username,
	currentUserId,
}: ChatWindowProps) => {
	useEffect(() => {}, []);

	console.log(conversation);

	return (
		<div className="flex flex-col h-full">
			<div className="p-4 border-b">
				<p className="font-semibold text-lg">Chat with {username}</p>
			</div>

			<div className="flex-1 p-4 min-h-0 overflow-y-auto custom-scrollbar space-y-4">
				{conversation.map((message, index) => {
					const prevMessage = conversation[index - 1];
					const nextMessage = conversation[index + 1];

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
			<div className="p-4 border-t">text here</div>
		</div>
	);
};

export default ChatWindow;
