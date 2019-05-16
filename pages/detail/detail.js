// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:0,
    gouItem:[
      {
        "touxiang": '/icons/icon.png', 
        'niName': 'linjh', 
        'stars':5,
        'detail': '帮忙买衣服', 
        'imageSrc': '/icons/icon.png',
        'buyer':[
                {'niName':'ljh','object':'tt','num':100,'payoff':'1w','state':'1','openid':'1'},
                {'niName':'ljy','object':'aqm','num':100,'payoff':'5k','state':'0','openid':'0'}
          ],
        'state':[1,1,0,0],
        'payoff':100,
        'contact':'wxx'
      }
      ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    var type = options.type;
    this.setData({
      type:type,
      id:id
    })
    // wx.request({
    //   url: 'localhost:8080?type='+type+"&id="+id,
    //   success:function(res) {
    //     var that = this;
    //     that.setData({
    //       gouItem:res.data
    //     })
    // }
    // })
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