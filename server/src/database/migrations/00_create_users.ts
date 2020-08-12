import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('users', table => {
    table.string('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.string('avatar');
    table.string('whatsapp');
    table.string('bio');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('users');
}
