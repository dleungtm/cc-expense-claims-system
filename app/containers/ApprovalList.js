import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { claimsActions } from '../actions';
import { claimItemsActions } from '../actions';
import { approvalLimitsActions } from '../actions';
import PendingClaimContainer from './PendingClaimContainer';

class ApprovalList extends React.Component {
  constructor(props) {
    super(props);
    this.reloadData = this.reloadData.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(claimsActions.clearAll());
    this.props.dispatch(claimsActions.requestPendingApprovals());
    this.props.dispatch(approvalLimitsActions.requestByEmployee());
  }

  reloadData() {
    this.props.dispatch(claimsActions.clearAll());
    this.props.dispatch(claimsActions.requestPendingApprovals());
  }

  renderError(error) {
    return <div> {error} </div>
  }

  renderEmptyList() {
    return (
      <div className="claimlist-container">
      </div>
    )
  }

  renderFetching() {
    return <div className="loader"></div>
  }

  render() {
    const { employee, claimsMap, policies, error, isFetching } = this.props;
    
    if (error !== undefined) {
      return this.renderError(error);
    }

    if (isFetching && claimsMap == undefined) {
      return this.renderFetching();
    }

    if (!isFetching && (claimsMap == undefined || Object.keys(claimsMap)[0] == undefined)) {
      return this.renderEmptyList();
    }

    return (
        <div>
          <button className="page-button-blue" onClick={this.reloadData}> Refresh</button>  
          <div className="claim-list">
            {Object.entries(claimsMap).map((claim_tuple) => {
              var claim = claim_tuple[1]
                return <PendingClaimContainer
                          claim={claim}
                          employee={employee}
                          key={claim.claim_id}/>
            })}
          </div>
        </div>
    )
  }
}

function mapStateToProps(state) {
  const { authentication, claims, policies } = state;
  const { employee } = authentication;
  const { claimsMap, error, isFetching } = claims;

  return {
    employee,
    claimsMap,
    policies,
    error,
    isFetching
  };
}
export default withRouter(connect(mapStateToProps)(ApprovalList))
