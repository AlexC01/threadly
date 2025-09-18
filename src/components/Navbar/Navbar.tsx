"use client";
import type { User } from "@supabase/supabase-js";
import {
	LoaderCircle,
	Menu,
	MessageSquareIcon,
	Search,
	User as UserIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import ThemeToggle from "@/components/Theme/theme-toggle";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import routes from "@/lib/routes";
import { supabase } from "@/lib/supabase/client";

interface NavbarProps {
	user: User | null;
}

const Navbar = ({ user }: NavbarProps) => {
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const logOut = async () => {
		setLoading(true);
		try {
			const { error } = await supabase.auth.signOut();
			if (error) {
				console.error(error.message);
				toast.error("Error while signing out");
			} else {
				router.push("/");
				router.refresh();
			}
		} catch (err) {
			console.error(err);
			toast.error("Error while signing out");
		} finally {
			setLoading(false);
		}
	};

	const getInitials = () => {
		if (!user) return null;
		const firstName = user.user_metadata?.first_name?.[0];
		const lastName = user.user_metadata?.last_name?.[0];

		if (firstName && lastName) return `${firstName}${lastName}`;

		return null;
	};

	const userInitials = getInitials();

	return (
		<header className="sticky top-0 z-50 w-full border-b-2 border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="px-6 2xl:px-0 max-w-7xl flex h-16 justify-between items-center mx-auto">
				<div className="flex items-center">
					<Link href="/" className="flex items-center space-x-2">
						<MessageSquareIcon className="h-7 w-7 text-foreground" />
						<span className="font-bold text-2xl inline-block">Threadly</span>
					</Link>
				</div>
				<div className="hidden md:flex flex-1 justify-center px-8">
					<div className="relative w-full max-w-md">
						<Input placeholder="Search threads..." className="pl-10" />
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
					</div>
				</div>
				<div className="hidden md:flex items-center space-x-4">
					<Button variant="default" asChild>
						<Link href={routes.createThread} prefetch={false}>
							Create Thread
						</Link>
					</Button>
					{user && (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="outline" className="rounded-full" size="icon">
									{userInitials ? userInitials : <UserIcon />}
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuLabel className="font-bold">
									{user.user_metadata?.username ?? user.email}
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem>Profile</DropdownMenuItem>
								<DropdownMenuItem asChild>
									<Link href={routes.bookmarks}>Bookmarks</Link>
								</DropdownMenuItem>
								<DropdownMenuItem>Settings</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem
									onClick={logOut}
									className="text-red-500 focus:bg-red-500 focus:text-white flex items-center justify-between"
								>
									Log Out
									{loading && (
										<LoaderCircle className="animate-spin text-red-500" />
									)}
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					)}
					{!user && (
						<Button asChild variant="outline">
							<Link href={routes.account} prefetch={false}>
								Sign Up / Log In
							</Link>
						</Button>
					)}
					<ThemeToggle />
				</div>

				<div className="md:hidden flex items-center">
					<Sheet>
						<SheetTrigger asChild>
							<button type="button">
								<Menu className="h-6 w-6" />
								<span className="sr-only">Toggle Menu</span>
							</button>
						</SheetTrigger>
						<SheetContent side="right">
							<SheetHeader>
								<SheetTitle className="text-2xl">Threadly</SheetTitle>
							</SheetHeader>
							<div className="flex flex-col gap-4 px-4">
								<div className="relative w-full max-w-md mb-3">
									<Input placeholder="Search threads..." className="pl-10" />
									<Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
								</div>
								<Button variant="default">Sign Up / Log In</Button>
								<ThemeToggle />
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</header>
	);
};

export default Navbar;
