
var Bmob = require("../../utils/bmob.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userName: '',
    userPhone: '',
    userQQ: '',
    userCompanyname: '',
    workLife: ["1-3年", "3-5年", "5-8年", "8年以上"],
    workLifeIndex: 0,
    rangeIndex: 0,
    userLicence: '',
    userCityadd: '',
    userStyle: '',
    selfIntroduction: '',

    buttonLoading: false,
  },
  //监听输入
  bindNameInput: function (e) {
    this.data.userName = e.detail.value;
  },
  bindPhoneInput: function (e) {
    this.data.userPhone = e.detail.value;
  },
  bindQQInput: function (e) {
    this.data.userQQ = e.detail.value;
  },
  bindAdvantagesInput: function (e) {
    this.data.userAdvantages = e.detail.value;
  },
  bindRangeChange: function (e) {
    this.setData({
      rangeIndex: e.detail.value,
    })
  },
  bindLicenceInput: function (e) {
    this.data.userLicence = e.detail.value;
  },
  bindCityaddInput: function (e) {
    this.data.userCityadd = e.detail.value;
  },
  bindCompanynameInput: function (e) {
    this.data.userCompanyname = e.detail.value;
  },
  bindWebsiteInput: function (e) {
    this.data.userWebsite = e.detail.value;
  },
  bindMailboxInput: function (e) {
    this.data.userMailbox = e.detail.value;
  },
  inputIntroduction: function (e) {
    this.data.selfIntroduction = e.detail.value;
  },

  //监听上传按钮
  bindSubmit: function (e) {
    //验证是否填写完善必要信息
    if (this.data.userName == '' || this.data.userPhone == '' || this.data.userQQ == '' || this.data.userCompanyname == ''
      || this.data.userLicence == '' || this.data.userCityadd == '' || this.data.userWebsite == '' || this.data.userMailbox == '' || this.data.userAdvantages=='') {
      wx.showModal({
        title: '提示',
        content: '请填写必要信息',
        showCancel: false
      });
      return;
    }

    var that = this;
    this.setData({
      buttonLoading: true
    })
    var currentUser = Bmob.User.current();

    var Apply = Bmob.Object.extend("join");
    var apply = new Apply();
    apply.set("appUser", currentUser);
    apply.set("userName", this.data.userName);
    apply.set("userPhone", this.data.userPhone);
    apply.set("userQQ", this.data.userQQ);
    apply.set("userCompanyname", this.data.userCompanyname);
  //  apply.set("workLife", this.data.workLife[this.data.workLifeIndex]);
   // apply.set("range", this.data.range[this.data.rangeIndex]);
    apply.set("userLicence", this.data.userLicence);
  //  apply.set("userLens", this.data.userLens);
  //  apply.set("userStyle", this.data.userStyle);
    apply.set("selfIntroduction", this.data.selfIntroduction);
    //添加数据，第一个入口参数是null
    apply.save(null, {
      success: function (result) {
        // 添加成功，返回成功之后的objectId
        that.setData({
          buttonLoading: false
        });
        wx.showToast({
          title: '申请提交成功',
          icon: 'success',
          duration: 3000
        })
      },
      error: function (result, error) {
        // 添加失败
        console.log('创建失败');
        wx.showToast({
          title: '申请提交失败',
          icon: 'fail',
          duration: 3000
        })
      }
    });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

})