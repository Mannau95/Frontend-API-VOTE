export function isQuotaAtLimit(usage, usedKey, limitKey) {
    if (!usage) return false;
    const used = usage[usedKey];
    const limit = usage[limitKey];
    if (used == null || limit == null || limit <= 0) return false;
    return used >= limit;
}
