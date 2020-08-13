import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('user_tokens', table => {
    table.increments('id').primary();
    table.string('token').notNullable();
    table.string('user_id').notNullable();
    table.timestamp('created_at')
      .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
      .notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('user_tokens');
}
