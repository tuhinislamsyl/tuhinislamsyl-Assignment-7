import Friends from "./friends/page";
import friends from "../../public/friends.json";
import { ClipLoader } from "react-spinners";

const HomePage = () => {

    const loading = false;

    const totalFriends = friends.length;

    const onTrack = friends.filter(
        (f) => f.status.toLowerCase() === "on-track"
    ).length;

    const overdue = friends.filter(
        (f) => f.status.toLowerCase() === "overdue"
    ).length;

    const almostDue = friends.filter(
        (f) => f.status.toLowerCase() === "almost due"
    ).length;
    return (
        <div className="bg-gray-50 min-h-screen px-4 sm:px-6 lg:px-10 py-8 sm:py-10">
            <div className="max-w-7xl mx-auto">

                {/* Hero Section */}
                <div className="text-center mb-10 sm:mb-12">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                        Friends to keep close in your life
                    </h1>

                    <p className="text-gray-500 max-w-xl mx-auto mb-5 text-sm sm:text-base">
                        Your personal shelf of meaningful connections. Browse, tend, and
                        nurture the relationships that matter most.
                    </p>

                    <button className="bg-[#1e4d3a] text-white px-5 py-2 rounded-md hover:opacity-90 transition text-sm sm:text-base">
                        + Add a Friend
                    </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5 mb-8 sm:mb-10">
                    {[
                        { value: totalFriends, label: "Total Friends" },
                        { value: onTrack, label: "On Track" },
                        { value: almostDue, label: "Almost Due" },
                        { value: overdue, label: "Overdue" },
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="bg-white rounded-lg shadow-sm p-4 sm:p-6 text-center"
                        >
                            <h2 className="text-xl sm:text-2xl font-bold text-[#1e4d3a]">
                                {item.value}
                            </h2>
                            <p className="text-gray-500 text-xs sm:text-sm">
                                {item.label}
                            </p>
                        </div>
                    ))}
                </div>

                <hr className="mb-6 sm:mb-8 border-[#E9E9E9]" />

                {/* Friends */}
                <h2 className="text-base sm:text-lg font-semibold text-gray-700 mb-4 sm:mb-5">
                    Your Friends
                </h2>

                {/* Responsive Grid */}
                {
                    loading ? (
                        <div className="flex justify-center items-center py-20">
                            <ClipLoader size={60} color="#1e4d3a" />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                            <Friends />
                        </div>
                    )
                }


            </div>
        </div>
    );
};

export default HomePage;