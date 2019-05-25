// pages/carnum/carnum.js
const app = getApp()
var ip = app.globalData.ip
var openid = app.globalData.openid
var imageurl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imagePath: '',
    disabled: '',
    sd: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //获取位置
  save:function() {
    if (imageurl == null || imageurl == 'undefined' || imageurl == ''){
      wx.showToast({
        title: '请先提取！',
      })
    }
    else {
    var that =this;
      this.setData({
        sd: 'true'
      }),
     console.log(imageurl)
      wx.downloadFile({
        url: imageurl,     //仅为示例，并非真实的资源
        success: function (res) {
          // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
          
         
          if (res.statusCode === 200) {
            wx.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success(res) {
                var thats = that;
                thats.setData({
                  sd: ''
                }),
                wx.showToast({
                  title: '保存图片成功！',
                })
              
             
              },
              fail(res) {
                wx.showToast({
                  title: '保存图片失败！',
                })
              }
            })
          }
        }
      })
      }
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
      sizeType: ['compressed'],
      sourceType: ['album'],
      success(res) {
        that.setData({
          imagePath: res.tempFilePaths[0],
          disabled: 'true'
        })
        console.log(res.tempFilePaths[0].split("/")[3])
        wx.uploadFile({
          url: ip + '/ocrchoose',
          filePath: res.tempFilePaths[0],//图片路径，如tempFilePaths[0]
          ip: ip,
          name: 'image',
          header: {
            "Content-Type": "multipart/form-data"
          },
          formData:
          {
            openid: wx.getStorageSync('openid'),
            filename: res,
            ocrtype: 'portraitsegmentation',
            ip:ip
          },
          success: function (res) {
            console.log(res.data)
            imageurl = ip + '/ocrchooseimgs/' + res.data.split("/")[7];
            that.setData({
              disabled: '',
              imagePath: ip + '/ocrchooseimgs/' + res.data.split("/")[7],

            })
          },
          fail: function (res) {
            console.log(res);
            that.setData({
              disabled: ''
            })
          },
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
          ocrtype:'portraitsegmentation'

        },
        success: function (res) {
          console.log(res.data);
          imageurl=ip + '/ocrimages/' + res.data.split("/")[6];
          that.setData({
            disabled: '',
            imagePath: ip + '/ocrimages/' + res.data.split("/")[6],
            
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
        content: '亲，请您先登录才能人像分割！',
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