// pages/Message/Message.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabname: [{ 'message': '代购' }, { 'message': '求购' }],
    show: false,
    currentIndex: 0,
    daigouItem:[],
    qiugouItem:[],
    hideModal:true,
    index:0,
    stars:['/icons/stars.png','/icons/stars.png','/icons/stars.png','/icons/stars.png','/icons/stars.png',]
  },
  conform:function (e) {
    var that =this;
    var index = e.target.dataset.index
    var hideModal = that.data.hideModal
    console.log(hideModal);
    
    that.setData({
      index:index,
      hideModal:hideModal
    })
   
  },
  select_nav:function(e){
    var that = this
    var index = e.target.dataset.index

      wx.request({
        url: 'http://172.18.32.138:3030/Create/onLoad',
        data: {type:index},
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function(res){
          // success
          // console.log(res);
          var itemTemp = res.data.list
          // console.log(itemTemp);
          
          var starsItem = []
            for(var x = 0;x < itemTemp.length;x++){
              var t = []
              // console.log(itemTemp[x]);
              // console.log(itemTemp[x].stars);
              
              for(var i = 0;i < itemTemp[x].stars;i++){
                  t.push('/icons/starts.png')
              }
              // console.log(t);
              
              starsItem.push(t)
            }
          if(res.data.errcode == 1){
            var item = res.data.list
            // console.log(item);
            
              if(index == 0){
                that.setData({
                  daigouItem:item,
                  starsItem:starsItem
                })
              }else{
                that.setData({ 
                  qiugouItem:item,
                  starsItem:starsItem
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
   //  console.log("index",index);
    
    //需要将daigouItem[index]解析成object
     var that = this;
     
     app.globalData.detail_info = that.data.daigouItem[index]
     // console.log(app.globalData);
     
     wx.navigateTo({
       url: "/pages/detail/detail?type=0"
     })
   },
   qiugou:function(e){
     var index = e.currentTarget.dataset.index
     // console.log("index",index);
     var that = this
     app.globalData.detail_info = that.data.qiugouItem[index]
     // console.log(app.globalData);
     //需要将daigouItem[index]解析成object
     wx.navigateTo({
       url: '/pages/detail/detail?type=1'
     })
   }
   ,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var index = 0

      wx.request({
        url: 'http://172.18.32.138:3030/Create/onLoad',
        data: {type:index},
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function(res){
          // success
          // console.log(res);
          
          if(res.data.errcode == 1){
            var item = res.data.list
            // console.log(item);
            var starsItem = []
            for(var x = 0;x < item.length;x++){
              var t = []
              // console.log(item[x]);
              // console.log(item[x].stars);
              
              for(var i = 0;i < item[x].stars;i++){
                  t.push('/icons/starts.png')
              }
              // console.log(t);f
              
              starsItem.push(t)
            }
            if(index == 0){
              that.setData({
                daigouItem:item,
                starsItem:starsItem
              })
            }else{
              that.setData({
                qiugouItem:item,
                starsItem:starsItem
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