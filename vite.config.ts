import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require("path")
const os = require("os")

//获取当前的Ip4
let ip:string = "localhost";
const networkInterfaces = os.networkInterfaces()
if(networkInterfaces.WLAN){
    for (const item of networkInterfaces.WLAN) {
        if (item.family === 'IPv4') {
            console.log(item.address)
            ip=item.address
            break
        }
    }
}

// https://vitejs.dev/config/
export default defineConfig({

  plugins: [vue()],
  resolve:{
    alias:{
      "@":path.resolve(__dirname,"src"),
    }
  },
  server: {
    //可以在真机上调试
    host:ip,
    hmr:true,
    port: 30,
    proxy: {
      '/api':
      {
        target: "https://c.m.163.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/localhost':{
        target:ip?"http://"+ip:"http://localhost",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/localhost/, '')
      }
    },
    
  }
})
