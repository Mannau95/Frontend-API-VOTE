export default function Card({ children, className = "" }) {
    return (
        <div className={`bg-white rounded-2xl ring-1 ring-slate-200 shadow-sm ${className}`}>
            {children}
        </div>
    );
}