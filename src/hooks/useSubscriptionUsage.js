import { useEffect, useState } from "react";
import { httpAxiosClient } from "../client/httpClient.js";

/**
 * Fetches the connected organisation's plan usage (GET /organisations/me/subscription/),
 * so pages that create quota-limited resources (elections, electors) can show a
 * proactive limit banner instead of only reacting to a 403 after submit.
 *
 * Fails open on purpose (usage stays null, no error surfaced): the backend guard
 * in vote/services/quota.py already fails open when an organisation has no
 * subscription yet, so a transient fetch error here shouldn't block the UI —
 * the real enforcement always happens server-side on submit anyway.
 */
export default function useSubscriptionUsage() {
    const [usage, setUsage] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        httpAxiosClient
            .get("/organisations/me/subscription/")
            .then((res) => {
                if (!cancelled && res.data?.succes) {
                    setUsage(res.data.data);
                }
            })
            .catch(() => {
                // Intentionally silent, see docstring above.
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, []);

    return { usage, loading };
}
