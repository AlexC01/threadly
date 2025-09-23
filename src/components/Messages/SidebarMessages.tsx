"use client";

import Link from "next/link";
import type { UserConversationsType } from "@/lib/Models/BaseModels";
import routes from "@/lib/routes";
import TimeAgo from "../TimeAgo";

interface SidebarMessagesProps {
	messages: UserConversationsType[];
}

const SidebarMessages = ({ messages }: SidebarMessagesProps) => {
	return (
		<div className="px-2.5 py-4 overflow-y-auto">
			{messages.map((message) => (
				<Link
					href={`${routes.messages}/${message.conversation_id}`}
					key={message.conversation_id}
				>
					<div className="border rounded-lg mb-2 p-2 cursor-pointer transition-colors duration-200 hover:bg-accent hover:text-white ">
						<div className="flex justify-between items-center text-sm">
							<p className="font-bold text-lg">
								{message.other_participant_username}
							</p>
							<TimeAgo dateString={message.last_message_created_at} />
						</div>
						<p className="mt-2 lg:max-w-prose line-clamp-1">
							{message.last_message_content}
						</p>
					</div>
				</Link>
			))}
		</div>
	);
};

export default SidebarMessages;
