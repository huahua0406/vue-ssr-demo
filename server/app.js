/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Koa = require("koa");
const Router = require("koa-router");
const koaMount = require("koa-mount");
const koaStatic = require("koa-static");
const path = require("path");
const fs = require("fs");
const resolve = dir => path.resolve(__dirname, dir);
//实例化
const app = new Koa();
const router = new Router();

const { createBundleRenderer } = require("vue-server-renderer");

const template = fs.readFileSync(resolve("../public/index.ssr.html"), "utf8");
const serverBundle = require("../dist/server/vue-ssr-server-bundle.json");
const clientManifest = require("../dist/client/vue-ssr-client-manifest.json");

const renderer = createBundleRenderer(serverBundle, {
  // 可选
  runInNewContext: false,
  template,
  clientManifest // 注入前端打包好的 js 文件
});

router.get("/(.*)", async ctx => {
  try {
    //根据当前请求路径渲染对应的路由组件
    const context = { url: ctx.url };
    // render.renderToString() 中的参数会被传递到 server-entry.js 文件中
    const html = await renderer.renderToString(context);
    console.log(html);
    ctx.body = html;
  } catch (error) {
    console.log(error);
    if (error.code == 404) {
      ctx.body = "page not found";
    }
  }
});

app.use(koaStatic(resolve("../dist/client"))); // 静态服务需要放到路由前面
/*启动路由*/
/*
 * router.allowedMethods()作用： 这是官方文档的推荐用法,我们可以
 * 看到 router.allowedMethods()用在了路由匹配 router.routes()之后,所以在当所有
 * 路由中间件最后调用.此时根据 ctx.status 设置 response 响应头
 *
 */
app.use(router.routes());
app.use(router.allowedMethods());

// 监听端口≈3000
app.listen(3000);
console.log("listening on port 3000");
