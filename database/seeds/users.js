
exports.seed = async function(knex) {
  await knex('users').truncate();
    await knex('users').insert([
        {username: 'Joe', password: '123', department: 'sporting goods'},
        {username: 'Tawne', password: '123', department: 'sporting goods'},
        {username: 'Katie', password: '123', department: 'sporting goods'},
        {username: 'John', password: '123', department: 'sporting goods'},
        {username: 'Becky', password: '123', department: 'sporting goods'}
    ])
};
