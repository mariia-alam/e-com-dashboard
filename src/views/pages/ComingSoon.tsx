import { FiClock } from "react-icons/fi";

function ComingSoon() {
    return (
        <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="text-center space-y-4">
            <div className="flex justify-center">
            <FiClock className="w-16 h-16 text-gray-500 animate-pulse" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800">Coming Soon</h1>
            <p className="text-gray-500">We’re working hard to make this page live</p>
        </div>
        </div>
    );
}

export default ComingSoon;
