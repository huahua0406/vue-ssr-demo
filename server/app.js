/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Koa = require("koa");
const koaMount = require("koa-mount");
const koaStatic = require("koa-static");
const path = require("path");
const resolve = dir => path.resolve(__dirname, dir);
const app = new Koa();

app.use(koaMount("/dist", koaStatic(resolve("../dist"))));

app.get("*", (req, res) => {
  const context = { url: req.url };

});

// 监听端口≈3000
app.listen(3000);
console.log("listening on port 3000");
