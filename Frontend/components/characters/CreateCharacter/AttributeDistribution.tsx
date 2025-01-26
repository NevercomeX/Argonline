import React from "react";

type AttributeKeys = "str" | "agi" | "vit" | "int" | "dex" | "luk";

interface AttributeDistributionProps {
  attributes: Record<AttributeKeys, number>;
  points: number;
  onAttributeChange: (attribute: AttributeKeys, increment: boolean) => void;
}

const AttributeDistribution: React.FC<AttributeDistributionProps> = ({
  attributes,
  points,
  onAttributeChange,
}) => (
  <div>
    <label className="block font-medium mb-1">Distribute Attributes</label>
    <p className="text-sm text-gray-500 mb-2">Points Remaining: {points}</p>
    <div className="grid grid-cols-2 gap-2">
      {Object.entries(attributes).map(([key, value]) => (
        <div key={key} className="flex justify-between items-center">
          <span className="capitalize">{key.toUpperCase()}</span>
          <div className="flex space-x-2 items-center">
            <button
              type="button"
              onClick={() => onAttributeChange(key as AttributeKeys, false)}
              disabled={value <= 0}
              className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              -
            </button>
            <span>{value}</span>
            <button
              type="button"
              onClick={() => onAttributeChange(key as AttributeKeys, true)}
              disabled={points <= 0}
              className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              +
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default AttributeDistribution;
