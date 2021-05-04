export function elo_calc(Ratings, S_A) {
    if (Ratings.length != 4) {
        return 'Incorrect number of people';
    }

    /*
    E_X -> Expected score for team X
    N_X -> New Rating for team X
    S_A -> Actual Score for the frst team in
    "Ratings" array

    Types of S_A
        Victory -> S_A = 1
        Defeat -> S_A = 0
        Draw -> S_A = 0.5
    */
    const teamA = Ratings[0] + Ratings[1];
    const teamB = Ratings[2] + Ratings[3];
    const E_A = 1 / (1+(10 ** ((teamB - teamA) / 400)));
    const E_B = 1 - E_A;
    const N_A1 = Ratings[0] + 32(S_A - E_A);
    const N_A2 = Ratings[1] + 32(S_A - E_A);
    const N_B1 = Ratings[2] + 32((1-S_A) - E_B);
    const N_B2 = Ratings[3] + 32((1-S_A) - E_B);

    // todo - implement save N_A and N_B to firebase
    return ([N_A1, N_A2, N_B1, N_B2]);
}
