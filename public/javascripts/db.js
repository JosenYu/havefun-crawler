const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://localhost:27017/have-fun",
  {
    useNewUrlParser: true
  },
  err => {
    if (err) {
      console.error("mongoDB connect Fail");
    } else {
      console.log("mongoDB connect Success");
    }
  }
);

// 创建 Schema 对象
const Schema = mongoose.Schema;
/**
 * todo: bilbil table
 * @param {Date} createdAt 创建时间
 * @param {Date} updatedAt 更新时间
 * @param {String} url 跳转路径

 * @param {String} title 标题
 * @param {String} imgSrc 图片路径
 * @param {String} viewCount 浏览量
 * @param {String} commentCount 评论量
 * @param {String} author 作者
 */
let bilbilSchema = new Schema(
  {
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    },
    url: {
      type: String,
      default: "https://m.bilibili.com/index.html"
    },
    title: String,
    imgSrc: String,
    viewCount: String,
    commentCount: String,
    author: String
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }
  }
);
const bilbil = mongoose.model("bilbil", bilbilSchema);

/**
 * todo: acfun table
 * @param {Date} createdAt 创建时间
 * @param {Date} updatedAt 更新时间
 * @param {String} url 跳转路径
 *
 * @param {String} title 标题
 * @param {String} imgSrc 图片路径
 * @param {String} content 类容
 * @param {String} viewCount 浏览量
 * @param {String} commentCount 评论量
 * @param {String} author 作者
 */
let acfunSchema = new Schema(
  {
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    },
    url: {
      type: String,
      default: "https://m.acfun.cn"
    },
    title: String,
    imgSrc: String,
    viewCount: String,
    commentCount: String,
    author: String,
    content: String
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }
  }
);
const acfun = mongoose.model("acfun", acfunSchema);
module.exports = { bilbil, acfun };
