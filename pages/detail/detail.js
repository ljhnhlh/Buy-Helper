// pages/detail/detail.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:0,
    detail_info:[{
      did:0,
      avatarUrl:'',
      nickName:'',
      stars:3,
      destination:"",
      description:'',
      last_for_time:'',
      
    }],
    'sub_gouItem':[
      {'avatarUrl':'ljh','sid':0,'description':'','payment':0,'status':'1'},
      {'avatarUrl':'ljh','sid':0,'description':'','payment':0,'status':'1'}
    ],
    starsItem:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var id = options.id;
    var type = options.type;
    var detail_info = JSON.parse(app.globalData.detail_info)
    this.setData({
      type:type,
      id:id,
      detail_info:detail_info
    })  
    

    var stars = this.data.gouItem[0].stars;
    var stars = 5
    console.log(stars);
    
    var starsItem = []
    for(var i = 0;i < stars;i++){
      starsItem.push('/icons/starts.png')
    }
    this.setData({
      starsItem:starsItem
    })
    console.log(starsItem);
    
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