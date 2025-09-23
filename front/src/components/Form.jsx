import React, { useState, useEffect } from "react";

const Form = ({ fields, onSubmit, initialValues = {}, submitLabel = "Saqlash" }) => {
  const [formData, setFormData] = useState(
    fields.reduce(
      (acc, field) => ({ ...acc, [field.name]: initialValues[field.name] || "" }),
      {}
    )
  );

  const [errors, setErrors] = useState({});

  // 🔄 initialValues o‘zgarganda formani yangilash
  useEffect(() => {
    setFormData(
      fields.reduce(
        (acc, field) => ({ ...acc, [field.name]: initialValues[field.name] || "" }),
        {}
      )
    );
  }, [initialValues, fields]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    fields.forEach((f) => {
      if (f.required && !formData[f.name]) {
        newErrors[f.name] = `${f.label || f.name} majburiy`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);

    if (Object.keys(initialValues).length === 0) {
      setFormData(fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {}));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map((field) => {
          const isError = errors[field.name];

          // 🔽 Select maydon
          if (field.type === "select") {
            const options =
              typeof field.options === "function" ? field.options(formData) : field.options;

            return (
              <div key={field.name} className="flex flex-col">
                <label
                  className={`mb-1 font-medium ${isError ? "text-red-600" : "text-gray-700"}`}
                >
                  {field.label || field.name}
                  {field.required && <span className="text-red-600">*</span>}
                </label>
                <select
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className={`border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isError ? "border-red-600" : "border-gray-300"
                  }`}
                >
                  <option value="">Tanlang</option>
                  {Array.isArray(options) &&
                    options.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                </select>
                {isError && <p className="text-red-600 text-sm mt-1">{isError}</p>}
              </div>
            );
          }

          // 🔤 Oddiy input
          return (
            <div key={field.name} className="flex flex-col">
              <label
                className={`mb-1 font-medium ${isError ? "text-red-600" : "text-gray-700"}`}
              >
                {field.label || field.name}
                {field.required && <span className="text-red-600">*</span>}
              </label>
              <input
                name={field.name}
                type={field.type || "text"}
                value={formData[field.name]}
                onChange={handleChange}
                min={field.min}
                placeholder={field.placeholder || ""}
                className={`border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isError ? "border-red-600" : "border-gray-300"
                }`}
              />
              {isError && <p className="text-red-600 text-sm mt-1">{isError}</p>}
            </div>
          );
        })}
      </div>

      <button
        type="submit"
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        {submitLabel}
      </button>
    </form>
  );
};

export default Form;
