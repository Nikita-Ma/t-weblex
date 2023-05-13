
// Config env files

export const customSecretKey = {
    node: {
        PORT: 5000
    },
    db: {
        // I know it's very very bad!!!
        host: 'dpg-chevnporddl9bukk7qb0-a.oregon-postgres.render.com', // Your DB HOST
        port: 5432, // Your DB PORT
        database: 'w_test', // Your database
        user: 'w_test_user', // Your user
        password: 'xnB3nJHQgWW5ZYIsbn6b3NpVsJJWsqso', // Your password
    },
    jwt: {
        TOKEN_KEY: 'exampleSecret' // Your secret token
    }
}

