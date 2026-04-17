"use client";

import { useContext } from "react";
import { TimeLineContext } from "../../context/TimelineContext";
import { Phone, MessageCircle, Video } from "lucide-react";
import { toast } from "react-toastify";

const CheckInButtons = ({ friendName }) => {
    const { addTimeline } = useContext(TimeLineContext);

    const handleCheckIn = (type, text, emoji, label) => {
        addTimeline(`${label} with ${friendName}`, type);
        toast.success(`${label} with ${friendName} logged!`, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
        });
    };

    return (
        <div className="grid grid-cols-3 gap-4">
            <button onClick={() => handleCheckIn("call", `Call with ${friendName}`, "📞", "Call")} className="flex flex-col items-center gap-2 py-5 border border-gray-100 rounded-2xl hover:bg-gray-50 transition hover:shadow-sm">
                <Phone size={20} className="text-gray-700" />
                <span className="text-sm text-gray-600">Call</span>
            </button>
            <button onClick={() => handleCheckIn("text", `Text with ${friendName}`, "💬", "Text")} className="flex flex-col items-center gap-2 py-5 border border-gray-100 rounded-2xl hover:bg-gray-50 transition hover:shadow-sm">
                <MessageCircle size={20} className="text-gray-700" />
                <span className="text-sm text-gray-600">Text</span>
            </button>
            <button onClick={() => handleCheckIn("video", `Video with ${friendName}`, "🎥", "Video")} className="flex flex-col items-center gap-2 py-5 border border-gray-100 rounded-2xl hover:bg-gray-50 transition hover:shadow-sm">
                <Video size={20} className="text-gray-700" />
                <span className="text-sm text-gray-600">Video</span>
            </button>
        </div>
    );
};

export default CheckInButtons;