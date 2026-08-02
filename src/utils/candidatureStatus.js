export function getCandidatureStatus(candidature) {
    if (!candidature) {
        return { label: "Inconnu", variant: "default" };
    }
    return candidature.is_accepted
        ? { label: "Approuvée", variant: "success" }
        : { label: "Rejetée", variant: "danger" };
}
