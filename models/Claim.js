var connection = require('../config/connect');

module.exports = {
  findAllWithEmployee: function(employee) {
    return new Promise((resolve, reject) => {
      //TODO queryString to fetch all employee claims with employee
      //must get manager first name, manager last name, expensee_type as string
      //must join with employee, and expense types
      var queryString = `SELECT 
                            claim.id as claim_id, 
                            approver.first_name as approver_first_name,
                            approver.last_name as approver_last_name, 
                            approver.email as approver_email,
                            company.name as company_name,
                            claim.cost_centre_id,
                            claim.account_number,
                            claim.description, 
                            claim.notes,
                            claim.status, 
                            claim.date_created
                           FROM
                            claim, 
                            employee claimee, 
                            employee approver,
                            company
                           WHERE 
                            claimee.id = claim.claimee_id AND 
                            approver.id = claim.approver_id AND
                            claim.company_id = company.id AND
                            claimee.email = ?`;
      connection.query(queryString, [employee.email], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },

  findOne: function(id) {
    return new Promise((resolve, reject) => {
      //TODO queryString to fetch all employee claims with id
    });
  },

  addOne: function(claim) {
    //TODO queryString to add one claim
    return new Promise((resolve, reject) => {
      const queryString = 'INSERT INTO claim SET ?';
      connection.query(queryString, claim, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    }); 
  },

  updateOne: function(claim) {
    return new Promise((resolve, reject) => {
      //TODO queryString to update one claim
    }); 
  },

  deleteOne: function(claim) {
    return new Promise((resolve, reject) => {
      //TODO queryString to delete one claim
    }); 
  }
}
