//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    searchUrl: '/images/search-icon.png',
    showDialog: false //弹窗
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //跳转到快递代拿接单界面（可编辑删除）
  goToReceiptPage: function () {
    wx.navigateTo({
      url: '../receipt/receipt',
    })
  },
  //跳转到快递代拿发布界面（可编辑删除）
  goToPublishPage: function () {
    wx.navigateTo({
      url: '../publish/publish',
    })
  },
  goToWenjuanPage: function () {
    wx.navigateTo({
      url: '../questionnaire/questionnaire',
    })
  },
  toggleDialog() {
    this.setData({
      showDialog: !this.data.showDialog
    })
  },
  onLoad: function () {
    wx.hideTabBar({})
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      wx.showTabBar({})
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        wx.showTabBar({})
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          wx.showTabBar({})
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    wx.showTabBar({})
    if (app.globalData.code) {
      // ------ 发送凭证 ------
      var t = {
        code: app.globalData.code,
        nickName: e.detail.userInfo.nickName,
        avatarUrl: e.detail.userInfo.avatarUrl,
        gender: e.detail.userInfo.gender
      }
      console.log(t)
      wx.request({
        url: 'http://172.18.32.138:8080/Create/User',
        data: t,
        method: 'POST',
        header: {
          "Content-Type": "json"
        },
        success: function (res) {
          console.log(res)
          if (res.statusCode == 200) {
            console.log("获取到的openid为：" + res.data)
            app.globalData.openid = res.data
            wx.setStorageSync('openid', res.data)
          } else {
            console.log('结果：' + res.errMsg)
          }
        },
      })
    } else {
      console.log('获取用户登录失败：' + res.errMsg);
    }
  }
})
