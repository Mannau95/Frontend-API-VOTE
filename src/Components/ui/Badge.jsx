const Badge = ({ variant = "default", className = "", children }) => {
    const variants = {
        default: "bg-gray-100 text-gray-700",
        success: "bg-emerald-100 text-emerald-700",
        approved: "bg-blue-100 text-blue-700",
        warning: "bg-amber-100 text-amber-700",
        active: "bg-indigo-100 text-indigo-600",
        danger: "bg-red-100 text-red-700",
    };
    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
    );
}
export default Badge;