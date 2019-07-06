const http = require("https");
const db = require("./db");

function start() {
  let jsonAcfun = "";
  http.get(
    "https://www.acfun.cn/rest/pc-direct/rank/channel?channelId=&subChannelId=&rankLimit=30&rankPeriod=DAY",
    res => {
      res.setEncoding("utf8");
      /**
       * todo：请求成功后的返回
       * !如果返回的内容接受不完，该函数将会被再次调用，知道所有数据请求完
       */
      res.on("data", chunk => {
        jsonAcfun = jsonAcfun + chunk;
      });
      // todo:成功结束时
      res.on("end", () => {
        JSON.parse(jsonAcfun).rankList.map((value, index) => {
          // 查找是否有相同的数据，避免重复
          db.acfun.findOne({ title: value.contentTitle }, (err, doc) => {
            if (err) {
              console.error(`acfun 错误！查找数据title：${value.contentTitle}`);
              throw err;
            } else {
              if (doc) {
                console.log(`acfun 已存在数据title：${value.contentTitle}`);
              } else {
                let acfunDB = new db.acfun({
                  title: value.contentTitle,
                  imgSrc: value.videoCover,
                  viewCount: value.viewCount,
                  commentCount: value.commentCount,
                  author: value.userName,
                  content: value.contentDesc
                });
                acfunDB.save((err, docs) => {
                  if (err) {
                    console.error("acfun 报错失败", err);
                    throw err;
                  } else {
                    console.log("acfun 保存成功：" + docs);
                  }
                });
              }
            }
          });
        });
      });
      // 请求出错
      res.on("error", e => {
        console.error(`acfun 请求失败: ${e.message}`);
        throw err;
      });
    }
  );
}

module.exports.start = start;
