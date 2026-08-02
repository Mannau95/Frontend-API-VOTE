export const ELECTION_STATUS = {
    A_VENIR: "a_venir",
    EN_COURS: "en_cours",
    TERMINEE: "terminee",
};

export const ELECTION_STATUS_LABELS = {
    [ELECTION_STATUS.A_VENIR]: "À venir",
    [ELECTION_STATUS.EN_COURS]: "En cours",
    [ELECTION_STATUS.TERMINEE]: "Terminée",
};

export const computeElectionStatus = (beginDate, endDate) => {
    const now = new Date();
    const begin = new Date(beginDate);
    const end = new Date(endDate);

    if (now < begin) return ELECTION_STATUS.A_VENIR;
    if (now > end) return ELECTION_STATUS.TERMINEE;
    return ELECTION_STATUS.EN_COURS;
};

export const computeElectionStatusLabel = (beginDate, endDate) =>
    ELECTION_STATUS_LABELS[computeElectionStatus(beginDate, endDate)];
