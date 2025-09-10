"use client";

import { useEffect, useState } from "react";
import type { ThreadInterface } from "@/lib/Models/ThreadModel";
import { supabase } from "@/lib/supabaseClient";
import ThreadCard from "../Threads/ThreadCard";

interface ThreadsProps {
	initialThreads: ThreadInterface[];
}
const sortOptions = ["new", "top", "hot"];

const Threads = ({ initialThreads }: ThreadsProps) => {
	const [sort, setSort] = useState("new");
	const [threads, setThreads] = useState<ThreadInterface[]>(initialThreads);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchThreads = async () => {
			setLoading(true);

			try {
				const { data, error } = await supabase.rpc("get_threads_with_stats", {
					sort_by: sort,
				});

				if (error) {
					console.error("Error fetching threeds", error);
				} else {
					setThreads(data || []);
				}
			} catch (err) {
				console.error("Error fetching threeds", err);
				setThreads([]);
			} finally {
				setLoading(false);
			}
		};
		if (sort !== "new") fetchThreads();
		else setThreads(initialThreads);
	}, [sort, initialThreads]);

	return (
		<>
			<div className="bg-muted text-muted-foreground inline-flex flex-row space-x-3 px-3 py-3 rounded-md">
				{sortOptions.map((option) => (
					<button
						key={option}
						onClick={() => setSort(option)}
						disabled={loading}
						type="button"
						className={`${
							sort === option ? "bg-background shadow-md" : ""
						} px-4 py-2 rounded-sm capitalize font-semibold transition-colors hover:bg-background/80 cursor-pointer`}
					>
						{option}
					</button>
				))}
			</div>
			<section className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
				{threads.map((thread) => (
					<ThreadCard key={thread.id} thread={thread} />
				))}
			</section>
		</>
	);
};

export default Threads;
