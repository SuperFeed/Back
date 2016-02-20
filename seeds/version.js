
exports.seed = function (knex, Promise) {
  return Promise.join(
    knex('version').del(),

    knex('version').insert({ name: 'current', number: 1 })
  );
};
