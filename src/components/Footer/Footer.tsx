import { MessageSquareIcon } from "lucide-react";
import Link from "next/link";
import { GitHubIcon } from "@/components/Icons/github-icon";
import { XIcon } from "@/components/Icons/x-icon";
import { Button } from "@/components/ui/button";

const Footer = () => {
	return (
		<footer className="border-t">
			<div className="max-w-7xl mx-auto flex items-center flex-col gap-6 sm:flex-row sm:gap-0 py-8 justify-between h-16 px-4 lg:px-0">
				<Link href="/" className="flex items-center space-x-2">
					<MessageSquareIcon className="h-6 w-6 -mt-2 text-foreground" />
					<span className="font-bold text-2xl inline-block">Threadly</span>
				</Link>
				<p className="text-sm text-muted-foreground">
					© {new Date().getFullYear()} Threadly. All rights reserved.
				</p>

				<div className="flex items-center space-x-6">
					<Link
						href="/about"
						className="text-sm text-muted-foreground hover:text-foreground transition-colors"
					>
						/about
					</Link>
					<Link
						href="/guidelines"
						className="text-sm text-muted-foreground hover:text-foreground transition-colors"
					>
						/guidelines
					</Link>
					<div className="flex items-center space-x-2">
						<Button variant="ghost" size="icon" asChild>
							<Link
								href="https://github.com/your-username/threadly"
								target="_blank"
							>
								<GitHubIcon />
								<span className="sr-only">GitHub</span>
							</Link>
						</Button>
						<Button variant="ghost" size="icon" asChild>
							<Link href="https://twitter.com/your-username" target="_blank">
								<XIcon />
								<span className="sr-only">Twitter</span>
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
