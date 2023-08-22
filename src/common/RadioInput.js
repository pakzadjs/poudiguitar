function RadioInput({ id, name, value, onChange, checked, label }) {
  return (
    <div className="flex items-center gap-x-2 text-slate-200">
      <input
        type="radio"
        name={name}
        id={id}
        checked={checked}
        value={value}
        onChange={onChange}
        className="cursor-pointer border-none w-4 h-4"
      />
      <label htmlFor={id} className="cursor-pointer">
        {label}
      </label>
    </div>
  );
}
export default RadioInput;
