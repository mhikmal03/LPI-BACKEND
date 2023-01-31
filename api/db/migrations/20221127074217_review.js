/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('review', (table) => {
        table.increments('id');
        table.string('username', 100).notNullable();
        table.string('userProfession', 150).notNullable();
        table.text('testimoni').notNullable();
        table.timestamp('dateCreated').notNullable().defaultTo(knex.fn.now());
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('review')
};
