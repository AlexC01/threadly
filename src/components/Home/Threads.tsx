"use client";

import { useState } from "react";
import ThreadCard from "../Threads/ThreadCard";

const Threads = () => {
	const [sort, setSort] = useState("top");
	const sortOptions = ["top", "new", "hot"];
	return (
		<>
			<div className="bg-muted text-muted-foreground inline-flex flex-row space-x-3 px-3 py-3 rounded-md">
				{sortOptions.map((option) => (
					<button
						key={option}
						onClick={() => setSort(option)}
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
				<ThreadCard />
				<ThreadCard />
			</section>
		</>
	);
};

export default Threads;
