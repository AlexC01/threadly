import Image from "next/image";
import startChat from "@/../public/svgs/startChat.svg";

const notFound = () => {
	return (
		<div className="h-full flex justify-center items-center flex-col">
			<Image
				src={startChat}
				alt="Start a conversation"
				width={200}
				height={200}
			/>
			<h2 className="mt-8 text-lg max-w-md text-center font-semibold">
				No messages were found
			</h2>
		</div>
	);
};

export default notFound;
