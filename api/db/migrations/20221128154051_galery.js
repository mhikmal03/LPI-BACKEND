/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('galery', (table) => {
        table.increments('id_galery').primary();
        table.string('filename', 150).notNullable();
        table.string('type', 50).notNullable();
        table.boolean('show_on_page').notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('galery');
};
