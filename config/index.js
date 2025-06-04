const config = {
    mongo: {
        dbUrl: process.env.MONGO_URL
    },
    jwt: {
        secret : process.env.JWT_SECRET
    },
    client: {
        url: process.env.CLIENT_URL
    },
    node: {
        env: process.env.NODE_ENV
    }
}
module.exports = config;