import jsonServer from 'vite-plugin-simple-json-server';

export default {
  // ...
  plugins: [jsonServer({
    delay: 2000,
  })],
};