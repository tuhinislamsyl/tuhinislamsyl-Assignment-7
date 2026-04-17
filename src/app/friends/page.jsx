import friends from "../../../public/friends.json";
import Link from "next/link";

const getStatusStyle = (status = "") => {
    const s = status.toLowerCase().trim();
    if (s === "overdue") return { badge: "bg-red-50 text-red-700", dot: "bg-red-400" };
    if (s === "almost due") return { badge: "bg-amber-50 text-amber-800", dot: "bg-amber-400" };
    return { badge: "bg-green-50 text-green-800", dot: "bg-green-500" };
};

const Friends = () => {
    return (
        <>
            {friends.map((friend) => {
                const { badge, dot } = getStatusStyle(friend.status);
                return (
                    <div
                        key={friend.id}
                        className="bg-white border border-gray-100 rounded-2xl p-5 flex flex-col items-center text-center gap-3 hover:border-gray-200 transition-colors"
                    >
                        <img
                            src={friend.picture}
                            alt={friend.name}
                            className="w-14 h-14 rounded-full object-cover"
                        />

                        <div>
                            <h3 className="font-medium text-gray-900 text-sm leading-tight">
                                {friend.name}
                            </h3>
                            <p className="text-xs text-gray-400 mt-0.5">
                                {friend.days_since_contact} days ago
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-1 justify-center">
                            {friend.tags?.map((tag) => (
                                <span
                                    key={tag}
                                    className="text-xs bg-green-50 text-green-800 px-2 py-0.5 rounded-full"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <span className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium ${badge}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
                            {friend.status}
                        </span>

                        <Link
                            href={`/friends/${friend.id}`}
                            className="w-full text-xs text-gray-500 border border-gray-100 rounded-lg py-1.5 hover:bg-gray-50 transition-colors"
                        >
                            View details →
                        </Link>
                    </div>
                );
            })}
        </>
    );
};

export default Friends;