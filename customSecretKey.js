
// Config env files

const customSecretKey = {
    node: {
        PORT: 5000
    },
    db: {
        // I know it's very very bad!!!
        host: 'dpg-chevnporddl9bukk7qb0-a.oregon-postgres.render.com',
        port: 5432,
        database: 'w_test',
        user: 'w_test_user',
        password: 'xnB3nJHQgWW5ZYIsbn6b3NpVsJJWsqso',
    },
    jwt: {
        TOKEN_KEY: 'exampleSecret'
    }
}

module.exports = customSecretKey