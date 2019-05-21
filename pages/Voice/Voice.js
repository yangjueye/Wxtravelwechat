const app = getApp()
var ip = app.globalData.ip
//录音管理
const recorderManager = wx.getRecorderManager()
//音频组件控制
const innerAudioContext = wx.createInnerAudioContext()
var tempFilePath;
Page({
  
  data: {
    
  },
  //开始录音的时候
  start: function () {
    const options = {
      duration: 60000,//指定录音的时长，单位 ms
      sampleRate: 16000,//采样率
      numberOfChannels: 1,//录音通道数
      encodeBitRate: 96000,//编码码率
      format: 'mp3',//音频格式，有效值 aac/mp3
      frameSize: 50,//指定帧大小，单位 KB
    }
    //开始录音
    recorderManager.start(options);
    recorderManager.onStart(() => {
      console.log('recorder start')
    });
    //错误回调
    recorderManager.onError((res) => {
      console.log(res);
    })
  },
  //停止录音
  stop: function () {
    recorderManager.stop();
    recorderManager.onStop((res) => {
      this.tempFilePath = res.tempFilePath;
      console.log('停止录音', res.tempFilePath)
      const { tempFilePath } = res
    })
  },
  //播放声音
  play: function () {
    innerAudioContext.autoplay = true
    innerAudioContext.src = this.tempFilePath,
      innerAudioContext.onPlay(() => {
        console.log('开始播放')
      })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })

  },
  //上传录音
  upload: function () {
    wx.uploadFile({
      url: ip + '/upload', 
      filePath: this.tempFilePath,
      name: 'file',
      header: {
        "Content-Type": "multipart/form-data"
      },
      formData:
        {
          openid: wx.getStorageSync('openid')
        },
      success: function (res) {
        console.log(res.data);
        wx.setStorageSync('voicename', res.data)
        wx.showToast({
          title: '留声成功,请发送！',
          icon: 'success',
          duration: 3000
        })
        wx.switchTab({
          url: '../Index/Index'
        })
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {

      }
    })
  },
  onLoad: function () {
 
  },
})