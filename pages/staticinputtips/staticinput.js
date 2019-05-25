const app = getApp()
var ip = app.globalData.ip
var amapFile = require('../../resources/map/amap-wx.js');
var config = require('../../resources/map/config.js');
var lonlat;
var city;
var slon;
var slat;
var end;
var start;
Page({
  data: {
    tips: {}
  },
  onLoad: function (e) {
    lonlat = e.lonlat;
    city = e.city;
    slon = lonlat.split(",")[0];
    slat = lonlat.split(",")[1];
    start = e.lonlat;
  },
  bindInput: function (e) {
    var that = this;
    var keywords = e.detail.value;
    var key = config.Config.key;
    var myAmapFun = new amapFile.AMapWX({ key: key });
    myAmapFun.getInputtips({
      keywords: keywords,
      location: lonlat,
      city: city,
      success: function (data) {
        if (data && data.tips) {
          that.setData({
            tips: data.tips
          });
        }
      }
    })
  },
  bindSearch: function (e) {
    var QQMapWX = require('../../resources/map/qqmap-wx-jssdk.js');

    // 实例化API核心类
    var qqmapsdk = new QQMapWX({
      key: 'TMTBZ-PKE35-YILI3-QA3BP-AXV6V-LYBU7' // 必填
    });
    var keywords = e.target.dataset.keywords;
    console.log(keywords)

    qqmapsdk.geocoder({
      //获取表单传入地址

      address: keywords, //地址参数，例：固定地址，address: '北京市海淀区彩和坊路海淀西大街74号'
      success: function (res) {//成功后的回调
        console.log(res);
        var res = res.result;
        var elat = res.location.lat;
        var elon = res.location.lng;

        end = elon + ',' + elat;
        var url = '../staticmap/staticmap?start=' + start + '&end=' + end + '&slon=' + slon + '&slat=' + slat + '&elon=' + elon + '&elat=' + elat + '&city=' + city;
        console.log(url);
        wx.navigateTo({
          url: url
        })
      },
      fail: function (error) {
        wx.request({
          url: ip + '/latlon', //本地服务器地址
          data: {
            addressdata: city + keywords
          },
          header: {//请求头
            "Content-Type": "applciation/json"
          },
          method: "GET",
          success: function (res) {
            end = res.data.lng + "," + res.data.lat;
            var elat = res.data.lat;
            var elon = res.data.lng;
            var url = '../navigation_car/navigation?start=' + start + '&end=' + end + '&slon=' + slon + '&slat=' + slat + '&elon=' + elon + '&elat=' + elat + '&city=' + city;
            console.log(url);
            wx.navigateTo({
              url: url
            })
          }
        })
      }
    })

  }
})