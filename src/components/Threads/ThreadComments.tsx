import { Separator } from "@/components/ui/separator";
import type { ThreadCommentsType } from "@/lib/Models/BaseModels";

interface ThreadCommentsProps {
	comment_count: number;
	comments: ThreadCommentsType[];
}

const ThreadComments = ({ comments, comment_count }: ThreadCommentsProps) => {
	return (
		<div className="mt-20">
			<Separator className="mt-20" />
			<h2 className="mt-4 text-xl font-bold">Replies ({comment_count})</h2>
			{comment_count === 0 && (
				<div className="mt-4 flex justify-center items-center flex-col">
					<h3 className="text-2xl font-semibold text-muted-foreground">
						Be the first to comment
					</h3>
					<p className="mt-4 max-w-md text-center text-muted-foreground">
						Nobody's responded to this post yet. Add your thoughts and get the
						conversation going.
					</p>
				</div>
			)}
		</div>
	);
};

export default ThreadComments;
