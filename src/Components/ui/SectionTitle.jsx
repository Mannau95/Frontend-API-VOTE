const SectionTitle = ({ children }) => {
    return <h2 className="text-base font-semibold text-gray-800 mb-4">{children}</h2>;
}

export default SectionTitle;

export function RuleItem({ children }) {
    return (
        <li className="flex items-start gap-2 text-sm text-gray-600 py-1.5 border-b border-gray-100 last:border-0">
      <span className="mt-0.5 text-indigo-400">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
        </svg>
      </span>
            {children}
        </li>
    );
}