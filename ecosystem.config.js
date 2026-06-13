// PM2 process definition for mohameddesign.com.
// Runs the Next.js production server on port 3010 (Nginx reverse-proxies to it).
// Usage: pm2 start ecosystem.config.js
module.exports = {
  apps: [
    {
      name: "mohameddesign",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3010",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
        PORT: 3010,
      },
    },
  ],
};
