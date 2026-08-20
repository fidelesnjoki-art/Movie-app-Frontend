function Card({ children, className = "" }) {
  return <div className={`bg-white/3 border border-white/5 rounded-2xl ${className}`}>{children}</div>;
}

export default Card;
