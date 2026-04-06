export function FieldWrapper({ label, hint, error, children }) {
    return (
        <div className="flex flex-col gap-1.5">
            {label && (
                <label className="text-sm font-medium text-gray-800">{label}</label>
            )}
            {children}
            {error ? (
                <p className="text-xs text-red-500">{error}</p>
            ) : hint ? (
                <p className="text-xs text-gray-400">{hint}</p>
            ) : null}
        </div>
    );
}

export function TextInput({ label, hint, error, registration, ...props }) {
    return (
        <FieldWrapper label={label} hint={hint} error={error}>
            <input
                type="text"
                className={`w-full border rounded-lg px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition ${
                    error ? "border-red-400 bg-red-50" : "border-gray-300 bg-white"
                }`}
                {...registration}
                {...props}
            />
        </FieldWrapper>
    );
}

export function DateInput({ label, hint, error, registration, ...props }) {
    return (
        <FieldWrapper label={label} hint={hint} error={error}>
            <input
                type="date"
                className={`w-full border rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition ${
                    error ? "border-red-400 bg-red-50" : "border-gray-300 bg-white"
                }`}
                {...registration}
                {...props}
            />
        </FieldWrapper>
    );
}

export function Textarea({ label, hint, error, registration, rows = 5, ...props }) {
    return (
        <FieldWrapper label={label} hint={hint} error={error}>
      <textarea
          rows={rows}
          className={`w-full border rounded-lg px-3 py-2 text-sm text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-300 transition ${
              error ? "border-red-400 bg-red-50" : "border-gray-300 bg-white"
          }`}
          {...registration}
          {...props}
      />
        </FieldWrapper>
    );
}

export function SelectInput({ label, hint, error, registration, options = [], ...props }) {
    return (
        <FieldWrapper label={label} hint={hint} error={error}>
            <select
                className={`w-full border rounded-lg px-3 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300 transition appearance-none ${
                    error ? "border-red-400" : "border-gray-300"
                }`}
                {...registration}
                {...props}
            >
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </FieldWrapper>
    );
}

export function CheckboxInput({ label, hint, error, registration, ...props }) {
    return (
        <div className="flex flex-col gap-1">
            <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-300 accent-indigo-600"
                    {...registration}
                    {...props}
                />
                <span className="text-sm font-medium text-gray-800">{label}</span>
            </label>
            {error ? (
                <p className="text-xs text-red-500 ml-6">{error}</p>
            ) : hint ? (
                <p className="text-xs text-gray-400 ml-6">{hint}</p>
            ) : null}
        </div>
    );
}

export function FormSection({ title, subtitle, children }) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col gap-5">
            <div className="border-b border-gray-100 pb-4">
                <h2 className="text-base font-semibold text-gray-900">{title}</h2>
                {subtitle && <p className="text-sm text-gray-400 mt-0.5">{subtitle}</p>}
            </div>
            {children}
        </div>
    );
}