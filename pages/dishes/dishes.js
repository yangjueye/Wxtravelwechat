
const app = getApp()
var ip = app.globalData.ip
var openid = app.globalData.openid
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden:'true',
    imagePath: '',
    top1: '',
    top2: '',
    top3: '',
    top4: '',
    top5: '',
    img1: '',
    img2: '',
    img3: '',
    img4: '',
    img5: '',
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
          ocrtype: 'dishes'
        },
        success: function (res) {

          console.log(JSON.parse(res.data).result)


          that.setData({
            hidden:'',
            disabled: '',
            top1: '\n' + 'TOP1' + '\n' + '名称：' + JSON.parse(res.data).result[0].name + '\n' + '卡路里：' + JSON.parse(res.data).result[0].calorie+'/100g'+'\n'+ '描述：' + JSON.parse(res.data).result[0].baike_info.description + '\n',
            img1: JSON.parse(res.data).result[0].baike_info.image_url,
            top2: '\n' + 'TOP2' + '\n' + '名称：' + JSON.parse(res.data).result[1].name + '\n' + '卡路里：' + JSON.parse(res.data).result[1].calorie + '/100g' + '\n' + '描述：' + JSON.parse(res.data).result[1].baike_info.description + '\n',
            img2: JSON.parse(res.data).result[1].baike_info.image_url,
            top3: '\n' + 'TOP3' + '\n' + '名称：' + JSON.parse(res.data).result[2].name + '\n' + '卡路里：' + JSON.parse(res.data).result[2].calorie + '/100g' + '\n' + '描述：' + JSON.parse(res.data).result[2].baike_info.description + '\n',
            img3: JSON.parse(res.data).result[2].baike_info.image_url,
            top4: '\n' + 'TOP4' + '\n' + '名称：' + JSON.parse(res.data).result[3].name + '\n' + '卡路里：' + JSON.parse(res.data).result[3].calorie + '/100g' + '\n' + '描述：' + JSON.parse(res.data).result[3].baike_info.description + '\n',
            img4: JSON.parse(res.data).result[3].baike_info.image_url,
            top5: '\n' + 'TOP5' + '\n' + '名称：' + JSON.parse(res.data).result[4].name + '\n' + '卡路里：' + JSON.parse(res.data).result[4].calorie + '/100g' + '\n' + '描述：' + JSON.parse(res.data).result[4].baike_info.description + '\n',
            img5: JSON.parse(res.data).result[4].baike_info.image_url,
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
        content: '亲，请您先登录才能人体分析！',
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