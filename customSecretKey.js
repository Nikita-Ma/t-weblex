
// Config env files

const customSecretKey = {
    node: {
        PORT: 5000
    },
    db: {
        host: 'localhost',
        port: 5432,
        database: 'postgres',
        user: 'postgres',
        password: '1234',
    },
    jwt: {
        TOKEN_KEY: 'exampleSecret'
    }
}

module.exports = customSecretKey