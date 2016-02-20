
exports.up = function(knex, Promise) {
  return Promise.join(
    knex.schema.createTable('version', table => {
      table.string('name').primary()
      table.integer('number')
    })
  )
};

exports.down = function(knex, Promise) {
  return Promise.join(
    knex.schema.dropTable('version')
  )
};
