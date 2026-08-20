// I created the Rating component to display and select movie ratings using five stars.
function Rating({ value, onChange, readOnly = false, size = "md" }) {
  const starSize = size === "lg" ? "text-2xl" : size === "sm" ? "text-sm" : "text-lg";

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          disabled={readOnly}
          onClick={() => onChange?.(s)}
          className={`${starSize} transition-colors leading-none ${
            readOnly ? "cursor-default" : "cursor-pointer hover:scale-110"
          } ${s <= value ? "text-[#f6b042]" : "text-gray-600"}`}
        >
            <span className="sr-only">{s} star{ s > 1 ? "s" : "" }</span>
        </button>
      ))}
    </div>
  );
}

export default Rating;
