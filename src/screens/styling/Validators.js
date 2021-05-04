/* eslint-disable max-len */
// temp location

/** Checks whether date has passed
 * @param {string} date - Date to be checked
 * @return {boolean} True if date has not passed, false otherwise
 */
export function validateDate(date) {
    return (new Date() <= new Date(date));
};

/** Checks whether time interval is valid, i.e timeFrom < timeTo
 * @param {string} timeFrom - Lower bound of interval
 * @param {string} timeTo - Upper bound of interval
 * @return {boolean} True if interval is valid, false otherwise
 */
export function validateTimeInterval(timeFrom, timeTo) {
    const arbDate = (time) => new Date(6969, 6, 6, time.substring(0, 2), time.substring(3, 5), 0, 0); // witchcraft
    return arbDate(timeFrom) <= arbDate(timeTo);
};

/** Checks whether rank interval is valid, i.e rank1 <= rank2
 * @param {number} rank1 - Lower bound of interval
 * @param {number} rank2 - Upper bound of interval
 * @return {boolean} True if interval is valid, false otherwise
 */
export function validateRankInterval(rank1, rank2) {
    return rank1 <= rank2;
};
