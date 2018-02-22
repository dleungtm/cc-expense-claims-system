var connection = require('../config/connect');

module.exports = {
  findAllWithClaim: function(claim_id) {
    return new Promise((resolve, reject) => {
      const queryString=`
        SELECT 
          claim_item.id as claim_item_id,
          claim_item.description,
          claim_item.amount,
          claim_item.comment,
          expense_types.category as expense_category,
          claim_item.image_url,
          claim_item.no_receipt
        FROM
          claim,
          claim_item,
          expense_types
        WHERE
          claim.id = claim_item.claim_id AND
          expense_types.id = claim_item.expense_type AND
          claim_id = ?`
      connection.query(queryString, [claim_id], (err, rows) => {
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
      //TODO queryString to find one claim item
    });
  },
  
  addOne: function(item) {
    return new Promise((resolve, reject) => {
      const queryString = `INSERT INTO claim_item
                            (claim_id,
                              description,
                              amount,
                              comment,
                              expense_type,
                              no_receipt,
                              image_url)
                            VALUES
                              (?, ?, ?, ?, ?, ?, ?)`;
      connection.query(queryString, 
        [
          item.claim_id,
          item.description,
          item.amount,
          item.comment,
          item.expense_type,
          item.no_receipt,
          item.image_url
        ],
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    }); 
  },
  
  
  updateOne: function(claimItem) {
    return new Promise((resolve, reject) => {
      //TODO queryString to update one claimItem
    }); 
  },
  
  deleteOne: function(claimItem) {
    return new Promise((resolve, reject) => {
      //TODO queryString to delete one claimItem
    }); 
  }
}
  