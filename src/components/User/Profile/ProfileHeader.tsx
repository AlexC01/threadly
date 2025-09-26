"use client";
import type { User } from "@supabase/supabase-js";
import {
	LoaderCircle,
	MessageSquareText,
	Send,
	User as UserIcon,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import TimeAgo from "@/components/TimeAgo";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import type { UserStatsType } from "@/lib/Models/BaseModels";
import { supabase } from "@/lib/supabase/client";
import EditProfile from "./EditProfile";

interface ProfileHeaderProps {
	userInfo: {
		username: string;
		created_at: string;
		id: string;
		firstName: string;
		lastName: string;
	};
	stats: UserStatsType | null;
	edit: boolean;
	currentUser: User | null;
}

const ProfileHeader = ({
	userInfo,
	stats,
	edit,
	currentUser,
}: ProfileHeaderProps) => {
	const [content, setContent] = useState("");
	const [loading, setLoading] = useState(false);

	const sendMessage = async () => {
		if (!currentUser) return;
		setLoading(true);
		try {
			const { data, error } = await supabase.rpc(
				"create_conversation_and_send_message",
				{
					sender_id_input: currentUser.id,
					receiver_id_input: userInfo.id,
					message_content: content,
				},
			);
			if (error) throw new Error();
			console.log(data);
			setContent("");
			toast.success("Message sent!");
		} catch (err) {
			console.error(err);
			toast.error("Error while sending message, please try again");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex justify-center w-full items-center px-6 md:px-0">
			<Card className="w-full max-w-md">
				<CardHeader className="flex justify-center flex-col items-center relative">
					<div className="border-2 rounded-full p-2">
						<UserIcon className="h-10 w-10" />
					</div>
					<h2 className="mt-2 font-bold text-lg">{userInfo.username}</h2>
					<p>
						Joined <TimeAgo dateString={userInfo.created_at} />
					</p>
					<div className="flex items-center space-x-4 mt-3 text-sm text-muted-foreground">
						<span>
							<span className="font-bold text-foreground">
								{stats?.thread_count}{" "}
							</span>
							Threads
						</span>
						<span>
							<span className="font-bold text-foreground">
								{stats?.post_count}{" "}
							</span>
							Replies
						</span>
					</div>
					{edit && (
						<EditProfile
							initialFirstName={userInfo.firstName}
							initialLastName={userInfo.lastName}
							initialUsername={userInfo.username}
						/>
					)}
					{!edit && currentUser && (
						<Popover>
							<PopoverTrigger asChild>
								<Button size="icon" className="absolute -top-2 right-5">
									<MessageSquareText />
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-72">
								<Textarea
									placeholder="Write a message..."
									value={content}
									className="resize-none"
									onChange={(e) => setContent(e.target.value)}
								/>
								<div className="justify-end flex">
									<Button
										disabled={content === "" || loading}
										className="mt-3 flex items-center gap-2"
										size="sm"
										onClick={sendMessage}
									>
										Send
										{loading && <LoaderCircle className="animate-spin" />}
										{!loading && <Send />}
									</Button>
								</div>
							</PopoverContent>
						</Popover>
					)}
				</CardHeader>
			</Card>
		</div>
	);
};

export default ProfileHeader;
