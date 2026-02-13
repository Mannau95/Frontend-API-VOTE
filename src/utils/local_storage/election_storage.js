export const getElectionById = (id) => {
    const elections = JSON.parse(localStorage.getItem('vote_elections'));
    const election = elections.find((election) => election.id === id);
    console.log(election);
    return election
}