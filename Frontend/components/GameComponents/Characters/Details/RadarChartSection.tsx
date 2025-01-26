// components/Characters/Details/RadarChartSection.tsx
import React from "react";
import RadarChart from "./RadarChart";

interface RadarChartSectionProps {
  radarData: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
      borderColor: string;
      borderWidth: number;
    }[];
  };
  radarOptions: any;
}

const RadarChartSection = ({
  radarData,
  radarOptions,
}: RadarChartSectionProps) => {
  return (
    <div className="mt-8 border p-4 rounded-lg bg-gray-50 shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Stats Overview</h2>
      <div className="w-72 h-72 mx-auto">
        <RadarChart data={radarData} options={radarOptions} />
      </div>
    </div>
  );
};

export default RadarChartSection;
