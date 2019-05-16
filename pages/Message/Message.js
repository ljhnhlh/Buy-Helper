// pages/Message/Message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabname: [{ 'message': '代购' }, { 'message': '求购' }],
    show: false,
    currentIndex: 0,
    daigouItem:[{
      nickName:"0.",
      place:"广东广州",
      description:"买东西",
      state:1
    }],
    qiugouItem:[{
      nickName: "0.",
      place: "广东广州",
      description: "买东西",
      state: 1
    }]
  },
  select_nav: function (e) {
    this.setData({
      currentIndex: e.target.dataset.index
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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