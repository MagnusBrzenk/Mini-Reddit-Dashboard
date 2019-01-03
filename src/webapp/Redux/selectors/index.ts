import { createSelector } from 'reselect';
import { ROOTSTATE, SUBREDDITDATA, SUBREDDITDATUM } from '__MODELS';
// import { getImType } from "__METATYPING";

/////////////////////////////////////////////////////////
// ELEMENTAL SELECTORS
/////////////////////////////////////////////////////////

export const getAllSubredditDatums = (state: ROOTSTATE.Interface): SUBREDDITDATUM.Interface[] => {
    // return state.get('subredditData').get('subredditDatums');
    return state.subredditData.subredditDatums;
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
