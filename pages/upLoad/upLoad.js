// pages/upLoad/upLoad.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageUrl:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  chooseImage:function(e){
    var that =this;
    wx.chooseImage({
      success: function(res) {
        // that.setData({
        //   imageUrl:res.tempFilePaths[0]
        // })
        wx.uploadFile({
          url: 'http://172.18.32.138:8080/File/Upload',
          filePath: res.tempFilePaths[0],
          name: 'img',
          success:function(res){
            var t =  JSON.parse(res.data);
            console.log(t.imageUrl)
            var url = 'http://172.18.32.138:8080/' + t.imageUrl;
            that.setData({
              imageUrl:url
            })
          }
        }
        )

      }

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