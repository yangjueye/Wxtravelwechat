var util = require('../../utils/util.js')
var keyarray = ["fbe703ae2be848d8afb73df25040e8b8", "c8e974825d524d7781ea8ab01784dd13", "27bfd039f8944dae90eb52a76606bf42", "2d03b5a56cc14972a298d3478b1f2fea", "ffc948c2641545a1aaa23478a6aa5382"]
var i;
Page({
  //定义初始化数据  每当数据发生变化时，会自动触发页面循环
  data: {
    inputValue: '',
    returnValue: '',
    allContentList: [],
    num: 0
  },
  //绑定键盘按下事件，讲输入的值赋给data
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })

  },
  //点击发送按钮时触发事件，发送数据给图灵机器人
  submitTo: function (e) {
    let that = this;
    //将输入数据追加到列表里面
    that.setData({
      disabled: 'true'
    })
    that.data.allContentList.push({ "value": that.data.inputValue });
    //图灵接口
    let _url = `https://www.tuling123.com/openapi/api`;
    //系统封装的请求方法 ，注意这里没有ajajx的说法
    let tulingkey = wx.getStorageSync('tulingkey');
    console.log('tulingkey' + tulingkey)
    wx.request({
      url: _url,
      data: {
        key: tulingkey,
        info: that.data.inputValue
      },
      //封装返回数据格式
      header: {
        'Content-Type': 'application/json'
      },
      //请求成功的回调
      success: function (res) {
        let data = res.data;
        console.log(data)
        if (data.code === 100000) {   //100000 表示返回成功
          //将返回值追加到列表
          that.data.allContentList.push({ "value": data.text });
          //调用set方法，告诉系统数据已经改变   启动循环，循环聊天信息
          that.setData({
            returnValue: data.text,
            allContentList: that.data.allContentList,
            inputValue:'',
            inputTemp:''
          })

        } else {

        }

      }
    })

    //////

  },
  onLoad: function () {
    //y页面初始化时加载的原始数据
    // 设置标题
    wx.setNavigationBarTitle({
      title: '智能机器人',
      success: function () {
        // console.log("success")
      },
      fail: function () {
        // console.log("error")
      }
    });
    let _url = `https://www.tuling123.com/openapi/api`;
    var i;
    
    for (i = 0; i < 5; i++) {
      var j=i;
      wx.setStorageSync('j', j);
      wx.request({
        url: _url,
        data: {
          key: keyarray[i],
          info: '测试'
        },
        //封装返回数据格式
        header: {
          'Content-Type': 'application/json'
        },
      
        //请求成功的回调
        success: function (res) {
         
          let data = res.data;
         
          console.log(data)
          wx.setStorageSync('status', data.text) ;
          if (wx.getStorageSync('status') != '亲爱的，当天请求次数已用完。') {
            var m=wx.getStorageSync('j');
            wx.setStorageSync('tulingkey', keyarray[3])
            console.log(wx.getStorageSync('tulingkey') + 'm:' + m)
          }
        }
      })
     
    }
  }

})