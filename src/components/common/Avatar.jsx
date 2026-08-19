function Avatar({ name, size = "md", className = "" }) {
  const initials = (name || "?")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const sizeClass = size === "lg" ? "w-14 h-14 text-lg" : size === "sm" ? "w-10 h-10 text-sm" : "w-12 h-12 text-base";

  return (
    <div className={`${sizeClass} ${className} rounded-full bg-gradient-to-br from-[#f6b042]/40 to-[#ff8c42]/20 flex items-center justify-center font-bold text-[#f6b042] shrink-0`}>
      {initials}
    </div>
  );
}

export default Avatar;
