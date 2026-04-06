export function FileItem({ name }) {
    return (
        <a
            href="#"
            className="flex items-center gap-2.5 text-sm text-indigo-600 hover:text-indigo-800 hover:underline py-1.5"
        >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-gray-400">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14 2 14 8 20 8" />
            </svg>
            {name}
        </a>
    );
}