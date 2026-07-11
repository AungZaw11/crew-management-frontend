import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

import { useLanguage } from "../../common/hooks/LanguageContext";

export default function DonutCard({ title, total, data, delay = 0 }) {
  const delayClass =
    delay === 0.1
      ? "delay-100"
      : delay === 0.2
        ? "delay-200"
        : delay === 0.3
          ? "delay-300"
          : "";

  return (
    <div
      className={`bg-surface border border-border rounded-[6px] shadow-card p-5 flex flex-col h-[233px] opacity-0 animate-scale-in ${delayClass}`}
    >
      <h3 className="text-base font-medium text-text tracking-wide mb-2">
        {title}
      </h3>
      <div className="flex-grow flex items-center justify-between">
        <div className="relative w-[140px] h-[140px] flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={46}
                outerRadius={70}
                stroke="none"
                dataKey="value"
                startAngle={90}
                endAngle={-270}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-bold text-text tracking-wide leading-none">
              {total}
            </span>
            <span className="text-base text-text opacity-85 tracking-wide mt-1">
              Total
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-3 ml-4 flex-grow">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between w-full"
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs text-text tracking-wide">
                  {item.label}
                </span>
              </div>
              <span className="text-xs font-semibold text-[#2A2E33] tracking-wide">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
