"use client";
import { useState } from "react";
import { useTimeline } from "../context/TimelineContext";
import { Phone, MessageCircle, Video } from "lucide-react";

const getIcon = (type) => {
  switch (type) {
    case "call":
      return <Phone size={20} className="text-gray-600" />;
    case "video":
      return <Video size={20} className="text-gray-600" />;
    case "text":
    default:
      return <MessageCircle size={20} className="text-gray-500" />;
  }
};

const getLabel = (type) => {
  switch (type) {
    case "call":
      return "Call";
    case "video":
      return "Video";
    case "text":
    default:
      return "Text";
  }
};

const parseText = (text) => {
  const match = text.match(/with (.+)$/);
  return match ? match[1] : text;
};

const TimelinePage = () => {
  const { timeline } = useTimeline();
  const [filter, setFilter] = useState("all");

  const filtered =
    filter === "all"
      ? timeline
      : timeline.filter((item) => item.type === filter);

  return (
    <div className="container mx-auto px-6 py-10">

      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Timeline
      </h1>

      {/* Filter */}
      <div className="mb-6">
        <div className="relative w-64">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full appearance-none px-4 py-2.5 border border-gray-200 rounded-xl bg-white shadow-sm text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-200 cursor-pointer"
          >
            <option value="all">All activities</option>
            <option value="call">Calls</option>
            <option value="text">Texts</option>
            <option value="video">Videos</option>
          </select>

          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            ▾
          </div>
        </div>
      </div>

      {/* Timeline */}
      {filtered.length === 0 ? (
        <p className="text-gray-400 text-sm text-center mt-20">
          No activity yet.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 px-5 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition"
            >
              {/* Icon */}
              <div className="w-11 h-11 flex items-center justify-center rounded-full bg-gray-50 border border-gray-100 shrink-0">
                {getIcon(item.type)}
              </div>

              {/* Content */}
              <div>
                <p className="text-sm text-gray-800">
                  <span className="font-bold">{getLabel(item.type)}</span>{" "}
                  <span className="text-gray-500">
                    with {parseText(item.text)}
                  </span>
                </p>

                <p className="text-xs text-gray-400 mt-0.5">
                  {new Date(item.time).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TimelinePage;