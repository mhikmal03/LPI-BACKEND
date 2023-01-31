/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable('proyek', (table) => {
        table.increments('id');
        table.integer('thumbnail')
          .unsigned()
          .index('foreign_key_proyek_galery')
          .references('id_galery')
          .inTable('galery');
        table.string('nama', 150).notNullable();
        table.string('lokasi', 150);
        table.date('tanggal').notNullable();
        table.text('content').notNullable();
        table.text('dampak_sebelum');
        table.text('dampak_sesudah');
        table.text('dokumentasi');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('proyek'); 
};
