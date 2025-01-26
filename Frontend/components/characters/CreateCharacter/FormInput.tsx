interface FormInputProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
  
const FormInput: React.FC<FormInputProps> = ({ label, value, onChange }) => (
    <div>
      <label className="block font-medium mb-1">{label}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="w-full p-2 border border-gray-300 rounded"
        placeholder={`Enter ${label.toLowerCase()}`}
      />
    </div>
  );
  
  export default FormInput;
  