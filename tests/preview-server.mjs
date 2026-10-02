// Dependency-free local server for browser verification of the production build.
import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
const root = resolve('dist');
const types = { '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp' };
http.createServer(async (req, res) => {
    const filename = resolve(root, `.${new URL(req.url, 'http://localhost').pathname}`);
    if (!filename.startsWith(`${root}${sep}`)) { res.writeHead(403); res.end(); return; }
    try {
        const body = await readFile(extname(filename) ? filename : resolve(root, 'index.html'));
        res.writeHead(200, { 'Content-Type': types[extname(filename)] || 'text/html' });
        res.end(body);
    } catch { res.writeHead(404); res.end(); }
}).listen(5181, '127.0.0.1', () => console.log('Production preview: http://127.0.0.1:5181'));
