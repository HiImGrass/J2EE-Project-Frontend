import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import svgr from 'vite-plugin-svgr';

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr({
      svgrOptions: {
        // Tự động thay thế mã màu cố định thành currentColor
        replaceAttrValues: {
          '#000': 'currentColor',
          '#000000': 'currentColor',
          // thêm các mã màu gốc trong SVG của bạn nếu cần
        },
        // Hoặc xóa hoàn toàn thuộc tính fill/stroke cứng trong SVG
        // icon: true, 
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})