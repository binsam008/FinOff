export default function GlassTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;

  return (
    <div
      className="
        backdrop-blur-xl
        bg-white/10
        border border-purple-500/30
        rounded-xl
        px-4 py-3
        shadow-2xl
        text-sm
      "
    >
      {/* OFFICE NAME – PURE WHITE */}
      {label && (
        <p className="text-white mb-1 font-semibold tracking-wide">
          {label}
        </p>
      )}

      {/* VALUES */}
      {payload.map((item, i) => (
        <p key={i} className="text-gray-200">
          <span className="text-white">
            {item.name}
          </span>
          :{" "}
          <span className="font-semibold text-white">
            {typeof item.value === "number"
              ? item.value.toLocaleString()
              : item.value}
          </span>
        </p>
      ))}
    </div>
  );
}
