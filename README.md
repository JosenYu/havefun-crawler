# havefun-crawler 爬虫项目

## superagent+cheerio 实现 bilbil 爬虫基本代码

```js
superagent
  .get(
    "https://www.bilibili.com/ranking?spm_id_from=333.334.b_62616e6e65725f6c696e6b.1"
  )
  .charset("utf-8")
  .end((err, res) => {
    if (err) {
      console.error("bilbil,爬取失败");
    }
    //用 cheerio 解析页面数据,获取到原页面
    const $ = cheerio.load(res.text);
    $("body").html();
  });
```

[node crawler](https://juejin.im/post/5b729759e51d4566295cefac)

```bush
npm install superagent
npm install superagent-charset
npm install cheerio
```

```js
var superagent = require("superagent");
var charset = require("superagent-charset");
// 防止请求乱码
charset(superagent);
const cheerio = require("cheerio");
```

superagent 是用来发起请求的，是一个轻量的,渐进式的 ajax api,可读性好,学习曲线低,内部依赖 nodejs 原生的请求 api,适用于 nodejs 环境下.，也可以使用 http 发起请求

superagent-charset 防止爬取下来的数据乱码，更改字符格式

cheerio 为服务器特别定制的，快速、灵活、实施的 jQuery 核心实现.。 安装完依赖就可以引入了

## superagent 使用

[简书](https://www.jianshu.com/p/1432e0f29abd)，[官网](http://visionmedia.github.io/superagent)

```js
// 基本使用get请求
superagent
  .get(url)
  .charset("utf-8")
  .end((err, res) => {});
```

## cheerio

[官方文档](https://cheerio.js.org)，[cheerio 中文文档](https://www.jianshu.com/p/629a81b4e013)

```js
var cheerio = require("cheerio");
var $ = cheerio.load('<h2 class = "title">Hello world</h2>');
$.html();
//=> <h2 class = "title welcome">Hello there!</h2>
```

## 请求第三方接口 acfun

[nodejs 中文官网](http://nodejs.cn/api/http.html#http_http_get_options_callback)

```js
// 基本代码
function start() {
  https.get(
    "https://api.bilibili.com/x/web-interface/ranking?rid=0&day=3&jsonp=jsonp",
    res => {
      res.setEncoding("utf8");
      res.on("data", chunk => {});
      res.on("end", () => {});
      res.on("error", e => {});
    }
  );
}
```

## 介绍 es6 class

[class 阮一峰](http://es6.ruanyifeng.com/#docs/class)

```js
// 传统es5
function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function() {
  return `( ${this.x} , ${this.y} )`;
};
var p = new Point(1, 2);
p.toString();
//"(1,2)"
```

```js
class Bar {
  doStuff() {
    console.log("stuff");
  }
}

var b = new Bar();
b.doStuff(); // "stuff"
```

```js
class Point {
  constructor() {
    // ...
  }

  toString() {
    // ...
  }

  toValue() {
    // ...
  }
}
// 等同于
Point.prototype = {
  constructor() {},
  toString() {},
  toValue() {}
};
```

## Mongoose

### 最常接触到的有三个概念 Schema、Model、Entity。按自己理解

Schema 是定义数据库的结构。类似创建表时的数据定义，但比创建数据库可以做更多的定义，只是没办法通过 Schema 对数据库进行更改。
Model 是将 Schema 定义的结构赋予表名。但可用此名对数据库进行增删查改。
Entity 是将 Model 与具体的数据绑定，可以对具体数据自身进行操作，例如保存数据。

### Schemas 中定义日期以及 timestamps 选项的妙用

[timestamps](https://cn.mongoosedoc.top/docs/guide.html#timestamps)

那如何才能在 schema 定义中让 MongoDB 自动生成和管理 createTime 和 updateTime 字段的值呢？答案是使用 timestamps 选项。有关 timestamps 选项的作用可以看官方文档的解释

我们将上述 Schema 的定义修改如下：

```js
var ItemSchema = new mongoose.Schema(
  {
    createTime: {
      type: Date,
      default: Date.now
    },
    updateTime: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: { createdAt: "createTime", updatedAt: "updateTime" }
  }
);
```
