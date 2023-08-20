export default function CheckBox({ id, name, value, onChange, checked, label }) {
  return (
    <div className="flex items-center gap-x-2 text-slate-200">
      <input
        type="checkbox"
        name={name}
        id={id}
        checked={checked}
        value={value}
        onChange={onChange}
        className="cursor-pointer rounded-[5px] border-none bg-blue-100/80 w-4 h-4 checked:text-blue-900"
      />
      <label htmlFor={id} className="cursor-pointer">
        {label}
      </label>
    </div>
  );
}
