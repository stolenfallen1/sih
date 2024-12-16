// ecosystem.config.js
module.exports = {
    apps: [{
        name: "HIS",
        script: "./.output/server/index.mjs",
        env_production: {
            NUXT_API_SECRET: "1234",
            NUXT_NODE_API_BASE: "http://localhost:3001/api",
            NUXT_LARAVEL_API_BASE: "http://10.4.15.12:8000/api"
        }
    }]
}