export default function TextField({ label, name, value, onChange, type }) {
  return (
    <div>
      <label htmlFor={name} className="block mb-2">
        {label}
      </label>
      <input
        autoComplete="off"
        className="textField__input"
        type={type || "text"}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
