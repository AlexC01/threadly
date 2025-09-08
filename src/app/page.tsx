import Threads from "@/components/Home/Threads";
import { Button } from "@/components/ui/button";

export default function Home() {
	return (
		<main className="min-h-screen">
			<div className="container mx-auto py-12 md:py-16">
				<div className="text-center py-12 px-4">
					<h1 className="text-5xl font-bold md:text-7xl tracking-tighter">
						Join the Conversation
					</h1>
					<h2 className="text-2xl text-muted-foreground mt-5 max-w-2xl mx-auto">
						A modern board for open and anonymous discussions.
					</h2>
				</div>
				<div className="flex justify-center px-4">
					<Button variant="default" className="font-bold px-12 text-xl py-8">
						Create Thread
					</Button>
				</div>
				<div className="mt-10 px-4 md:px-8">
					<Threads />
				</div>
			</div>
		</main>
	);
}
