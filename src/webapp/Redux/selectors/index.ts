import { createSelector } from "reselect";
import { ROOTSTATE, SUBREDDITSTATSFEED, SUBREDDITSTAT } from "__MODELS";

/////////////////////////////////////////////////////////
// ELEMENTAL SELECTORS
/////////////////////////////////////////////////////////

export const getAllSubredditStats = (state: ROOTSTATE.ImType): SUBREDDITSTAT.ImTypes => {
    return state.get("subredditStatsFeed").get("subredditStats");
};

/////////////////////////////////////////////////////////
// MEMOIZED SELECTORS
/////////////////////////////////////////////////////////

// export const selectAllContactItems = createSelector(
//     getAllContactItems,
//     getWordForSearching,
//     (contactItems: CONTACT.ImTypes, wordForSearching: string): CONTACT.ImTypes => {
//         /* If no wordForSearching then return entire feed; else return feed filtered on word */
//         if (!wordForSearching) return contactItems;
//         return contactItems.filter(
//             (el: CONTACT.ImType) =>
//                 !!`${el.get("firstName")} ${el.get("lastName")} ${el.get("email")}`
//                     .toLowerCase()
//                     .includes(wordForSearching.toLowerCase())
//         );
//     }
// );
