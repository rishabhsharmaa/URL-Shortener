import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  //adding sever for configuration 
  server : {
    //proxy for api request
    proxy : {
      //any request which start with api should be provied to target
      '/api' : {
        //target express server
        target : 'http://localhost:5000',
        //it changes the origin header of the request to match with target url
        changeOrigin : true,
      },
    }
  }
})
