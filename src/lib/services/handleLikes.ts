import { supabase } from "../supabase/client";

export const handleLikesThreads = async (
	threadId: number,
	voteType: number | null,
	userId: string,
) => {
	try {
		if (voteType === null) {
			const { error } = await supabase
				.from("thread_votes")
				.delete()
				.match({ user_id: userId, thread_id: threadId });

			if (error) return "Failed to remove vote.";
		} else {
			const { error } = await supabase
				.from("thread_votes")
				.upsert(
					{ thread_id: threadId, vote_type: voteType, user_id: userId },
					{ onConflict: "thread_id, user_id" },
				);

			if (error) return "Failed to cast vote.";
		}
		return null;
	} catch (err) {
		return "Error while voting";
	}
};

export const calculateScore = (
	currentVote: number | null,
	voteType: number | null,
) => {
	let scoreChange = 0;

	if (currentVote === null) scoreChange = voteType!;
	else if (voteType === null) scoreChange = -currentVote;
	else scoreChange = voteType - currentVote;

	return scoreChange;
};
