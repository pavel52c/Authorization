module.exports = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'development',
    entities: ['src/**/**.entity.ts'],
    synchronize: true,
    autoLoadEntities: true,
};
