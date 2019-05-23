var util = require('../../utils/util.js')
const app = getApp()
var ip = app.globalData.ip
Page({
  data: {
    feed: [],
    currentNavtab: 0,
    topic: null,
    feed_length: 0
  },

  onLoad: function () {
    this.refresh();
  },
  onShow: function () {
    this.refresh();
  },

  searchInput: function (e) {
    this.setData({
      topic: e.detail.value
    })
  },
  search: function () {
    var that = this;
    console.log("..." + this.data.topic)
    wx.request({
      url: 'https://jueyevip.top/queswerServer/searchStories',
      data: {
        topic: this.data.topic
      },
      header: {//请求头
        "Content-Type": "applciation/json"
      },
      method: "GET",
      success: function (e) {
        that.setData({
          feed: e.data,
          feed_length: e.data.length
        });
        console.log(e);
      },
    })
  },

  refresh: function () {
    var that = this;
    wx.request({
      url: 'https://jueyevip.top/queswerServer/listStories',
      data: {},
      header: {//请求头
        "Content-Type": "applciation/json"
      },
      method: "GET",
      success: function (e) {
        that.setData({
          feed: e.data,
          feed_length: e.data.length
        });
        console.log(e);
      },
    })
  },
})
