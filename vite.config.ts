import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import * as fs from 'fs'
import { minifyHtml, injectHtml } from 'vite-plugin-html'

const scssCode = fs.readFileSync('./src/assets/styles/mixin.scss', 'utf-8')

// https://vitejs.dev/config/
export default ({ mode }) => {
  console.log('api-host: ', loadEnv(mode, process.cwd()).VITE_API_HOST)
  const releaseEnv = loadEnv(mode, process.cwd()).VITE_RELEASE_ENV;
  let publicPath = 'https://d3ti4t8wqqwbzo.cloudfront.net';
  console.log("mode");
  console.log(mode);
  
  if (releaseEnv === 'dev') {
    publicPath = 'https://d15n6dsjrkh0qb.cloudfront.net';
  } else if (releaseEnv === 'stag') {
    publicPath = 'https://d11wwy09rnlqxf.cloudfront.net';
  }

  return defineConfig({
    base:mode==='mydev'?`${publicPath}/`:`${publicPath}/obsPlugins/`,
    build: {
      target: 'modules',
      outDir: './obsPlugins/', //指定输出路径
      assetsDir: './static', // 指定生成静态资源的存放路径
      minify: 'terser' // 混淆器，terser构建后文件体积更小
    },
    plugins: [
      vue(),
      minifyHtml(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    server: {
      port: 3001,
      // https: true,
       host: '0.0.0.0',
      cors: true,
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: scssCode
        }
      }
    },
  })
}
