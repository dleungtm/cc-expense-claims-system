import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import PendingClaimContainer from '../../containers/PendingClaimContainer';

const Approvals = ({ props, renderEmptyList, renderError }) => {
  const {claimsMap, policies, error, isFetching, employee, reloadData } = props;

  if (error !== undefined) {
    return renderError(error);
  }

  if (Object.keys(claimsMap).length == 0) {
    return renderEmptyList();
  }


  return (
      <div>
        <button className="page-button-blue" onClick={reloadData}> Refresh</button>  
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

Approvals.propTypes = {
}

export default Approvals;