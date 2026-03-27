export function Input({
  label,
  error,
  className = "",
  containerClassName = "",
  ...props
}) {
  return (
    <div className={containerClassName}>
      {label && (
        <label className="block text-sm font-medium text-charcoal/80 mb-2">
          {label}
        </label>
      )}
      <input
        className={`w-full px-6 py-4 rounded-2xl border-2 border-sand bg-white text-charcoal placeholder-slate-light transition-all duration-300 focus:border-gold focus:outline-none focus:ring-4 focus:ring-gold/10 ${error ? "border-red-400" : ""} ${className}`}
        {...props}
      />
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}

export function Textarea({
  label,
  error,
  className = "",
  containerClassName = "",
  rows = 4,
  ...props
}) {
  return (
    <div className={containerClassName}>
      {label && (
        <label className="block text-sm font-medium text-charcoal/80 mb-2">
          {label}
        </label>
      )}
      <textarea
        rows={rows}
        className={`w-full px-6 py-4 rounded-2xl border-2 border-sand bg-white text-charcoal placeholder-slate-light transition-all duration-300 focus:border-gold focus:outline-none focus:ring-4 focus:ring-gold/10 resize-none ${error ? "border-red-400" : ""} ${className}`}
        {...props}
      />
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}

export function Select({
  label,
  options = [],
  error,
  className = "",
  containerClassName = "",
  ...props
}) {
  return (
    <div className={containerClassName}>
      {label && (
        <label className="block text-sm font-medium text-charcoal/80 mb-2">
          {label}
        </label>
      )}
      <select
        className={`w-full px-6 py-4 rounded-2xl border-2 border-sand bg-white text-charcoal transition-all duration-300 focus:border-gold focus:outline-none focus:ring-4 focus:ring-gold/10 ${error ? "border-red-400" : ""} ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}
