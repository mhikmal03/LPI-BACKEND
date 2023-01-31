/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('article', (table) => {
        table.increments('id').primary();
        table.text('coverUrl');
        table.string('title', 65).notNullable();
        table.string('author');
        table.text('content')
        table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('article');
};
