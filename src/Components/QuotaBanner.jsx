import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

/**
 * Proactive plan-limit banner: silent while usage is comfortably under the
 * plan limit, then warns as the limit approaches and blocks (visually) once
 * it's reached. `used`/`limit` come from GET /organisations/me/subscription/
 * (see useSubscriptionUsage). Renders nothing if either is missing so a
 * failed/slow fetch never shows a false warning.
 */
export default function QuotaBanner({ used, limit, resourceLabel, className = "" }) {
    const navigate = useNavigate();

    if (used == null || limit == null || limit <= 0) return null;

    const atLimit = used >= limit;
    const nearLimit = used / limit >= 0.8;
    if (!atLimit && !nearLimit) return null;

    return (
        <div
            className={`rounded-lg border px-4 py-3 flex items-start gap-3 text-sm ${
                atLimit
                    ? "bg-red-50 border-red-200 text-red-700"
                    : "bg-amber-50 border-amber-200 text-amber-700"
            } ${className}`}
        >
            <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
            <div className="flex-1">
                <p className="font-medium">
                    {atLimit
                        ? `Limite du plan atteinte (${limit} ${resourceLabel} max).`
                        : `Vous approchez de la limite de votre plan (${used}/${limit} ${resourceLabel}).`}
                </p>
                <button
                    type="button"
                    onClick={() => navigate("/abonnement")}
                    className="mt-1 text-xs font-semibold underline underline-offset-2 hover:no-underline"
                >
                    Changer de plan
                </button>
            </div>
        </div>
    );
}
