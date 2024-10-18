const Koa =  require('koa');
const { router } =  require("./src/routes/index.js");

const app = new Koa();

// response
app.use(router.routes());

app.listen(3029);