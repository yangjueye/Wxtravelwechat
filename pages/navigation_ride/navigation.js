var amapFile = require('../../libs/amap-wx.js');
var config = require('../../libs/config.js');
var start;
var end;
var slon;
var slat;
var elon;
var elat;
var city;
Page({
  data: {
    latitude: '',
    longitude: '',
    markers: [{
      iconPath: "../../img/mapicon_navi_s.png",
      id: 0,
      latitude: '',
      longitude: '',
      width: 23,
      height: 33
    }, {
      iconPath: "../../img/mapicon_navi_e.png",
      id: 0,
      latitude: '',
      longitude: '',
      width: 24,
      height: 34
    }],
    distance: '',
    cost: '',
    polyline: []
  },
  onLoad: function(e) {
    start = e.start;
    end = e.end;
    slon = e.slon;
    slat = e.slat;
    elon = e.elon;
    elat = e.elat;
    city=e.city;
    var that = this;
    var key = config.Config.key;
    var myAmapFun = new amapFile.AMapWX({key: key});
    myAmapFun.getRidingRoute({
      origin: e.start,
      destination: e.end,
      success: function(data){
        console.log('骑行成功' + data)
        var points = [];
        if(data.paths && data.paths[0] && data.paths[0].steps){
          var steps = data.paths[0].steps;
          for(var i = 0; i < steps.length; i++){
            var poLen = steps[i].polyline.split(';');
            for(var j = 0;j < poLen.length; j++){
              points.push({
                longitude: parseFloat(poLen[j].split(',')[0]),
                latitude: parseFloat(poLen[j].split(',')[1])
              })
            } 
          }
        }
        that.setData({
          latitude: e.elat,
          longitude: e.elon,
          polyline: [{
            points: points,
            color: "#0091ff",
            width: 6
          }],
          markers: [{
            iconPath: "../../img/mapicon_navi_s.png",
            id: 0,
            latitude: e.slat,
            longitude: e.slon,
            width: 23,
            height: 33
          }, {
            iconPath: "../../img/mapicon_navi_e.png",
            id: 0,
            latitude: e.elat,
            longitude: e.elon,
            width: 24,
            height: 34
          }]
        });
        if(data.paths[0] && data.paths[0].distance){
          that.setData({
            distance: data.paths[0].distance + '米'
          });
        }
        if(data.taxi_cost){
          that.setData({
            cost: '打车约' + parseInt(data.taxi_cost) + '元'
          });
        }
          
      },
      fail: function(info){
        console.log('骑行失败' + info)
        wx.showToast({
          title: '暂无路线！',
          image: '/images/live.png',
          duration: 2000
        })
      }
    })
  },
  goDetail: function(){
    wx.navigateTo({
      url: '../navigation_ride_detail/navigation?start=' + start + '&end=' + end + '&slon=' + slon + '&slat=' + slat + '&elon=' + elon + '&elat=' + elat + '&city=' + city
    })
  },
  goToCar: function (e) {
    wx.redirectTo({
      url: '../navigation_car/navigation?start=' + start + '&end=' + end + '&slon=' + slon + '&slat=' + slat + '&elon=' + elon + '&elat=' + elat + '&city=' + city
    })
  },
  goToBus: function (e) {
    wx.redirectTo({
      url: '../navigation_bus/navigation?start=' + start + '&end=' + end + '&slon=' + slon + '&slat=' + slat + '&elon=' + elon + '&elat=' + elat + '&city=' + city
    })
  },
  goToRide: function (e) {
    wx.redirectTo({
      url: '../navigation_ride/navigation?start=' + start + '&end=' + end + '&slon=' + slon + '&slat=' + slat + '&elon=' + elon + '&elat=' + elat + '&city=' + city
    })
  },
  goToWalk: function (e) {
    wx.redirectTo({
      url: '../navigation_walk/navigation?start=' + start + '&end=' + end + '&slon=' + slon + '&slat=' + slat + '&elon=' + elon + '&elat=' + elat + '&city=' + city
    })
  }
})