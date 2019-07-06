const https = require("https");
const db = require("./db");
var superagent = require("superagent");
var charset = require("superagent-charset");
// 防止请求乱码
charset(superagent);
const cheerio = require("cheerio");

function start() {
  // 请求 bilbil 接口
  https.get(
    "https://api.bilibili.com/x/web-interface/ranking?rid=0&day=3&jsonp=jsonp",
    res => {
      res.setEncoding("utf8");
      // bilbil 数据
      let jsonBilBil = "";
      res.on("data", chunk => {
        jsonBilBil += chunk;
      });
      res.on("end", () => {
        let bilbil = JSON.parse(jsonBilBil);
        bilbil.data.list.map((value, index) => {
          db.bilbil.findOne({ title: value.title }, (err, doc) => {
            if (err) {
              console.error("bilbil findOne title error", err);
              throw err;
            } else {
              if (doc) {
                console.log(`已存在数据title：${doc}`);
              } else {
                console.log(`存入title数据：${value.title}`, value);
                let bilbilDB = new db.bilbil({
                  title: value.title,
                  imgSrc: value.pic,
                  viewCount: value.play,
                  commentCount: value.video_review,
                  author: value.author
                });
                bilbilDB.save((err, doc) => {
                  if (err) {
                    console.error("bilbil save error", err);
                    throw err;
                  } else {
                    console.log("bilbil saveDB success", doc);
                  }
                });
              }
            }
          });
        });
      });
      res.on("error", e => {
        console.error("bilbil 接口请求错误", e);
      });
    }
  );
  // 爬取 bilbil 网页
  superagent
    .get(
      "https://www.bilibili.com/ranking?spm_id_from=333.334.b_62616e6e65725f6c696e6b.1"
    )
    .charset("utf-8")
    .end((err, res) => {
      if (err) {
        console.error("bilbil,爬取失败");
      } else {
        //用 cheerio 解析页面数据,获取到原页面
        const $ = cheerio.load(res.text);
        // 爬取url路径 方便跳转
        $("ul.rank-list .rank-item .content div.info a.title").map(
          (index, element) => {
            let url = $(element).attr("href");
            let title = $(element).text();
            // 对比 title
            db.bilbil.findOne({ title: title }, (err, doc) => {
              if (err) {
                console.error(`查询失败title：${title}`, err);
                throw err
              } else {
                if (doc) {
                  db.bilbil.updateOne(
                    {
                      title: title,
                      url: "https://m.bilibili.com/index.html"
                    },
                    { url: url },
                    (err, raw) => {
                      if (err) {
                        console.error(`${title}数据更新失败`, err);
                      } else {
                        console.log(`成功更新title${title}`, raw);
                      }
                    }
                  );
                } else {
                  console.error("未添加这条title数据：", title);
                }
              }
            });
          }
        );
      }
    });
}

module.exports.start = start;
