type ErrorCardProps = {
	message?: string;
};

const ErrorCard = ({ message = "" }: ErrorCardProps) => {
	return (
		<div className="flex justify-center items-center h-screen">
			<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded w-[40%] m-auto text-center" role="alert">
				<strong className="font-bold block text-2xl">Oops! 🥵😱 </strong>
				<span className="block my-2"> {message}</span>
				<span>
					{" "}
					<span className="my-2"> Unable to retrieve user data</span>. Please check your internet connection and try again.
				</span>
			</div>
		</div>
	);
};

export default ErrorCard;
