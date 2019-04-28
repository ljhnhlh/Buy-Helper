// pages/kuaidi/kuaidi.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    express_loc:'',
    num:0,
    loc:'',
    arrive_time:'',
    pay:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  tijiao:function(){
    var da = {
      express_loc: this.data.express_loc,
      num: this.data.num,
      loc: this.data.loc,
      arrive_time: this.data.arrive_time,
      pay: this.data.pay
    }
    wx.request({
      url: 'http://localhost:8080/boy/kuaidi',
      method: 'POST',
      data:da,
      success: function (res) {
        console.log(res)
      }
    })
  },
  express_loc_input:function(e){
    this.setData({
      express_loc:e.detail.value
    })
  },
  num_input: function (e) {
    this.setData({
      num: e.detail.value
    })
  },
  loc_input: function (e) {
    this.setData({
      loc: e.detail.value
    })
  },
  arrive_time_input: function (e) {
    var dat = new Date();
    console.log(dat.toLocaleString())
    this.setData({
      arrive_time: dat.toLocaleString()
    })
  },
  pay_input: function (e) {
    this.setData({
      pay: e.detail.value
    })
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