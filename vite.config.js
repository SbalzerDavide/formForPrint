import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  publicPath: "",
  pages: {
    index:{
      entry: 'src/main.js',
      template: 'index.html'
    },
  },
  indexPath: 'index.html',
})
