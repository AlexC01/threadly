"use client";

import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";

const TimeAgo = ({ dateString }: { dateString: string }) => {
	const [timeAgo, setTimeAgo] = useState("");

	useEffect(() => {
		if (dateString) {
			const date = new Date(dateString);
			setTimeAgo(formatDistanceToNow(date, { addSuffix: true }));
		}
	}, [dateString]);

	return <span>{timeAgo}</span>;
};

export default TimeAgo;
