# Deployment — mohameddesign.com

Next.js (App Router) app served by Node via **PM2 on port 3010**, fronted by **Nginx** with **Certbot** SSL on a Linux VPS (Ubuntu/Debian assumed).

Placeholders to replace with your real values:

| Placeholder | Example |
|-------------|---------|
| `<GITHUB_USER>` | your GitHub username/org |
| `<DOMAIN>` | `mohameddesign.com` |
| `<APP_DIR>` | `/opt/stacks/mohameddesign` |
| `<DEPLOY_USER>` | the non-root sudo user on the VPS |

App port is fixed at **3010** (see `ecosystem.config.js`).

---

## 1. Local development

```bash
npm install
npm run dev        # http://localhost:3000
```

## 2. Production build (local sanity check)

```bash
npm run build
npm run start      # serves the production build on :3000 locally
```

A clean `npm run build` must pass before pushing.

---

## 3. Push to GitHub (run locally, from the project root)

First time only:

```bash
git init
git add .
git commit -m "Initial commit — mohameddesign.com homepage MVP"
git branch -M main
git remote add origin https://github.com/<GITHUB_USER>/mohameddesign.git
git push -u origin main
```

Subsequent updates:

```bash
git add .
git commit -m "Describe the change"
git push
```

---

## 4. First-time VPS deployment

SSH in as `<DEPLOY_USER>` (a sudo user, not root).

### 4.1 Install system dependencies

```bash
sudo apt update
sudo apt install -y git nginx

# Node.js 20 LTS (NodeSource)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# PM2 process manager
sudo npm install -g pm2
```

### 4.2 Clone and build

```bash
sudo mkdir -p /opt/stacks
sudo chown -R $USER:$USER /opt/stacks
cd /opt/stacks
git clone https://github.com/<GITHUB_USER>/mohameddesign.git
cd /opt/stacks/mohameddesign      # = <APP_DIR>

npm ci
npm run build
```

### 4.3 Start with PM2 (port 3010)

```bash
pm2 start ecosystem.config.js
pm2 save                       # persist the process list
pm2 startup                    # prints a command — run it to enable boot start
```

Verify it is up:

```bash
pm2 status
curl -I http://127.0.0.1:3010  # expect HTTP/1.1 200 OK
```

### 4.4 Nginx reverse proxy

Create `/etc/nginx/sites-available/mohameddesign`:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name <DOMAIN> www.<DOMAIN>;

    location / {
        proxy_pass http://127.0.0.1:3010;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable it and reload:

```bash
sudo ln -s /etc/nginx/sites-available/mohameddesign /etc/nginx/sites-enabled/
sudo nginx -t                  # test config
sudo systemctl reload nginx
```

Point the domain's DNS A record at the VPS IP before the next step.

### 4.5 SSL with Certbot

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d <DOMAIN> -d www.<DOMAIN>
```

Certbot edits the Nginx config to add the 443 server block and an HTTP→HTTPS redirect, then installs a renewal timer. Confirm auto-renewal:

```bash
sudo certbot renew --dry-run
```

---

## 5. Redeploys

A redeploy script is included: [`deploy.sh`](./deploy.sh). From `<APP_DIR>` on the VPS:

```bash
bash deploy.sh
```

It pulls `origin/main`, runs `npm ci`, rebuilds, and reloads PM2 on port 3010. Make it directly executable once if you prefer `./deploy.sh`:

```bash
chmod +x deploy.sh
./deploy.sh
```

---

## 6. Operations cheatsheet

```bash
pm2 status                     # process state
pm2 logs mohameddesign         # tail logs
pm2 reload mohameddesign       # zero-downtime reload
pm2 restart mohameddesign      # hard restart
sudo tail -f /var/log/nginx/error.log
```

To change the port, edit `ecosystem.config.js` (`args` and `PORT`) and the Nginx `proxy_pass`, then `pm2 reload ecosystem.config.js --update-env` and `sudo systemctl reload nginx`.
