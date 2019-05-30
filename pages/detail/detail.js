// pages/detail/detail.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:0,
    detail_info:{
      did:0,
      avatarUrl:'',
      nickname:'',
      stars:3,
      destination:"ewqrew",
      description:'rewrqwrrrrrrrrrrrrrrrr',
      last_for_time:'wqerwqrwq'
    },
    'sub_gouItem':[
      {'avatarUrl':'ljh','sid':0,'description':'','payment':0,'status':'1'},
      {'avatarUrl':'ljh','sid':0,'description':'','payment':0,'status':'1'}
    ],
    starsItem:[],
    load_detail_item:{
      imageUrl:'',
      status1_image:'',
      status2_image:'',
      status:0
    },
    imagePath:''
  },
  renewTravel:function () {
    var that = this
    //获得状态
    var status = that.data.load_detail_item[0].status
    console.log(status);
    
    var type = that.data.type
    var id = that.data.detail_info.did 

    if(status == 1 || status == 3){
      wx.chooseImage({
        count: 1, // 最多可以选择的图片张数，默认9
        sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
        success: function(res){
          wx.uploadFile({
            url: 'http://119.23.218.7:8080/File/Upload',
            filePath:res.tempFilePaths[0],
            name:'img',
            // header: {}, // 设置请求的 header
            // formData: {}, // HTTP 请求中其他额外的 form data
            success: function(rest){
              var imageUrl = "";
              if(rest.data.errcode == 1){
                imageUrl = "http://119.23.218.7:8080/"+ res.data.imageUrl
              }
              wx.request({
                url: 'http://172.18.32.138:3030/Create/ChangeStatues ',
                data: {
                  type:type,
                  imageUrl:imageUrl,
                  id:id,
                  status:status
                },
                method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                 header: {sessionId:'847694c4-14dd-47b2-8922-facd8e379f47',"Content-Type": "application/x-www-form-urlencoded"}, // 设置请求的 header
                success: function(res){
                  console.log("上传成功");
                  var temp = that.data.load_detail_item;
                  temp[0].status = status+1;
                  if(status == 1){
                    temp[0].status1_image = imageUrl
                  }else{
                    temp[0].status2_image = imageUrl
                  }
                  that.setData({
                    load_detail_item:temp
                  })
                },
                fail: function() {
                  console.log("失败");
                }
              })
            }
          })

        },
        fail: function() {
          console.log("选择失败");
        }
      })
    } 
    else{
      wx.request({
        url: 'http://172.18.32.138:3030/Create/ChangeStatues',
        data: {
          type:type,
          imageUrl:'',
          id:id,
          status:1
        },
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {sessionId:'847694c4-14dd-47b2-8922-facd8e379f47',"Content-Type": "application/x-www-form-urlencoded"}, // 设置请求的 header
        success: function(res){
          // success
          console.log("状态改变成功");
          var temp = that.data.load_detail_item
          temp[0].status = status+1
      
          that.setData({
            load_detail_item:temp
          })
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    console.log("options",options);
    
    var detail_info = app.globalData.detail_info
    var id = detail_info.did;
    var ty = options.type;
    
    var url = 'http://172.18.32.138:3030/Create/detail_qiugou'
    var type = 1
    if(ty === "0")
      {
        url = 'http://172.18.32.138:3030/Create/detail_daigou'
        type = 0
      }


    var stars = detail_info.stars
    console.log(stars);
    var starsItem = []
    var that = this
    for(var i = 0;i < stars;i++){
      starsItem.push('/icons/starts.png')
    }
    console.log(starsItem);
    
    
    wx.request({
      url: url,
      data: {id:id},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        if(res.data.errcode == 1)
        {
          console.log("res",res);
          
          console.log("list",res.data.list);
          
          that.setData({
            load_detail_item:res.data.list,
            starsItem:starsItem,
            type:type,
            id:id,
            detail_info:detail_info
          })
          
          
        }
        console.log(res.errmsg);

        //加载sub_gou
        wx.request({
          url: 'http://172.18.32.138:3030/Create/onShow',
          data: {
                type:type,
                id:id
              },
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          // header: {}, // 设置请求的 header
          success: function(res){
            // success
            console.log(res);
            
            that.setData({
              sub_gouItem:res.data
            })
          }
        })
      }
    })

    


    // this.setData({
    //   starsItem:starsItem
    // })
    // this.setData({
    //   type:type,
    //   id:id,
    //   detail_info:detail_info
    // })  
    
    
    
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