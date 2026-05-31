"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type Props = {
  data: Array<{ day: string; bookings: number }>;
};

export function AdminAnalytics({ data }: Props) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
          <XAxis dataKey="day" stroke="#a1a1aa" />
          <YAxis stroke="#a1a1aa" />
          <Tooltip cursor={{ fill: "rgba(161, 98, 7, 0.1)" }} />
          <Bar dataKey="bookings" fill="#fbbf24" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
