import { claimsConstants } from '../constants';

const initialState = {isFetching: true}

const claims = (state = initialState, action) => {
  switch (action.type) {
    case claimsConstants.ADD_CLAIM_REQUEST:
    case claimsConstants.ADD_CLAIM_SUCCESS:
    case claimsConstants.REMOVE_CLAIM:
      //TODO: change state of claim items
    case claimsConstants.REQUEST_CLAIMS:
      return {
        isFetching: true
      }
    case claimsConstants.RECEIVE_CLAIMS:
      const objA = Object.assign({}, state);
      objA.isFetching = false;
      objA.claimsMap = objA.claimsMap || {};
      action.claims.forEach((claim) => {
        objA.claimsMap[claim.claim_id] = claim;
      });
      return objA;
      // return {
      //   claimsList: action.claims,
      //   isFetching: false
      // }
    case claimsConstants.FAILURE_CLAIMS:
      return {
        error: action.error
      }
    case claimsConstants.REQUEST_PENDING_APPROVALS:
      return {
        isFetching: true
      }
    case claimsConstants.RECEIVE_PENDING_APPROVALS:
      const objB = Object.assign({}, state);
      objB.isFetching = false;
      objB.claimsMap = objB.claimsMap || {};
      action.claims.forEach((claim) => {
        objB.claimsMap[claim.claim_id] = claim;
      });
      return objB;
      // return {
      //   claimsList: action.claims,
      //   isFetching: false
      // }
    case claimsConstants.FAILURE_PENDING_APPROVALS:
      return {
        error: action.error
      }
    case claimsConstants.CLEAR_CLAIMS:
      return {
        isFetching: false
    }
    default:
      return state;
  }
}

export default claims;
