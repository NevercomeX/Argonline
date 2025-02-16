// components/Characters/Details/CharacterInfo.tsx
import React from "react";

interface CharacterInfoProps {
  baseLevel: number;
  jobLevel: number;
  gender: string;
}

const CharacterInfo = ({ baseLevel, jobLevel, gender }: CharacterInfoProps) => {
  return (
    <div className="border p-4 rounded-lg bg-gray-50 shadow">
      <h2 className="text-xl font-bold mb-4">General Information</h2>
      <p>
        <span className="font-medium">Base Level:</span> {baseLevel}
      </p>
      <p>
        <span className="font-medium">Job Level:</span> {jobLevel}
      </p>
      <p>
        <span className="font-medium">Gender:</span> {gender}
      </p>
    </div>
  );
};

export default CharacterInfo;
