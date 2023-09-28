import { Checkbox } from "@nextui-org/react";

export default function CheckBox({ id, name, value, onChange, checked, label }) {
  const classNames = {
    base: "gap-x-2",
    label: "text-slate-200",
  };

  return (
    <div className="flex items-center gap-x-2 text-slate-200">
      <Checkbox
        classNames={classNames}
        name={name}
        id={id}
        isSelected={checked}
        value={value}
        onChange={onChange}
      >
        {label}
      </Checkbox>
    </div>
  );
}
