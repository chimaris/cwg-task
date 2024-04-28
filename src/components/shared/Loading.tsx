import { ClipLoader } from "react-spinners";

const Loading = () => {
	return (
		<div data-testid="loading-indicator" className="flex items-center justify-center h-screen">
			<ClipLoader size={50} color={"#fff"} loading={true} />
		</div>
	);
};

export default Loading;
