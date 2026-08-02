const STATUS_LABELS = {
    en_attente: { label: "En attente", variant: "warning" },
    accepte: { label: "Accepté", variant: "success" },
    rejete: { label: "Rejeté", variant: "danger" },
};

export function getCandidatureStatus(candidature) {
    if (!candidature) {
        return { label: "Inconnu", variant: "default" };
    }
    return STATUS_LABELS[candidature.status] ?? { label: "Inconnu", variant: "default" };
}
