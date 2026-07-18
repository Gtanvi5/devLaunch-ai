"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface ChartProps {
  data: { year: number; conservative: number; optimistic: number }[];
}

export default function RevenueChart({ data }: ChartProps) {
  return (
    <div className="w-full h-[400px] mt-6">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          {/* Custom SVG Gradients for the bars */}
          <defs>
            <linearGradient id="colorConservative" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity={1} />{" "}
              {/* blue-500 */}
              <stop offset="100%" stopColor="#2563eb" stopOpacity={1} />{" "}
              {/* blue-600 */}
            </linearGradient>
            <linearGradient id="colorOptimistic" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity={1} />{" "}
              {/* violet-500 */}
              <stop offset="100%" stopColor="#7c3aed" stopOpacity={1} />{" "}
              {/* violet-600 */}
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#a1a1aa"
            strokeOpacity={0.25} // Subdued grid for light/dark mode compatibility
          />
          <XAxis
            dataKey="year"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#71717a", fontSize: 14 }} // zinc-500
            dy={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#71717a", fontSize: 14 }} // zinc-500
            tickFormatter={(value) => `$${value.toLocaleString()}`}
            dx={-10}
          />
          <Tooltip
            contentStyle={{
              borderRadius: "12px",
              border: "none",
              boxShadow:
                "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              color: "#18181b",
            }}
            formatter={(
              value: number | string | readonly (string | number)[] | undefined,
            ) => {
              if (Array.isArray(value)) {
                return value
                  .map((item) => `$${Number(item).toLocaleString()}`)
                  .join(", ");
              }
              return value != null ? `$${Number(value).toLocaleString()}` : "";
            }}
            cursor={{ fill: "#a1a1aa", opacity: 0.1 }} // Subtle highlight on hover
          />
          <Legend wrapperStyle={{ paddingTop: "20px" }} iconType="circle" />
          <Bar
            dataKey="conservative"
            name="Conservative Forecast"
            fill="url(#colorConservative)"
            radius={[6, 6, 0, 0]}
            barSize={40}
          />
          <Bar
            dataKey="optimistic"
            name="Optimistic Forecast"
            fill="url(#colorOptimistic)"
            radius={[6, 6, 0, 0]}
            barSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
