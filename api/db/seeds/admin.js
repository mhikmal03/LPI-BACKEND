/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('admin').del()
  await knex('admin').insert([
    {
      id: 1, 
      firstName: 'Admin',
      lastName: 'Utama',
      password: '$2a$12$4FpKWC/no3L1pUtu8OBxLeFMtBdSg5zeb846jct/iksXuAk/AC3Ju' //rahasiaadmin
    }
  ]);
};
