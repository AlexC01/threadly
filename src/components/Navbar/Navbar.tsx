import { Menu, MessageSquareIcon, Search } from "lucide-react";
import Link from "next/link";
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

const Navbar = () => {
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
					<Button variant="default">Create Thread</Button>
					{/* 
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" size="icon" className="rounded-full">
								AC
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel className="font-bold">
								My Account
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>My Profile</DropdownMenuItem>
							<DropdownMenuItem>My Bookmarks</DropdownMenuItem>
							<DropdownMenuItem>Settings</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem className="text-red-500 focus:bg-red-500 focus:text-white ">
								Log Out
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu> */}
					<Button variant="outline">Sign Up</Button>
					<Button variant="destructive">Log In</Button>
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
								<Button variant="default">Sign Up</Button>
								<Button variant="outline">Log In</Button>
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
