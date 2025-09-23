import { isSameDay } from "date-fns";
import type { MessageWithUsername } from "../Models/BaseModels";

export function shouldShowTimestamp(
	currentMsg: MessageWithUsername,
	nextMsg?: MessageWithUsername,
): boolean {
	if (!nextMsg) {
		return true;
	}
	if (currentMsg.sender_id !== nextMsg.sender_id) {
		return true;
	}
	const timeDifference =
		new Date(nextMsg.created_at).getTime() -
		new Date(currentMsg.created_at).getTime();
	if (timeDifference > 5 * 60 * 1000) {
		return true;
	}
	return false;
}

export function shouldShowDateDivider(
	currentMsg: MessageWithUsername,
	prevMsg?: MessageWithUsername,
): boolean {
	if (!prevMsg) {
		return true;
	}
	if (
		!isSameDay(new Date(prevMsg.created_at), new Date(currentMsg.created_at))
	) {
		return true;
	}
	return false;
}
