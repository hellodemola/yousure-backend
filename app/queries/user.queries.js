const queries = {
    deleteUser: (id) => `
      DELETE FROM users WHERE id=${id}
      `,
    findUserByEmail: `
      SELECT id, name, email FROM users WHERE email=$1
      `,
    findUserById: `
      SELECT id, name, email FROM users WHERE id=$1
      `,
    findUsersById: `
    SELECT * FROM users WHERE id=$1
    `,
   
  };
  
  exports.default = queries;