interface JobClassSelectorProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  }
  
 const JobClassSelector: React.FC<JobClassSelectorProps> = ({ value, onChange }) => (
    <div>
      <label className="block font-medium mb-1">Job Class</label>
      <select
        title="Job Class"
        value={value}
        onChange={onChange}
        className="w-full p-2 border border-gray-300 rounded"
      >
        <option value="1">Novice</option>
        <option value="2">Swordsman</option>
        <option value="3">Archer</option>
        <option value="4">Mage</option>
      </select>
    </div>
  );
  
  export default JobClassSelector;
  