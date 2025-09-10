"use client";

import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import type { ThreadWithStats } from "@/lib/Models/BaseModels";
import { supabase } from "@/lib/supabaseClient";
import ThreadCard from "../Threads/ThreadCard";

interface ThreadsProps {
	initialThreads: ThreadWithStats[];
}
const sortOptions = ["new", "top", "hot"];
const PAGE_SIZE = 2;

const Threads = ({ initialThreads }: ThreadsProps) => {
	const [sort, setSort] = useState("new");
	const [threads, setThreads] = useState<ThreadWithStats[]>(
		initialThreads || [],
	);
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(initialThreads.length === PAGE_SIZE);
	const [loadingMore, setLoadingMore] = useState(false);

	const loadMoreThreads = async () => {
		setLoadingMore(true);
		const from = page * PAGE_SIZE;
		const to = from + PAGE_SIZE - 1;

		try {
			const { data, error } = await supabase
				.rpc("get_threads_with_stats", {
					sort_by: sort,
				})
				.range(from, to);

			if (error) console.error("Error fetching more threads", error);
			else {
				setThreads((prev) => [...prev, ...data]);
				setPage((prevPage) => prevPage + 1);
				if (data.length < PAGE_SIZE) setHasMore(false);
			}
		} catch (err) {
			console.error("Error fetching more threads", err);
		} finally {
			setLoadingMore(false);
		}
	};

	useEffect(() => {
		const fetchThreads = async () => {
			setLoading(true);

			try {
				const { data, error } = await supabase
					.rpc("get_threads_with_stats", {
						sort_by: sort,
					})
					.range(0, PAGE_SIZE - 1);

				if (error) {
					console.error("Error fetching threeds", error);
				} else {
					setThreads(data || []);
					setPage(1);
					setHasMore(true);
				}
			} catch (err) {
				console.error("Error fetching threeds", err);
				setThreads([]);
			} finally {
				setLoading(false);
			}
		};
		if (sort !== "new") fetchThreads();
		else {
			setThreads(initialThreads);
			setPage(1);
			setHasMore(true);
		}
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
			<section className="mt-10 relative">
				{loading && (
					<div className="absolute inset-0 bg-background/50 backdrop-blur-xs flex items-center justify-center z-10">
						<Loader className="animate-spin w-12 h-12" />
					</div>
				)}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					{threads.map((thread) => (
						<ThreadCard key={thread.id} thread={thread} />
					))}
				</div>
			</section>
			{hasMore && (
				<div className="flex justify-center mt-10">
					<Button
						onClick={loadMoreThreads}
						disabled={loadingMore}
						className="flex items-center"
					>
						{loadingMore ? "Loading..." : "Load More"}
						{loadingMore && <Loader className="animate-spin" />}
					</Button>
				</div>
			)}
		</>
	);
};

export default Threads;
