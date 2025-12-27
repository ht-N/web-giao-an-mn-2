module.exports = {
    apps: [
        {
            name: 'frontend',
            cwd: './frontend',
            script: 'npm',
            args: 'run dev',
            env: {
                NODE_ENV: 'development',
                PORT: 3000
            },
            env_production: {
                NODE_ENV: 'production',
                PORT: 3000
            },
            watch: false,
            autorestart: true,
            max_restarts: 10,
            restart_delay: 1000
        },
        {
            name: 'backend-node',
            cwd: './backend-node',
            script: 'npm',
            args: 'start',
            env: {
                NODE_ENV: 'development',
                PORT: 4000
            },
            env_production: {
                NODE_ENV: 'production',
                PORT: 4000
            },
            watch: false,
            autorestart: true,
            max_restarts: 10,
            restart_delay: 1000
        },
        {
            name: 'chemlab-server',
            cwd: './MP 3 2/server',
            script: 'index.js',
            env: {
                NODE_ENV: 'development',
                PORT: 5175
            },
            env_production: {
                NODE_ENV: 'production',
                PORT: 5175
            },
            watch: false,
            autorestart: true,
            max_restarts: 10,
            restart_delay: 1000
        }
    ]
};
