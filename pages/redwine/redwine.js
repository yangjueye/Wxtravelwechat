// pages/carnum/carnum.js
const app = getApp()
var ip = app.globalData.ip
var openid = app.globalData.openid
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: 'true',
    imagePath: '',
    ocrData: '',
    disabled: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //获取位置
  Location() {
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
        console.log(res)
      }
    })
  },
  //拍照
  takePhoto() {
    var that = this;
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        that.setData({
          imagePath: res.tempImagePath
        })
      }
    })
  },
  error(e) {
    console.log(e.detail)
  },
  //选择照片
  choosePhoto() {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['album'],
      success(res) {
        that.setData({
          imagePath: res.tempFilePaths[0]
        })
      }
    })
  },
  //上传识别车牌号
  CarOcr() {
    if (app.globalData.userInfo) {
      var that = this;
      that.setData({
        disabled: 'true'
      }),
        console.log('openid:' + wx.getStorageSync('openid'));
      wx.uploadFile({
        url: ip + '/uploadcontroller',
        filePath: that.data.imagePath,//图片路径，如tempFilePaths[0]
        name: 'image',
        header: {
          "Content-Type": "multipart/form-data"
        },
        formData:
        {
          openid: wx.getStorageSync('openid'),
          ip: ip,
          ocrtype: 'redwine'
        },
        success: function (res) {
          console.log(JSON.parse(res.data));
          that.setData({
            disabled: '',
            ocrData: '\n' + '酒类型：' + JSON.parse(res.data).result.classifyByColor + '\n' + '子产区中文名：' + JSON.parse(res.data).result.subRegionCn + '\n' + '红酒中文名：' + JSON.parse(res.data).result.wineNameCn + '\n' + '子产区英文名：' + JSON.parse(res.data).result.subRegionEn + '\n' + '产区英文名：' + JSON.parse(res.data).result.regionEn + '\n' + '色泽：' + JSON.parse(res.data).result.color + '\n' + '红酒英文名：' + JSON.parse(res.data).result.wineNameEn + '\n' + '酒庄中文名：' + JSON.parse(res.data).result.wineryCn + '\n' + '糖分类型：' + JSON.parse(res.data).result.classifyBySugar + '\n' + '品尝温度：' + JSON.parse(res.data).result.tasteTemperature + '\n' + '产区中文名：' + JSON.parse(res.data).result.regionCn + '\n' + '酒庄英文名：' + JSON.parse(res.data).result.wineryEn + '\n' + '葡萄品种中文名：' + JSON.parse(res.data).result.grapeCn + '\n' + '葡萄品种英文名：' + JSON.parse(res.data).result.grapeEn + '\n' + '国家中文名：' + JSON.parse(res.data).result.countryCn + '\n' + +'' + '国家英文名：' + JSON.parse(res.data).result.countryEn + '\n' + '酒品描述：' + JSON.parse(res.data).result.description+'\n',
            hidden: ''
          })
        },
        fail: function (res) {
          console.log(res);
          that.setData({
            disabled: ''
          })
        },
        complete: function (res) {

        }
      })
    }
    else {
      wx.showModal({
        title: '温馨提示',
        content: '亲，请您先登录才能识别红酒！',
        success: function (res) {
          if (res.confirm) {//这里是点击了确定以后
            wx.switchTab({
              url: '../Mine/Mine'
            })

          } else {//这里是点击了取消以后
            that.setData({
              sms: ''
            })
          }
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})