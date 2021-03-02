

module.exports = {
    port: process.env.PORT || 3000,
    sendgrid_api_key: process.env.SENDGRID_API_KEY,
    mongodb_url: process.env.MONGODB_URL,
    jwt_secret: process.env.JWT_SECRET
}