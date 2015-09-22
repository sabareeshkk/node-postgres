var pg = require('knex')({
  client: 'pg',
  connection: 'postgres://postgres:abcd1234@localhost:5432/nodejs'
});


pg.schema.createTable('users3', function(table) {
  table.increments('id');
  table.string('user_name');
})
.createTable('accounts1', function(table) {
  table.increments('id');
  table.string('account_name');
  table.integer('user_id').unsigned().references('users3.id');
})

.then(function() {
  return pg.insert({user_name: 'Tim'}).into('users');
})

.then(function(rows) {
  return pg.table('accounts').insert({account_name: 'pg', user_id: rows[0]});
})

.then(function() {
  return pg('users')
    .join('accounts', 'users.id', 'accounts.user_id')
    .select('users.user_name as user', 'accounts.account_name as account');
})

// .map over the results
.map(function(row) {
  console.log(row);
})

// Finally, add a .catch handler for the promise chain
.catch(function(e) {
  console.error(e);
});