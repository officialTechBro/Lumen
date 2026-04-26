"use client";

import { useEffect, useState } from "react";
import { AreaChart, Area, YAxis, ReferenceArea } from "recharts";

interface SparklineProps {
  values: number[];
  status: "flag" | "watch" | "ok";
  refLow?: number;
  refHigh?: number;
  width?: number;
  height?: number;
}

const COLORS = {
  flag:  { stroke: "#C8563A", fill: "#E8D4CC" },
  watch: { stroke: "#6B756F", fill: "rgba(107,117,111,.15)" },
  ok:    { stroke: "#5A7A3F", fill: "#D7E0C6" },
};

export default function Sparkline({
  values,
  status,
  refLow,
  refHigh,
  width = 110,
  height = 30,
}: SparklineProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted || values.length < 2) {
    return <div style={{ width, height }} />;
  }

  const c = COLORS[status];
  const data = values.map((v) => ({ v }));
  const n = data.length;

  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);
  const pad = (maxVal - minVal) * 0.15 || 1;
  const domain: [number, number] = [minVal - pad, maxVal + pad];

  const drawBand = refLow != null && refHigh != null && refHigh < 500;
  const refY1 = drawBand ? Math.max(refLow!, domain[0]) : null;
  const refY2 = drawBand ? Math.min(refHigh!, domain[1]) : null;

  return (
    <AreaChart
      width={width}
      height={height}
      data={data}
      margin={{ top: 3, right: 5, bottom: 3, left: 0 }}
    >
      <YAxis domain={domain} hide />
      {refY1 != null && refY2 != null && refY2 > refY1 && (
        <ReferenceArea y1={refY1} y2={refY2} fill="rgba(90,122,63,.08)" stroke="none" />
      )}
      <Area
        type="monotone"
        dataKey="v"
        stroke={c.stroke}
        fill={c.fill}
        strokeWidth={1.5}
        isAnimationActive={false}
        activeDot={false}
        dot={(props: any) => {
          const { cx, cy, index } = props;
          if (index !== n - 1) return <g key={`d${index}`} />;
          return (
            <g key={`d${index}`}>
              <circle cx={cx} cy={cy} r={5} fill="none" stroke={c.stroke} strokeWidth={1} opacity={0.3} />
              <circle cx={cx} cy={cy} r={3} fill={c.stroke} />
            </g>
          );
        }}
      />
    </AreaChart>
  );
}
