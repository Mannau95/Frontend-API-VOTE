export function InfoRow({ icon: Icon, label, value, isLink = false }) {
    return (
        <div className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-0">
      <span className="flex items-center gap-2 text-sm text-gray-500 min-w-[120px]">
        {Icon && <Icon size={14} className="text-gray-400 shrink-0" />}
          {label}
      </span>
            {isLink ? (
                <a href="#" className="text-sm text-indigo-600 hover:underline truncate max-w-[260px]">{value}</a>
            ) : (
                <span className="text-sm font-medium text-gray-800 text-right truncate max-w-[260px]">{value}</span>
            )}
        </div>
    );
}

export function PosteRow({ icon: Icon, label, value }) {
    return (
        <div className="flex items-start justify-between py-2.5 border-b border-gray-100 last:border-0">
      <span className="flex items-center gap-2 text-sm text-gray-400 min-w-[130px]">
        {Icon && <Icon size={13} className="shrink-0" />}
          {label}
      </span>
            <span className="text-sm font-medium text-gray-800 text-right">{value}</span>
        </div>
    );
}