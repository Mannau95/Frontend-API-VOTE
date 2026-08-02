export function getCandidatureStatus(candidature) {
    if (!candidature) {
        return { label: "Inconnu", variant: "default" };
    }
    if (candidature.reject_message) {
        return { label: "Rejetée", variant: "danger" };
    }
    if (candidature.is_accepted) {
        return { label: "Acceptée", variant: "success" };
    }
    return { label: "En attente", variant: "warning" };
}
