// components/Characters/Details/ExperienceInfo.tsx
import React from "react";

interface ExperienceInfoProps {
  baseExp: number;
  maxBaseExp: number;
  jobExp: number;
  maxJobExp: number;
}

const ExperienceInfo = ({
  baseExp,
  maxBaseExp,
  jobExp,
  maxJobExp,
}: ExperienceInfoProps) => {
  return (
    <div className="border p-4 rounded-lg bg-gray-50 shadow">
      <h2 className="text-xl font-bold mb-4">Experience</h2>
      <p>
        <span className="font-medium">Base EXP:</span>{" "}
        {((baseExp / maxBaseExp) * 100).toFixed(2)}%
      </p>
      <p>
        <span className="font-medium">Job EXP:</span>{" "}
        {((jobExp / maxJobExp) * 100).toFixed(2)}%
      </p>
    </div>
  );
};

export default ExperienceInfo;
