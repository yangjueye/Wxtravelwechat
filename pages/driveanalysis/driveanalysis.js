// pages/carnum/carnum.js
const app = getApp()
var ip = app.globalData.ip
var openid = app.globalData.openid
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imagePath: '',
    ocrData: '',
    disabled: '',
    hidden:'true'
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
          ocrtype:'driveanalysis'
        },
        success: function (res) {
          if (JSON.parse(res.data).person_num == 0){
            wx.showToast({
              title: '未检测到驾驶员！',
              image: '/images/eye.png',
              duration: 1000
            }),
              that.setData({
                disabled: ''
              })
          }
          else{
          console.log(JSON.parse(res.data));
          that.setData({
            disabled: '',
            ocrData: '吸烟概率：' + JSON.parse(res.data).person_info[0].attributes.smoke.score + '\n\n' + '使用手机概率：' + JSON.parse(res.data).person_info[0].attributes.cellphone.score + '\n\n' + '未系安全带概率：' + JSON.parse(res.data).person_info[0].attributes.not_buckling_up.score + '\n\n' + '双手离开方向盘概率：' + JSON.parse(res.data).person_info[0].attributes.both_hands_leaving_wheel.score + '\n\n' + '视角未朝向前方：' + JSON.parse(res.data).person_info[0].attributes.not_facing_front.score,
            hidden:''
          })
          }
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
        content: '亲，请您先登录爵爷才能识别车牌号！',
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