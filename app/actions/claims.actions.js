import { claimsConstants } from '../constants';
import { claimsAPI } from '../api'

export const claimsActions = {
  addClaim,
  removeClaim,
  updateStatus,
  requestAll,
  requestPendingApprovals,
  clearAll
};

function addClaim(claim) {
  return dispatch => {
    dispatch(request());
    claimsAPI.addClaim(claim)
    .then(
      res => dispatch(success(res.claim.insertId, claim)),
      error => dispatch(failure(error))
    )
  };
  function request() { return { type: claimsConstants.ADD_CLAIM_REQUEST }}
  function success(claimId, claim) { return { type: claimsConstants.ADD_CLAIM_SUCCESS, claimId, claim }}
  function failure(error) { return { type: claimsConstants.ADD_CLAIM_FAILURE, error }}
}

function removeClaim() {
  //TODO remove claim
  //expects 
  // {
  //  id
  // }
  dispatch({type: claimsConstants.REMOVE_CLAIM_REQUEST});
}

function updateStatus(claim_id, approver_id, status) {
  return dispatch => {
    dispatch(request());
    claimsAPI.updateStatus(claim_id, approver_id, status)
    .then(
      res => dispatch(success(claim_id)),
      error => dispatch(failure(error))
    );
  };
  function request() { return { type: claimsConstants.UPDATE_CLAIM_STATUS_REQUEST }}
  function success(claimId) { return { type: claimsConstants.UPDATE_CLAIM_STATUS_SUCCESS, claimId }}
  function failure(error) { return { type: claimsConstants.UPDATE_CLAIM_STATUS_FAILURE, error }}
}

function requestAll() {
  return dispatch => {
    dispatch(request());
    claimsAPI.requestAll()
    .then(
      res => dispatch(success(res.claims)),
      error => dispatch(failure(error))
    );
  };
  
  function request() { return { type: claimsConstants.REQUEST_CLAIMS }}
  function success(claims) { return { type: claimsConstants.RECEIVE_CLAIMS, claims }}
  function failure(error) { return { type: claimsConstants.FAILURE_CLAIMS, error }}
}

function requestPendingApprovals() {
  return dispatch => {
    dispatch(request());
    claimsAPI.requestPendingApprovals()
    .then(
      res => dispatch(success(res.claims)),
      error => dispatch(failure(error))
    );
  };
  
  function request() { return { type: claimsConstants.REQUEST_PENDING_APPROVALS }}
  function success(claims) { return { type: claimsConstants.RECEIVE_PENDING_APPROVALS, claims }}
  function failure(error) { return { type: claimsConstants.FAILURE_PENDING_APPROVALS, error }}
}

function clearAll() {
  return dispatch => {
    dispatch({ type: claimsConstants.CLEAR_CLAIMS });
  }
}