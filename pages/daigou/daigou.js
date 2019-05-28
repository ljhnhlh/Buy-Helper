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
    'nickName':'linjh','stars':0,
  'imageSrc':'https://gss1.bdstatic.com/-vo3dSag_xI4khGkpoWK1HF6hhy/baike/s%3D220/sign=571122a7b07eca8016053ee5a1229712/8d5494eef01f3a29c8f5514a9925bc315c607c71.jpg',
    'description':'dadf','destination':'中国 广州',id:'',last_for_time:"dfsafds"}],

    //求购
    qiugouItem: [{ 'touxiang': 'https://gss1.bdstatic.com/-vo3dSag_xI4khGkpoWK1HF6hhy/baike/s%3D220/sign=571122a7b07eca8016053ee5a1229712/8d5494eef01f3a29c8f5514a9925bc315c607c71.jpg',
     'nickName': 'linjh', 'stars': 0, 
     'imageSrc': 'https://gss1.bdstatic.com/-vo3dSag_xI4khGkpoWK1HF6hhy/baike/s%3D220/sign=571122a7b07eca8016053ee5a1229712/8d5494eef01f3a29c8f5514a9925bc315c607c71.jpg',
     'description':'dadf','destination':'中国 广州',
    'id':'',last_for_time:"dfsdasdsa"
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
    var that = this
    var index = e.target.dataset.index

      wx.request({
        url: 'https://URL',
        data: {type:index},
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function(res){
          // success
          if(res.errcode == 1){
            var item = JSON.parse(res.list)
              if(index == 0){
                that.setData({
                  daigouItem:item
                })
              }else{
                that.setData({
                  qiugouItem:item
                })
              }
          }
          else{
            console.log(res.errmsg);
          }
        }
      })
    
 
    that.setData({
      currentIndex:index
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