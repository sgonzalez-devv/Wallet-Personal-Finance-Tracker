import type React from "react"

export const Bar = () => <rect />
export const BarChart = () => <svg />
export const ResponsiveContainer = ({ children }: { children: React.ReactNode }) => (
  <div style={{ width: "100%", height: "100%" }}>{children}</div>
)
export const XAxis = () => <g />
export const YAxis = () => <g />
export const PieChart = () => <svg />
export const Pie = () => <path />
export const Cell = () => <path />
export const Legend = () => <div></div>

