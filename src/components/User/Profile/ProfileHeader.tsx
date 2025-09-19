import type { User } from "@supabase/supabase-js";
import { SquarePen, User as UserIcon } from "lucide-react";
import TimeAgo from "@/components/TimeAgo";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import type { UserStatsType } from "@/lib/Models/BaseModels";

interface ProfileHeaderProps {
	userInfo: User;
	stats: UserStatsType | null;
	edit: boolean;
}

const ProfileHeader = ({ userInfo, stats, edit }: ProfileHeaderProps) => {
	const getName = () => {
		const username = userInfo.user_metadata?.username ?? "";

		if (username !== "") return username;

		const firstName = userInfo.user_metadata?.first_name ?? "";
		const lastName = userInfo.user_metadata?.last_name ?? "";

		if (firstName !== "" && lastName !== "") return `${firstName} ${lastName}`;

		return userInfo.email ?? "";
	};

	return (
		<div className="flex justify-center w-full items-center px-6 md:px-0">
			<Card className="w-full max-w-md">
				<CardHeader className="flex justify-center flex-col items-center relative">
					<div className="border-2 rounded-full p-2">
						<UserIcon className="h-10 w-10" />
					</div>
					<h2 className="mt-2 font-bold text-lg">{getName()}</h2>
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
						<Button size="icon" className="absolute -top-2 right-5">
							<SquarePen />
						</Button>
					)}
				</CardHeader>
			</Card>
		</div>
	);
};

export default ProfileHeader;
