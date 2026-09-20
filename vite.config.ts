import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import CONFIG from './gitprofile.config.ts';
import { createHtmlPlugin } from 'vite-plugin-html';
import type { IncomingMessage, ServerResponse } from 'node:http';
import {
  cpSync,
  createReadStream,
  existsSync,
  mkdirSync,
  statSync,
} from 'node:fs';
import { resolve } from 'node:path';

const contentSource = resolve('content');
const contentTarget = resolve('dist/content');

type NextMiddleware = (error?: Error) => void;
type ContentMiddleware = (
  request: IncomingMessage,
  response: ServerResponse,
  next: NextMiddleware,
) => void;
type DevServer = {
  middlewares: {
    use: (path: string, middleware: ContentMiddleware) => void;
  };
};

const contentAssetsPlugin = () => ({
  name: 'copy-content-assets',
  configureServer(server: DevServer) {
    server.middlewares.use('/content', (request, response, next) => {
      const fileName = decodeURIComponent(
        request.url?.replace(/^\//, '') || '',
      );
      const filePath = resolve(contentSource, fileName);

      if (
        !fileName ||
        !filePath.startsWith(`${contentSource}/`) ||
        !existsSync(filePath)
      ) {
        next();
        return;
      }

      if (!statSync(filePath).isFile()) {
        next();
        return;
      }

      const contentType = filePath.endsWith('.pdf')
        ? 'application/pdf'
        : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      response.setHeader('Content-Type', contentType);
      createReadStream(filePath).pipe(response);
    });
  },
  closeBundle() {
    if (existsSync(contentSource)) {
      mkdirSync(contentTarget, { recursive: true });
      cpSync(contentSource, contentTarget, { recursive: true });
    }
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  base: CONFIG.base || '/',
  server: {
    allowedHosts: ['.loca.lt', '.trycloudflare.com'],
  },
  plugins: [
    react(),
    contentAssetsPlugin(),
    createHtmlPlugin({
      inject: {
        data: {
          metaTitle: CONFIG.seo.title,
          metaDescription: CONFIG.seo.description,
          metaImageURL: CONFIG.seo.imageURL,
          googleAnalyticsScript: CONFIG.googleAnalytics.id
            ? `<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${CONFIG.googleAnalytics.id}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${CONFIG.googleAnalytics.id}');
</script>`
            : '',
        },
      },
    }),
    ...(CONFIG.enablePWA
      ? [
          VitePWA({
            registerType: 'autoUpdate',
            workbox: {
              navigateFallback: undefined,
            },
            includeAssets: ['logo.png'],
            manifest: {
              name: 'Portfolio',
              short_name: 'Portfolio',
              description: 'Personal Portfolio',
              icons: [
                {
                  src: 'logo.png',
                  sizes: '64x64 32x32 24x24 16x16 192x192 512x512',
                  type: 'image/png',
                },
              ],
            },
          }),
        ]
      : []),
  ],
  define: {
    CONFIG: CONFIG,
  },
});
