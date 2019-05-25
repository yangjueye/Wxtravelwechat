
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
      sizeType: ['compressed'],
      sourceType: ['album'],
      success(res) {
        that.setData({
          imagePath: res.tempFiles[0].path,
          disabled: 'true'
        })
        wx.uploadFile({
          url: ip + '/ocrchoose',
          filePath: res.tempFiles[0].path,//图片路径，如tempFilePaths[0]
          name: 'image',
          header: {
            "Content-Type": "multipart/form-data"
          },
          formData:
          {
            openid: wx.getStorageSync('openid'),
            filename: res.tempFiles[0].path.split("/")[3],
            ocrtype: 'humananalysis'
          },
          success: function (res) {
            that.setData({
              disabled: '',
              ocrData: '性别：' + JSON.parse(res.data).person_info[0].attributes.gender.name + '\n' + '概率：' + JSON.parse(res.data).person_info[0].attributes.gender.score + '\n\n'
                + '年龄阶段：' + JSON.parse(res.data).person_info[0].attributes.age.name + '\n' + '概率：' + JSON.parse(res.data).person_info[0].attributes.age.score + '\n\n'
                + '上身服饰：' + JSON.parse(res.data).person_info[0].attributes.upper_wear.name + '\n' + '概率：' + JSON.parse(res.data).person_info[0].attributes.upper_wear.score + '\n\n'
                + '下身服饰：' + JSON.parse(res.data).person_info[0].attributes.lower_wear.name + '\n' + '概率：' + JSON.parse(res.data).person_info[0].attributes.lower_wear.score + '\n\n'
                + '上身服饰颜色：' + JSON.parse(res.data).person_info[0].attributes.upper_color.name + '\n' + '概率：' + JSON.parse(res.data).person_info[0].attributes.upper_color.score + '\n\n'
                + '下身服饰颜色：' + JSON.parse(res.data).person_info[0].attributes.lower_color.name + '\n' + '概率：' + JSON.parse(res.data).person_info[0].attributes.lower_color.score + '\n\n'
                + '上身服饰纹理：' + JSON.parse(res.data).person_info[0].attributes.upper_wear_texture.name + '\n' + '概率：' + JSON.parse(res.data).person_info[0].attributes.upper_wear_texture.score + '\n\n'
                + '背包：' + JSON.parse(res.data).person_info[0].attributes.bag.name + '\n' + '概率：' + JSON.parse(res.data).person_info[0].attributes.bag.score + '\n\n'
                + '上身服饰细分类：' + JSON.parse(res.data).person_info[0].attributes.upper_wear_fg.name + '\n' + '概率：' + JSON.parse(res.data).person_info[0].attributes.upper_wear_fg.score + '\n\n'
                + '是否戴帽子：' + JSON.parse(res.data).person_info[0].attributes.headwear.name + '\n' + '概率：' + JSON.parse(res.data).person_info[0].attributes.headwear.score + '\n\n'
                + '是否戴眼镜：' + JSON.parse(res.data).person_info[0].attributes.glasses.name + '\n' + '概率：' + JSON.parse(res.data).person_info[0].attributes.glasses.score + '\n\n'
                + '是否撑伞：' + JSON.parse(res.data).person_info[0].attributes.umbrella.name + '\n' + '概率：' + JSON.parse(res.data).person_info[0].attributes.umbrella.score + '\n\n'
                + '是否使用手机：' + JSON.parse(res.data).person_info[0].attributes.cellphone.name + '\n' + '概率：' + JSON.parse(res.data).person_info[0].attributes.cellphone.score + '\n\n'
                + '身体朝向：' + JSON.parse(res.data).person_info[0].attributes.orientation.name + '\n' + '概率：' + JSON.parse(res.data).person_info[0].attributes.orientation.score + '\n\n'
                + '是否吸烟：' + JSON.parse(res.data).person_info[0].attributes.smoke.name + '\n' + '概率：' + JSON.parse(res.data).person_info[0].attributes.smoke.score + '\n\n'
                + '是否有手提物：' + JSON.parse(res.data).person_info[0].attributes.carrying_item.name + '\n' + '概率：' + JSON.parse(res.data).person_info[0].attributes.carrying_item.score + '\n\n'
                + '交通工具：' + JSON.parse(res.data).person_info[0].attributes.vehicle.name + '\n' + '概率：' + JSON.parse(res.data).person_info[0].attributes.vehicle.score + '\n\n'
                + '上方截断：' + JSON.parse(res.data).person_info[0].attributes.upper_cut.name + '\n' + '概率：' + JSON.parse(res.data).person_info[0].attributes.upper_cut.score + '\n\n'
                + '下方截断：' + JSON.parse(res.data).person_info[0].attributes.lower_cut.name + '\n' + '概率：' + JSON.parse(res.data).person_info[0].attributes.lower_cut.score + '\n\n'
                + '遮挡：' + JSON.parse(res.data).person_info[0].attributes.occlusion.name + '\n' + '概率：' + JSON.parse(res.data).person_info[0].attributes.occlusion.score + '\n\n'
                + '是否是正常人体：' + JSON.parse(res.data).person_info[0].attributes.is_human.name + '\n' + '概率：' + JSON.parse(res.data).person_info[0].attributes.is_human.score + '\n\n',
              hidden: ''
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
          ocrtype:'humananalysis'
        },
        success: function (res) {
         
          console.log(JSON.parse(res.data).person_info[0].attributes.age.name)
         
          
          that.setData({
            disabled: '',
            ocrData: '性别：' + JSON.parse(res.data).person_info[0].attributes.gender.name + '\n' + '概率：' + JSON.parse(res.data).person_info[0].attributes.gender.score + '\n\n' 
              + '年龄阶段：' + JSON.parse(res.data).person_info[0].attributes.age.name + '\n' + '概率：' + JSON.parse(res.data).person_info[0].attributes.age.score + '\n\n' 
              + '上身服饰：' + JSON.parse(res.data).person_info[0].attributes.upper_wear.name + '\n' + '概率：' + JSON.parse(res.data).person_info[0].attributes.upper_wear.score + '\n\n' 
              + '下身服饰：' + JSON.parse(res.data).person_info[0].attributes.lower_wear.name + '\n' + '概率：' + JSON.parse(res.data).person_info[0].attributes.lower_wear.score + '\n\n' 
              + '上身服饰颜色：' + JSON.parse(res.data).person_info[0].attributes.upper_color.name + '\n' + '概率：' + JSON.parse(res.data).person_info[0].attributes.upper_color.score + '\n\n'
              + '下身服饰颜色：' + JSON.parse(res.data).person_info[0].attributes.lower_color.name + '\n' + '概率：' + JSON.parse(res.data).person_info[0].attributes.lower_color.score + '\n\n' 
              + '上身服饰纹理：' + JSON.parse(res.data).person_info[0].attributes.upper_wear_texture.name + '\n' + '概率：' + JSON.parse(res.data).person_info[0].attributes.upper_wear_texture.score + '\n\n' 
             + '背包：' + JSON.parse(res.data).person_info[0].attributes.bag.name + '\n' + '概率：' + JSON.parse(res.data).person_info[0].attributes.bag.score + '\n\n' 
              + '上身服饰细分类：' + JSON.parse(res.data).person_info[0].attributes.upper_wear_fg.name + '\n' + '概率：' + JSON.parse(res.data).person_info[0].attributes.upper_wear_fg.score + '\n\n' 
              + '是否戴帽子：' + JSON.parse(res.data).person_info[0].attributes.headwear.name + '\n' + '概率：' + JSON.parse(res.data).person_info[0].attributes.headwear.score + '\n\n' 
              + '是否戴眼镜：' + JSON.parse(res.data).person_info[0].attributes.glasses.name + '\n' + '概率：' + JSON.parse(res.data).person_info[0].attributes.glasses.score + '\n\n' 
              + '是否撑伞：' + JSON.parse(res.data).person_info[0].attributes.umbrella.name + '\n' + '概率：' + JSON.parse(res.data).person_info[0].attributes.umbrella.score + '\n\n' 
              + '是否使用手机：' + JSON.parse(res.data).person_info[0].attributes.cellphone.name + '\n' + '概率：' + JSON.parse(res.data).person_info[0].attributes.cellphone.score + '\n\n' 
              + '身体朝向：' + JSON.parse(res.data).person_info[0].attributes.orientation.name + '\n' + '概率：' + JSON.parse(res.data).person_info[0].attributes.orientation.score + '\n\n' 
              + '是否吸烟：' + JSON.parse(res.data).person_info[0].attributes.smoke.name + '\n' + '概率：' + JSON.parse(res.data).person_info[0].attributes.smoke.score + '\n\n' 
              + '是否有手提物：' + JSON.parse(res.data).person_info[0].attributes.carrying_item.name + '\n' + '概率：' + JSON.parse(res.data).person_info[0].attributes.carrying_item.score + '\n\n' 
              + '交通工具：' + JSON.parse(res.data).person_info[0].attributes.vehicle.name + '\n' + '概率：' + JSON.parse(res.data).person_info[0].attributes.vehicle.score + '\n\n' 
              + '上方截断：' + JSON.parse(res.data).person_info[0].attributes.upper_cut.name + '\n' + '概率：' + JSON.parse(res.data).person_info[0].attributes.upper_cut.score + '\n\n' 
              + '下方截断：' + JSON.parse(res.data).person_info[0].attributes.lower_cut.name + '\n' + '概率：' + JSON.parse(res.data).person_info[0].attributes.lower_cut.score + '\n\n' 
              + '遮挡：' + JSON.parse(res.data).person_info[0].attributes.occlusion.name + '\n' + '概率：' + JSON.parse(res.data).person_info[0].attributes.occlusion.score + '\n\n' 
              + '是否是正常人体：' + JSON.parse(res.data).person_info[0].attributes.is_human.name + '\n' + '概率：' + JSON.parse(res.data).person_info[0].attributes.is_human.score + '\n\n',
              hidden:''
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