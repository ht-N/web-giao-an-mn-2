```bash
npm install -g pm2
```

```bash
cd /root/web-giao-an-mn-2/backend-node
pm2 start server.js --name "backend-ai"
```

```bash
cd /root/web-giao-an-mn-2/frontend
npm run build
pm2 start npm --name "frontend-ai" -- start
```