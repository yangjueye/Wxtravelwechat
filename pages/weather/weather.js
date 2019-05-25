var bmap = require('../../resources/map/bmap-wx.js');
Page({

  data: {
    weatherData: '',
    currentCity: '',
    date: '',
    pm25: '',
    temperature: '',
    weatherDesc: '',
    wind: '',
    clothes: '',
    tomorrow: '',
    day_after_tomorrow: '',
    in_3_days: '',
dayurl:'',
nighturl:''

  },
  onLoad: function () {
    var that = this;
    var BMap = new bmap.BMapWX({
      ak: 'So7kKaiGna3Bjf1zGThj0u3qPjY3SUOW'
    });
    var fail = function (data) {
      console.log('fail!!!!')
    };
    var success = function (data) {
      var weatherData = data.currentWeather[0];
      var forecast = new Array(3);
      for (var i = 0; i < 3; i++) {
        forecast[i] = data.originalData.results[0].weather_data[i + 1];
      //  console.log(forecast[i])
      }
      var str = weatherData.date.split(")");
      var str0 = str[0].split("(");
      var date = str0[0];
      var temperature = str0[1];
   //   console.log(str0)
      that.setData({
        weatherData: weatherData,
        currentCity: data.currentWeather[0].currentCity,
        date: data.currentWeather[0].date,
        temperature: data.currentWeather[0].temperature,
        weatherDesc: data.currentWeather[0].weatherDesc,
        pm25: 'PM2.5: ' + data.currentWeather[0].pm25,
        wind: '风力：' + data.currentWeather[0].wind,
        clothes: '穿衣指数：' + data.originalData.results[0].index[0].zs,
        car: '洗车指数：' + data.originalData.results[0].index[1].zs,
        cold: '感冒指数：' + data.originalData.results[0].index[2].zs,
        exercise: '运动指数：' + data.originalData.results[0].index[3].zs,
        light: '紫外线强度：' + data.originalData.results[0].index[4].zs,
        dayurl: data.originalData.results[0].weather_data[0].dayPictureUrl,
        nighturl: data.originalData.results[0].weather_data[0].nightPictureUrl,
        tomorrow: data.originalData.results[0].weather_data[1].date + ': ' + data.originalData.results[0].weather_data[1].temperature+',' + '\n' + data.originalData.results[0].weather_data[1].weather+', ' + data.originalData.results[0].weather_data[1].wind,
        day_after_tomorrow: data.originalData.results[0].weather_data[2].date + ': ' + data.originalData.results[0].weather_data[2].temperature+',' + '\n' + data.originalData.results[0].weather_data[2].weather+', ' + data.originalData.results[0].weather_data[2].wind,
        in_3_days: data.originalData.results[0].weather_data[3].date+': ' + data.originalData.results[0].weather_data[3].temperature+', ' + '\n' + data.originalData.results[0].weather_data[2].weather+', ' + data.originalData.results[0].weather_data[2].wind,
      });
    }
    BMap.weather({
      fail: fail,
      success: success
    });
  },
   //刷新返回数据
  onPullDownRefresh: function () {
    // 动态设置导航条标题
    wx.setNavigationBarTitle({
      title: '获取数据.......'
    });
    wx.showNavigationBarLoading();
    var that = this;
    var BMap = new bmap.BMapWX({
      ak: 'So7kKaiGna3Bjf1zGThj0u3qPjY3SUOW'
    });
    var fail = function (data) {
      console.log('fail!!!!')
    };
    var success = function (data) {
      var weatherData = data.currentWeather[0];
      var forecast = new Array(3);
      for (var i = 0; i < 3; i++) {
        forecast[i] = data.originalData.results[0].weather_data[i + 1];
     //   console.log(forecast[i])
      }
      var str = weatherData.date.split(")");
      var str0 = str[0].split("(");
      var date = str0[0];
      var temperature = str0[1];
    //  console.log(str0)
      that.setData({
        weatherData: weatherData,
        currentCity: data.currentWeather[0].currentCity,
        date: data.currentWeather[0].date,
        temperature: data.currentWeather[0].temperature,
        weatherDesc: data.currentWeather[0].weatherDesc,
        pm25: 'PM2.5: ' + data.currentWeather[0].pm25,
        wind: '风力：' + data.currentWeather[0].wind,
        clothes: '穿衣指数：' + data.originalData.results[0].index[0].zs,
        car: '洗车指数：' + data.originalData.results[0].index[1].zs,
        cold: '感冒指数：' + data.originalData.results[0].index[2].zs,
        exercise: '运动指数：' + data.originalData.results[0].index[3].zs,
        light: '紫外线强度：' + data.originalData.results[0].index[4].zs,
        dayurl: data.originalData.results[0].weather_data[0].dayPictureUrl,
        nighturl: data.originalData.results[0].weather_data[0].nightPictureUrl,
        tomorrow: data.originalData.results[0].weather_data[1].date + ': ' + data.originalData.results[0].weather_data[1].temperature + ',' + '\n' + data.originalData.results[0].weather_data[1].weather + ', ' + data.originalData.results[0].weather_data[1].wind,
        day_after_tomorrow: data.originalData.results[0].weather_data[2].date + ': ' + data.originalData.results[0].weather_data[2].temperature + ',' + '\n' + data.originalData.results[0].weather_data[2].weather + ', ' + data.originalData.results[0].weather_data[2].wind,
        in_3_days: data.originalData.results[0].weather_data[3].date + ': ' + data.originalData.results[0].weather_data[3].temperature + ', ' + '\n' + data.originalData.results[0].weather_data[2].weather + ', ' + data.originalData.results[0].weather_data[2].wind,
      });
    }
    BMap.weather({
      fail: fail,
      success: success
    });
   
    wx.hideNavigationBarLoading();                   //完成停止加载
    // 动态设置导航条标题
    wx.setNavigationBarTitle({
      title: '天气预报'
    });
    wx.stopPullDownRefresh();                       //停止下拉刷新
  }
})