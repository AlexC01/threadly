import Threads from "@/components/Home/Threads";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Home() {
	return (
		<main className="min-h-screen">
			<div className="max-w-7xl mx-auto py-12 md:py-16">
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
				<div className="mt-16 px-4 md:px-8 max-w-2xl mx-auto">
					<Card className="px-8">
						<h3 className="text-2xl font-bold">Why Sign In?</h3>
						<ul className="list-disc [&>li]:mt-2 -mt-2">
							<li>Bookmark favorite threads</li>
							<li>Manage your own posts</li>
							<li>Get a persistent anonymous ID</li>
						</ul>
						<Button className="mt-2" variant="outline">
							Log In / Sign Up
						</Button>
					</Card>
				</div>
			</div>
		</main>
	);
}
