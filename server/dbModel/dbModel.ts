//Pool is a connection pooling mechanism specifically designed for PostgreSQL that helps manage and
//share connections among multiple clients or applications.
import { Pool } from 'pg';

//URL where the database live
const URI =
  'postgres://zwyukzmm:oM8otmPCWbQqCaM6sYz8KAAapGA0aQXH@hattie.db.elephantsql.com/zwyukzmm';

const pool = new Pool({
  connectionString: URI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
  pool: pool,
};
