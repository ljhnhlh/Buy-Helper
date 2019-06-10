

Page({
  data: {
    nickname: "小明",
    phone: 15167496318,
    user_img: "http://img.52z.com/upload/news/image/20180213/20180213062641_35687.jpg",
    show:["个人信息","二恶"]
  },
  goTo_info: function () {
    wx.navigateTo({
      url: 'my_info/my_info',
    })
  },
  goTo_balance: function () {
    wx.navigateTo({
      url: 'my_balance/my_balance',
    })
  },
  goTo_service: function () {
    wx.navigateTo({
      url: 'service/service',
    })
  },
  onLoad:function(options){
    var that = this
    wx.getUserInfo({
      success: function(res){
        console.log(res);
        that.setData({
          info:res.userInfo
        })
        
      },
      fail: function() {
        // fail
        console.log("fail");
        
      },
      complete: function() {
        // complete
      }
    })
  }
})
