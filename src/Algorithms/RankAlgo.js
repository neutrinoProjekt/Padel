export function elo_calc(RatingA, RatingB, S_A) {
    
    /*
    E_X -> Expected score for X
    N_X -> New Rating for X
    S_A -> Actual Score for A

    Types of S_A
        Victory -> S_A = 1
        Defeat -> S_A = 0
        Draw -> S_A = 0.5
    */

    let E_A = 1 / (1+10 ** ((RatingB - RatingA) / 400));
    let E_B = 1 - E_A;
    let N_A = RatingA + 32(S_A - E_A);
    let N_B = RatingB + 32((1-S_A) - E_B);

    // todo - implement save N_A and N_B to firebase

}