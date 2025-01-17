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
        <option value="">Select a class</option>
        <option value="1">Swordsman</option>
        <option value="2">Archer</option>
        <option value="3">Mage</option>
      </select>
    </div>
  );
  
  export default JobClassSelector;
  