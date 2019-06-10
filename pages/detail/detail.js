// pages/detail/detail.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:0,
    id:0,
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
      {'avatarUrl':'','sid':0,'description':'','payment':0,'status':'1'},
      {'avatarUrl':'','sid':0,'description':'','payment':0,'status':'1'}
    ],
    starsItem:[],
    load_detail_item:{
      imageUrl:'',
      status1_image:'/icons/add.png',
      status2_image:'/icons/add.png',
      status:0
    },
    shwoMsg:'',
    imagePath:'',
    flag1:true
  },
 
  addSubGou:function () {  
    var type = this.data.type
    console.log(this.data.detail_info);
    var id = this.data.detail_info.did;
    console.log(type,"id",id);
    var url = '/pages/CreateSub/CreateSub?type='+type+'&id='+id;
    wx.navigateTo({
      url: url
      
    })
  },
  gouBtn:function(){
    var sessionId = app.globalData.sessionId
    console.log(sessionId);
    
    var that = this;

    var type = that.data.type
    var id = that.data.detail_info.did;
    console.log("id:",id);
    console.log(typeof(type));
    
    if(type == 0){
      type = 0
    }else{
      type = 2
    }
    wx.request({
      url: 'http://172.18.32.138:3030/Create/getIssueWechat',
      data: {
        type:type,
        id:id
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {sessionId:sessionId,"Content-Type": "application/x-www-form-urlencoded"}, // 设置请求的 header
      success: function(res){
        // success
        console.log(res);
        console.log(res.data.errcode);
        
        
        var prom = new Promise(function (resolve, reject) {
          if(res.data.errcode == 1){
            console.log(res.data.wechat);
            
            that.setData({
              shwoMsg:res.data.wechat
            })
          }else{
            that.setData({
              shwoMsg:"无法获取"
            })
          }
          resolve("1")
    })
    prom.then(function(value){
      that.toggleDialog()
    })
        }
    })
  },
  getWeixing:function (e) {
    var sessionId = app.globalData.sessionId
    console.log(sessionId);
    var that = this;
    var index = e.currentTarget.dataset.index
    var type = that.data.type
    var id = that.data.sub_gouItem[index].sid;

    console.log(typeof(type));

    console.log("index",index,"id",id,"type",type);

    if(type == 0)
    {
      type = 1;
    }else{
      type = 3;
    }

    wx.request({
      url: 'http://172.18.32.138:3030/Create/getIssueWechat',
      data: {
        type:type,
        id:id
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {sessionId: sessionId,"Content-Type": "application/x-www-form-urlencoded"}, // 设置请求的 header
      success: function(res){
        // success
        console.log(res);
        console.log(res.data.errcode);
        
        
        var prom = new Promise(function (resolve, reject) {
          if(res.data.errcode == 1){
            console.log(res.data.wechat);
            
            that.setData({
              shwoMsg:res.data.wechat
            })
          }else{
            that.setData({
              shwoMsg:"无法获取"
            })
          }
          resolve("1")
    })
    prom.then(function(value){
      that.toggleDialog()
    })
    }
    })


  },
  accSub:function (e) {  
    var sessionId = app.globalData.sessionId
    console.log(sessionId);
     var index = e.currentTarget.dataset.index
     var that = this;
     console.log(index);
     console.log(e);
     var id = that.data.sub_gouItem[index].sid
     var type = that.data.type
     var temp = that.data.sub_gouItem
     temp[index].status = 1;;
     that.setData({
        sub_gouItem:temp
     })
     wx.request({
       url: 'http://172.18.32.138:3030/Create/ReceiveSubGou',
       data: {
         id:id,
         type:type
       },
       method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
       header: {sessionId:sessionId,"Content-Type": "application/x-www-form-urlencoded"}, // 设置请求的 header
       success: function(res){
         // success
         if(res.data.errcode == 1){

          wx.showToast({
            title: '成功',
            icon:'success'
          })
         }
       },
       fail: function() {
         // fail
       },
       complete: function() {
         // complete
       }
     })
  },
  acceptIssue:function () {
    var sessionId = app.globalData.sessionId
    console.log(sessionId);
    var that = this;
    var type = that.data.type
    var id = that.data.detail_info.did
    wx.request({
      url: 'http://172.18.32.138:3030/Create/ReceiveGou',
      data: {
        id:id,
        type:type
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {sessionId:sessionId,"Content-Type": "application/x-www-form-urlencoded"}, // 设置请求的 header
      success: function(res){
        console.log(res);
        
        if(res.data.errcode == 1){
          var load_detail_item = that.data.load_detail_item
          
          
          load_detail_item[0].status = 1;
          that.setData({
            load_detail_item:load_detail_item
          })
          wx.showToast({
            title: '成功',
            icon:'success'
          })
         
        }
      }
    })
  }
  ,
  renewTravel:function () {
    var sessionId = app.globalData.sessionId
    console.log(sessionId);
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
              console.log("rest",rest.data.errcode);
              var temp = JSON.parse(rest.data)
              if(temp.errcode == 1){
                imageUrl = "http://119.23.218.7:8080/"+ temp.imageUrl
                console.log("imageUrl",imageUrl);
                
              }
              console.log("imageUrl","不超过");
              wx.request({
                url: 'http://172.18.32.138:3030/Create/ChangeStatues ',
                data: {
                  type:type,
                  imageUrl:imageUrl,
                  id:id,
                  status:status
                },
                method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                 header: {sessionId:sessionId,"Content-Type": "application/x-www-form-urlencoded"}, // 设置请求的 header
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
          status:status
        },
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {sessionId:sessionId,"Content-Type": "application/x-www-form-urlencoded"}, // 设置请求的 header
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
    
    var sessionId = app.globalData.sessionId
    console.log("options",options);
    
    var detail_info = app.globalData.detail_info
    // console.log(detail_info);
    
    var id = detail_info.did;
    var ty = options.type;
    
    var url = 'http://172.18.32.138:3030/Create/detail_daigou'
    var type = 1
    if(ty === "0")
      {
        url = 'http://172.18.32.138:3030/Create/detail_daigou'
        type = 0
      }


    var stars = detail_info.stars
    // console.log(stars);
    var starsItem = []
    var that = this
    for(var i = 0;i < stars;i++){
      starsItem.push('/icons/starts.png')
    }
    // console.log(starsItem);
    
    
    wx.request({
      url: url,
      data: {id:id,type:type},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        console.log("res",res);
        if(res.data.errcode == 1)
        {
          // console.log("res",res);
          
          console.log("list",res.data.list);

          
          that.setData({
            load_detail_item:res.data.list,
            starsItem:starsItem,
            type:type,
            id:id,
            detail_info:detail_info
          })
          console.log("load_detail", that.data.load_detail_item);
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
        // console.log(res.errmsg);
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
  showPhoto:function(){
    this.setData({
      flag1: false
    })
  },
  toggleDialog: function() {
    this.setData({
      showDialog: !this.data.showDialog
    })
  },
    //关闭问卷选项弹窗
close_qu_popup: function() {
this.setData({
  flag1: true
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
    //加载sub_gou
    var that = this
    var id = this.data.id
    var type = this.data.type
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