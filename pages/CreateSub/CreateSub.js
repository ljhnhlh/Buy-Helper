// pages/CreateSub/CreateSub.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    type:0,
    description:'',
    payment:0
  },
  create:function () {
    var that = this;

    console.log(typeof(that.data.id),"type",typeof(that.data.type));
    wx.request({
      url: 'http://172.18.32.138:3030/Create/SubGou',
      data: {
        type:that.data.type,
        id:that.data.id,
        description:that.data.description,
        payment:that.data.payment
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {sessionId:'847694c4-14dd-47b2-8922-facd8e379f47',"Content-Type": "application/x-www-form-urlencoded"}, // 设置请求的 header
      success: function(res){
        if(res.data.errcode == 1){
          
          wx.navigateBack({
            delta: 1, // 回退前 delta(默认为1) 页面
            success: function(res){
              wx.showToast({
                title: '成功',
                icon:'success'
              })
            }
          })
        }
        else{
          wx.showToast({
            title: '失败',
            icon:'none'
          })
        }
      }
    })
  },
  gouInput:function (e) {
    this.setData({
      description:e.detail.value
    })
  },
  paymentInput:function (e) {
    this.setData({
      payment:e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    var type = options.type
    console.log(typeof(id),"type",type);
    
    if(type === "0"){
      type = 0
    }
    else{
      type = 1
    }
    this.setData({
      id :id,
      type:type
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