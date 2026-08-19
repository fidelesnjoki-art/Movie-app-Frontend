function Rating({ value = 0 }) {
  return (
    <div className="text-sm text-[#f6b042]">
      {"★".repeat(Math.max(1, Math.min(5, Math.round(value))))}
      <span className="text-gray-500"> {value.toFixed ? value.toFixed(1) : value}</span>
    </div>
  );
}

export default Rating;
