// pages/Create/Create.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:0,
    Country:['中国','美国','其他'],
    region:['北京市','北京市','东城区'],
    province:'',
    city:'',
    isChina:true,
    index:0,
    hasChosen:false,
    imagePath:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var type = options.type;
      this.setData({
        type:type
      })
      
  },
  ChooseRegion:function (e) {  
    // console.log(e);
    console.log(e.detail.value);
    
    this.setData({region:e.detail.value})
    
  },
  chooseCountry:function (e) {
    var value = e.detail.value;
    console.log(value);

    this.setData({
      index:value,
      isChina:(value==0)
    })
    
  }
  ,
  uploadImage:function () {
    var that = this
    wx.chooseImage({
      count: 1, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function(res){
        console.log(res);
        that.setData({
          imagePath:res.tempFilePaths[0],
          hasChosen:true
        })
      }
    })
    },
    CreateIssue:function () {
      
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