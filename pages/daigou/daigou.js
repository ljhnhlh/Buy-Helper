// pages/daigou/daigou.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabname:[{'message':'代购'},{'message':'求购'}],
    show:false,
    currentIndex:0,
    //代购
    daigouItem: [{ 'touxiang':'https://gss1.bdstatic.com/-vo3dSag_xI4khGkpoWK1HF6hhy/baike/s%3D220/sign=571122a7b07eca8016053ee5a1229712/8d5494eef01f3a29c8f5514a9925bc315c607c71.jpg',
    'niName':'linjh','stars':0,
  'imageSrc':'https://gss1.bdstatic.com/-vo3dSag_xI4khGkpoWK1HF6hhy/baike/s%3D220/sign=571122a7b07eca8016053ee5a1229712/8d5494eef01f3a29c8f5514a9925bc315c607c71.jpg',
    'Country':'中国','place':'广州','order':0,id:''}],

    //求购
    qiugouItem: [{ 'touxiang': 'https://gss1.bdstatic.com/-vo3dSag_xI4khGkpoWK1HF6hhy/baike/s%3D220/sign=571122a7b07eca8016053ee5a1229712/8d5494eef01f3a29c8f5514a9925bc315c607c71.jpg', 'niName': 'linjh', 'stars': 0, 'imageSrc': 'https://gss1.bdstatic.com/-vo3dSag_xI4khGkpoWK1HF6hhy/baike/s%3D220/sign=571122a7b07eca8016053ee5a1229712/8d5494eef01f3a29c8f5514a9925bc315c607c71.jpg','Country':'中国','place':'广州',
    'id':''
    }]

  },
  Createdaigou:function () {
    wx.navigateTo({
      url: '/pages/Create/?type=0',
      fail: function() {
        // fail
        console.log("运行异常");
        
      }
    })
  },
  Createqiugou:function () {  
    wx.navigateTo({
      url: '/pages/Create/?type=1',
      fail: function() {
        console.log("运行异常");
      }
    })
  },
  select_nav:function(e){
    this.setData({
      currentIndex:e.target.dataset.index
    })
  },
  daigou:function(e){
   var index = e.currentTarget.dataset.index
   //需要将daigouItem[index]解析成object
    wx.navigateTo({
      url: '/pages/detail/detail?type=0&id='+ this.data.daigouItem[index].id,
    })
  },
  qiugou:function(e){
    var index = e.currentTarget.dataset.index
    //需要将daigouItem[index]解析成object
    wx.navigateTo({
      url: '/pages/detail/detail?type=1&id=' + this.data.qiugouItem[index].id
    })
  }
  ,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  CreateGou:function(){
    this.setData({
      show:~this.data.show
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