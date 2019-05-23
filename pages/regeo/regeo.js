var amapFile = require('../../resources/map/amap-wx.js');
var config = require('../../resources/map/config.js');
var QQMapWX = require('../../resources/map/qqmap-wx-jssdk.js');
var qqmapsdk = new QQMapWX({
  key: 'TMTBZ-PKE35-YILI3-QA3BP-AXV6V-LYBU7' // 必填
});
Page({
  data: {
    markers: [],
    latitude: '',
    longitude: '',
    textData: {},
    city:''
  },
  
  onLoad: function(e) {
    var that = this;
    var key = config.Config.key;
    var myAmapFun = new amapFile.AMapWX({key: key});
    myAmapFun.getRegeo({
      iconPath: "../../images/marker.png",
      iconWidth: 22,
      iconHeight: 32,
      success: function(data){
      //  console.log(data[0].regeocodeData.addressComponent.city)
        var marker = [{
          id: data[0].id,
          latitude: data[0].latitude,
          longitude: data[0].longitude,
          iconPath: data[0].iconPath,
          width: data[0].width,
          height: data[0].height
        }]
        that.setData({
          markers: marker
        });
        that.setData({
          latitude: data[0].latitude
        });
        that.setData({
          city: data[0].regeocodeData.addressComponent.city
        });
        that.setData({
          longitude: data[0].longitude
        });
        that.setData({
          textData: {
            name: data[0].name,
            desc: data[0].desc
          }
        })
      },
      fail: function(info){
        // wx.showModal({title:info.errMsg})
      }
    })
  },
  bindInput: function (e) {
    var that = this;
    var url = '../inputtips/input';
    if (e.target.dataset.latitude && e.target.dataset.longitude && e.target.dataset.city) {
      var dataset = e.target.dataset;
      url = url + '?lonlat=' + dataset.longitude + ',' + dataset.latitude + '&city=' + dataset.city;
      console.log(url)
    }
    wx.redirectTo({
      url: url
    })
  }
})