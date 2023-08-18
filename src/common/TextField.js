export default function TextField({ label, name, onChange, type, formik, placeholder }) {
  return (
    <div>
      <label htmlFor={name} className="block mb-3">
        {label}
      </label>

      <input
        autoComplete="off"
        className="textField__input mb-2"
        type={type || "text"}
        name={name}
        id={name}
        value={formik?.values[name]}
        onChange={onChange || formik?.handleChange}
        onBlur={formik?.handleBlur}
        placeholder={placeholder}
      />

      {formik?.touched[name] && formik?.errors[name] ? (
        <div className="mb-1 ml-2 text-rose-500 text-left text-xs font-bold">
          {formik.errors[name]}
        </div>
      ) : null}
    </div>
  );
}
