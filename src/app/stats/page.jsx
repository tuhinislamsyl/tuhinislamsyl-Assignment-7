"use client";
import { useMemo } from "react";
import { useTimeline } from "../context/TimelineContext";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Phone, MessageCircle, Video, Activity } from "lucide-react";

const COLORS = {
  call: "#4ade80",
  text: "#34d399",
  video: "#6ee7b7",
};

const RADIAN = Math.PI / 180;

const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  if (percent < 0.05) return null;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      className="text-xs font-semibold"
      style={{ fontSize: 13, fontFamily: "inherit", fontWeight: 700 }}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl px-5 py-4 shadow-sm">
    <div
      className="w-11 h-11 flex items-center justify-center rounded-full shrink-0"
      style={{ backgroundColor: `${color}20` }}
    >
      <Icon size={20} style={{ color }} />
    </div>
    <div>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
      <p className="text-xs text-gray-400">{label}</p>
    </div>
  </div>
);

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0];
    return (
      <div className="bg-white border border-gray-100 rounded-xl px-4 py-2 shadow-lg text-sm">
        <span className="font-semibold text-gray-700 capitalize">{name}s</span>
        <span className="text-gray-400 ml-2">{value} check-in{value !== 1 ? "s" : ""}</span>
      </div>
    );
  }
  return null;
};

const StatsPage = () => {
  const { timeline } = useTimeline();

  const counts = useMemo(() => {
    return timeline.reduce(
      (acc, item) => {
        acc[item.type] = (acc[item.type] || 0) + 1;
        return acc;
      },
      { call: 0, text: 0, video: 0 }
    );
  }, [timeline]);

  const chartData = [
    { name: "call", value: counts.call },
    { name: "text", value: counts.text },
    { name: "video", value: counts.video },
  ].filter((d) => d.value > 0);

  const total = timeline.length;

  // Most recent contact name
  const lastItem = timeline[0];
  const parseText = (text) => {
    const match = text?.match(/with (.+)$/);
    return match ? match[1] : "—";
  };

  return (
    <div className="container mx-auto px-6 py-10 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Friendship Analytics</h1>
      </div>
      

      {/* Chart */}
      <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-6">
        <h2 className="font-semibold text-gray-800 mb-1">By Interaction Type</h2>
        

        {total === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-300">
            <Activity size={36} className="mb-3" />
            <p className="text-sm">No check-ins recorded yet.</p>
            <p className="text-xs mt-1">Head to a friend's page and log one!</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius="55%"
                outerRadius="80%"
                cornerRadius={8}
                paddingAngle={4}
                dataKey="value"
                labelLine={false}
                label={CustomLabel}
              >
                {chartData.map((entry) => (
                  <Cell key={entry.name} fill={COLORS[entry.name]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                formatter={(value) =>
                  value.charAt(0).toUpperCase() + value.slice(1) + "s"
                }
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: 13, color: "#6b7280" }}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>

      
    </div>
  );
};

export default StatsPage;