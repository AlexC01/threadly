import { ShieldCheck } from "lucide-react";
import Link from "next/link";
import Threads from "@/components/Home/Threads";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import routes from "@/lib/routes";
import { createClient } from "@/lib/supabase/server";

const PAGE_SIZE = 4;

export default async function Home() {
	const supabase = await createClient();

	const { data } = await supabase.auth.getUser();

	const { data: threads } = await supabase
		.rpc("get_threads_with_stats", {
			sort_by: "new",
			current_user_id: data.user ? data.user.id : undefined,
		})
		.range(0, PAGE_SIZE - 1);

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
					<Button
						variant="default"
						className="font-bold px-12 text-xl py-8"
						asChild
					>
						<Link href={routes.createThread} prefetch={false}>
							Create Thread
						</Link>
					</Button>
				</div>
				<div className="mt-10 px-4 md:px-8">
					<Threads initialThreads={threads ?? []} />
				</div>
				<div className="mt-16 text-center">
					<h2 className="text-4xl font-bold tracking-tight">Get Involved</h2>
					<p className="text-muted-foreground mt-4 text-lg">
						Discover the benefits of joining our community.
					</p>
				</div>
				<div className="mt-10 md:mt-16 px-4 md:px-8 gap-8 grid grid-cols-1 sm:grid-cols-2">
					<Card className="px-8">
						<h3 className="text-2xl font-bold">Why Sign In?</h3>
						<ul className="list-disc [&>li]:mt-2 -mt-2">
							<li>Bookmark favorite threads</li>
							<li>Manage your own posts</li>
							<li>Get a persistent username ID</li>
						</ul>
						<Button
							className="mt-2 uppercase font-bold"
							variant="outline"
							asChild
						>
							<Link href={data.user ? routes.profile : routes.account}>
								{data.user ? "Profile" : "Sign Up / Log In"}
							</Link>
						</Button>
					</Card>
					<Card className="flex flex-col items-center text-center">
						<ShieldCheck className="h-12 w-12 mx-auto text-primary" />
						<CardTitle className="text-xl">Community Guidelines</CardTitle>
						<CardContent>
							<p className="text-sm text-muted-foreground">
								A few simple rules to help keep Threadly a respectful and
								engaging place for everyone.
							</p>
						</CardContent>
						<CardFooter className="mx-auto">
							<Button asChild className="w-full">
								<Link href="/">Learn More</Link>
							</Button>
						</CardFooter>
					</Card>
				</div>
			</div>
		</main>
	);
}
