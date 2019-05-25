var amapFile = require('../../libs/amap-wx.js');
var config = require('../../libs/config.js');
var start;
var end;
var slon;
var slat;
var elon;
var elat;
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
    transits: [],
    polyline: []
  },
  onLoad: function(e) {
    start = e.start;
    end = e.end;
    slon = e.slon;
    slat = e.slat;
    elon = e.elon;
    elat = e.elat;
    var that = this;
    var key = config.Config.key;
    var myAmapFun = new amapFile.AMapWX({key: key});
    myAmapFun.getTransitRoute({
      origin: e.start,
      destination: e.end,
      city: e.city,
      success: function(data){
        if(data && data.transits){
          var transits = data.transits;
          for(var i = 0; i < transits.length; i++){
            var segments = transits[i].segments;
            transits[i].transport = [];
            for(var j = 0; j < segments.length; j++){
              if(segments[j].bus && segments[j].bus.buslines && segments[j].bus.buslines[0] && segments[j].bus.buslines[0].name){
                var name = segments[j].bus.buslines[0].name
                if(j!==0){
                  name = '--' + name;
                }
                transits[i].transport.push(name);
              }
            }
          }
        }
        that.setData({
          transits: transits
        });
          
      },
      fail: function(info){
        wx.showToast({
          title: '暂无路线！',
          image: '/images/live.png',
          duration: 2000
        })
      }
    })
  },
  goToCar: function (e) {
    wx.redirectTo({
      url: '../navigation_car/navigation?start=' + start + '&end=' + end + '&slon=' + slon + '&slat=' + slat + '&elon=' + elon + '&elat=' + elat
    })
  },
  goToBus: function (e) {
    wx.redirectTo({
      url: '../navigation_bus/navigation?start=' + start + '&end=' + end + '&slon=' + slon + '&slat=' + slat + '&elon=' + elon + '&elat=' + elat
    })
  },
  goToRide: function (e) {
    wx.redirectTo({
      url: '../navigation_ride/navigation?start=' + start + '&end=' + end + '&slon=' + slon + '&slat=' + slat + '&elon=' + elon + '&elat=' + elat
    })
  },
  goToWalk: function (e) {
    wx.redirectTo({
      url: '../navigation_walk/navigation?start=' + start + '&end=' + end + '&slon=' + slon + '&slat=' + slat + '&elon=' + elon + '&elat=' + elat
    })
  }
})