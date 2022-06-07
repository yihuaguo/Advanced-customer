import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import PkgConfig from 'vite-plugin-package-config'
import OptimizationPersist from 'vite-plugin-optimize-persist'
import viteCompression from 'vite-plugin-compression'

const { resolve } = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      // hash
      output: {
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: '[ext]/[name]-[hash].[ext]',
        comments: true // 去掉注释
      }
    }
  },
  define: {
    __VUE_I18N_FULL_INSTALL__: true,
    __VUE_I18N_LEGACY_API__: false,
    __INTLIFY_PROD_DEVTOOLS__: false,
  },
  plugins: [
    vue(),
    Components({
      resolvers: [AntDesignVueResolver()],
    }),
    PkgConfig(),
    OptimizationPersist(),
    // 前端资源压缩打包，需要服务器支持
    // 如nginx配置gzip_static on;
    viteCompression({
      verbose: true,
      // 如果服务器已经做了压缩则可关闭
      disable: false,
      // 超过1b打包
      threshold: 1,
      algorithm: "gzip",
      ext: 'gz',
      // 删除未打包的资源，建议保留
      deleteOriginFile: false
    })
  ],
  server: {
    host: '0.0.0.0'
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, "src"),
      '@utils': resolve(__dirname, "src/utils"),
      '@assets': resolve(__dirname, "src/assets")
    }
  }
})
