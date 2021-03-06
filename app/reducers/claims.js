import { claimsConstants } from '../constants';

const initialState = {
  isFetching: false,
  claimsMap: {},
  error: undefined,
  currentClaim: {},
  approvedClaims: {},
  mileageCostSoFarPerMonth: 0
}

const claims = (state = initialState, action) => {
  let newClaimsMap;

  switch (action.type) {
    // ADD CLAIM
    case claimsConstants.ADD_CLAIM_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case claimsConstants.ADD_CLAIM_SUCCESS:
      // append stub of the newly created claim to claimsMap
      var date = new Date();
      action.claim.claim_id = action.claimId;
      action.claim.claimant_first_name = 'Processing...';
      action.claim.claimant_last_name = '';
      action.claim.approver_first_name = 'Processing...';
      action.claim.approver_last_name = '';
      action.claim.manager_first_name = 'Processing...';
      action.claim.manager_last_name = '';
      action.claim.company_name = 'Processing...';
      action.claim.date_created = date.toString();
      newClaimsMap = Object.assign({}, state.claimsMap);
      newClaimsMap[action.claimId] = action.claim;
      return Object.assign({}, state, {
        isFetching: false,
        claimsMap: newClaimsMap,
        error: undefined
      });
    case claimsConstants.ADD_CLAIM_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });

    // REMOVE CLAIM
    case claimsConstants.DELETE_CLAIM_REQUEST:
      return state;
    case claimsConstants.DELETE_CLAIM_SUCCESS:
      newClaimsMap = Object.assign({}, state.claimsMap);
      delete newClaimsMap[action.claim_id];
      return Object.assign({}, state, {
        isFetching: false,
        claimsMap: newClaimsMap,
        error: undefined
      });
      return state;
    case claimsConstants.DELETE_CLAIM_FAILURE:
      return state;

    // UPDATE CLAIM STATUS
    case claimsConstants.UPDATE_CLAIM_STATUS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case claimsConstants.UPDATE_CLAIM_STATUS_SUCCESS:
      // remove updated claim
      newClaimsMap = Object.assign({}, state.claimsMap);
      var approvedClaimsMap = Object.assign({}, state.approvedClaims);
      approvedClaimsMap[action.claim_id] = action.claim
      delete newClaimsMap[action.claim_id];
      return Object.assign({}, state, {
        isFetching: false,
        claimsMap: newClaimsMap,
        approvedClaims: approvedClaimsMap,
        error: undefined
      });
    case claimsConstants.UPDATE_CLAIM_STATUS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });

    // FETCH CLAIMS
    case claimsConstants.REQUEST_CLAIMS:
      return Object.assign({}, state, {
        isFetching: true
      });
    case claimsConstants.RECEIVE_CLAIMS:
      newClaimsMap = {};
      action.claims.forEach((claim) => {
        newClaimsMap[claim.claim_id] = claim;
      });
      return Object.assign({}, state, {
        isFetching: false,
        claimsMap: newClaimsMap,
        error: undefined
      });
    case claimsConstants.FAILURE_CLAIMS:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });

    // FETCH ONE CLAIM
    case claimsConstants.REQUEST_CLAIM:
      return Object.assign({}, state, {
        isFetching: true
      });
    case claimsConstants.RECEIVE_CLAIM:
      newClaimsMap = Object.assign({}, state.claimsMap);
      newClaimsMap[action.claim.claim_id] = action.claim;
      return Object.assign({}, state, {
        isFetching: false,
        claimsMap: newClaimsMap,
        error: undefined
      });
    case claimsConstants.FAILURE_CLAIM:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });

    // FETCH CLAIMS FOR APPROVAL
    case claimsConstants.REQUEST_PENDING_APPROVALS:
      return Object.assign({}, state, {
        isFetching: true
      });
    case claimsConstants.RECEIVE_PENDING_APPROVALS:
      newClaimsMap = {};
      action.claims.forEach((claim) => {
        newClaimsMap[claim.claim_id] = claim;
      });
      return Object.assign({}, state, {
        isFetching: false,
        claimsMap: newClaimsMap,
        error: undefined
      });
    case claimsConstants.FAILURE_PENDING_APPROVALS:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });

    // FETCH CLAIMS THAT WERE APPROVED
    case claimsConstants.REQUEST_APPROVED_APPROVALS:
      return Object.assign({}, state, {
        isFetching: true
      });
    case claimsConstants.RECEIVE_APPROVED_APPROVALS:
      newClaimsMap = {};
      action.claims.forEach((claim) => {
        newClaimsMap[claim.claim_id] = claim;
      });
      return Object.assign({}, state, {
        isFetching: false,
        approvedClaims: newClaimsMap,
        error: undefined
      });
    case claimsConstants.FAILURE_APPROVED_APPROVALS:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });
    // FETCH MILEAGE PER MONTH
    case claimsConstants.REQUEST_MILEAGE_SO_FAR_PER_MONTH:
      return Object.assign({}, state, {
        isFetching: true
      });
    case claimsConstants.RECEIVE_MILEAGE_SO_FAR_PER_MONTH:
      return Object.assign({}, state, {
        isFetching: false,
        mileageCostSoFarPerMonth: action.cost,
        error: undefined
      });
    case claimsConstants.FAILURE_MILEAGE_SO_FAR_PER_MONTH:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });
      
    // CLEAR CLAIMS
    case claimsConstants.CLEAR_CLAIMS:
      return Object.assign({}, state, {
        isFetching: false,
        claimsMap: {},
        error: undefined,
        currentClaim: {},
        approvedClaims: {}
      });
    default:
      return state;
  }
}

export default claims;
