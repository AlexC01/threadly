import Image from "next/image";
import notFoundImage from "../../public/svgs/notFoundImage.svg";

interface NotFoundPageProps {
	title: string;
	description: string;
}

const NotFoundPage = ({ title, description }: NotFoundPageProps) => {
	return (
		<main className="min-h-screen">
			<div className="max-w-7xl mx-auto py-12 md:py-16">
				<div className="flex justify-center py-12 px-4">
					<Image src={notFoundImage} alt="Not Found" width={500} height={500} />
				</div>
				<div className="mt-7 text-center">
					<h1 className="text-2xl font-bold mb-2">{title}</h1>
					<p className="text-lg text-muted-foreground">{description}</p>
				</div>
			</div>
		</main>
	);
};

export default NotFoundPage;
