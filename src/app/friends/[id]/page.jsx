"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import friends from "../../../../public/friends.json";
import CheckInButtons from "./CheckInButtons";
import { Bell, Archive, Trash2, Pencil } from "lucide-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const statusStyle = (status) => {
    if (status === "overdue") return { background: "#fee2e2", color: "#991b1b" };
    if (status === "almost due") return { background: "#fef9c3", color: "#854d0e" };
    return { background: "#dcfce7", color: "#166534" };
};

const FriendDetailsPage = () => {
    const params = useParams();
    const id = params.id;
    const friend = friends.find((f) => f.id.toString() === id);

    if (!friend) return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
            <p className="text-red-500 text-sm font-medium tracking-widest uppercase mb-2">404</p>
            <h1 className="text-2xl font-bold mb-2" style={{ color: "#244D3F" }}>Friend not found</h1>
            <p className="text-gray-400 text-sm mb-6">This person doesn't exist or was removed.</p>
        </div>
    );

    return (
        <div className="min-h-screen mt-20">
            <ToastContainer />
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* LEFT COLUMN */}
                <div className="flex flex-col gap-5">
                    <div className="bg-white/80 backdrop-blur rounded-3xl p-6 text-center shadow-sm border border-gray-100">
                        <img
                            src={friend.picture}
                            alt={friend.name}
                            className="w-24 h-24 rounded-full object-cover mx-auto mb-3 ring-4 ring-white shadow"
                        />
                        <h2 className="text-xl font-semibold text-gray-800">{friend.name}</h2>
                        <span
                            className="inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full"
                            style={statusStyle(friend.status)}
                        >
                            {friend.status}
                        </span>
                        <div className="flex flex-wrap gap-2 justify-center mt-3">
                            {friend.tags.map((tag) => (
                                <span key={tag} className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <p className="text-gray-500 text-sm mt-4 italic">"{friend.bio}"</p>
                        <p className="text-gray-400 text-xs mt-1">Preferred: email</p>
                    </div>

                    <div className="bg-white/80 backdrop-blur rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
                        <button className="flex items-center gap-3 w-full px-5 py-4 text-sm text-gray-700 hover:bg-gray-50 transition">
                            <Bell size={18} /> Snooze 2 Weeks
                        </button>
                        <button className="flex items-center gap-3 w-full px-5 py-4 text-sm text-gray-700 hover:bg-gray-50 border-t border-gray-100 transition">
                            <Archive size={18} /> Archive
                        </button>
                        <button className="flex items-center gap-3 w-full px-5 py-4 text-sm text-red-500 hover:bg-red-50 border-t border-gray-100 transition">
                            <Trash2 size={18} /> Delete
                        </button>
                    </div>
                </div>

                {/* RIGHT COLUMN */}
                <div className="md:col-span-2 flex flex-col gap-5">
                    <div className="grid grid-cols-3 gap-4">
                        {[
                            { value: friend.days_since_contact, label: "Days Since Contact" },
                            { value: friend.goal, label: "Goal (Days)" },
                            { value: new Date(friend.next_due_date).toLocaleDateString("en-US", { month: "short", day: "numeric" }), label: "Next Due" }
                        ].map((item, i) => (
                            <div key={i} className="bg-white/80 backdrop-blur rounded-2xl p-5 text-center border border-gray-100 shadow-sm hover:shadow-md transition">
                                <p className="text-2xl font-bold text-gray-800">{item.value}</p>
                                <p className="text-xs text-gray-400 mt-1">{item.label}</p>
                            </div>
                        ))}
                    </div>

                    <div className="bg-white/80 backdrop-blur rounded-3xl p-6 border border-gray-100 shadow-sm">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-semibold text-gray-800">Relationship Goal</h3>
                            <button className="flex items-center gap-1 text-xs border border-gray-200 px-3 py-1 rounded-lg hover:bg-gray-50">
                                <Pencil size={14} /> Edit
                            </button>
                        </div>
                        <p className="text-sm text-gray-500">
                            Connect every <span className="font-semibold text-gray-800">{friend.goal} days</span>
                        </p>
                    </div>

                    <div className="bg-white/80 backdrop-blur rounded-3xl p-6 border border-gray-100 shadow-sm">
                        <h3 className="font-semibold text-gray-800 mb-4">Quick Check-In</h3>
                        <CheckInButtons friendName={friend.name} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FriendDetailsPage;