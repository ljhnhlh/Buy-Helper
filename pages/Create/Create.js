// pages/Create/Create.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:0,
    Country:['中国','美国','其他'],
    region:['北京市','北京市','东城区'],
    isChina:true,
    index:0,
    hasChosen:false,
    imagePath:'',
    loc_detail:'',
    description:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var type = options.type;
      console.log(type);
      
      this.setData({
        type:type
      })
      
  },
  ChooseRegion:function (e) {  
    // console.log(e);
    console.log(e.detail.value[0]);
    this.setData({region:e.detail.value})
    
  },
  loc_detail:function (e) {  
    this.setData({
      loc_detail : e.detail.value
    })
  },
  gou_detail:function (e) {  
    this.setData({
      description:e.detail.value
    })
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
      var that = this;
      var imagePath = that.data.imagePath
      wx.uploadFile({
        url: 'http://119.23.218.7:8080/File/Upload',
        filePath:imagePath,
        name:'img',
        // header: {}, // 设置请求的 header
        // formData: {}, // HTTP 请求中其他额外的 form data
        success: function(res){
          // success
          var type = that.data.type;
          var res_data = JSON.parse(res.data);
          console.log(typeof(res.data));
          
          console.log(res_data.imageUrl);
          
          var imgUrl = "http://119.23.218.7:8080/"+ res_data.imageUrl;
          console.log(imgUrl);
          
          var region = ''
          if(that.data.isChina){
            region = that.data.region[0]+that.data.region[1]+that.data.region[2]
            console.log(that.data.region[0]);
            console.log(that.data.region[1]);
            console.log(that.data.region[2]);
            
            
            
          }
          var index = that.data.index
          var destination = that.data.Country[index] + region + that.data.loc_detail    
          var description = that.data.description
          console.log("log",type,imgUrl,destination,description);
                
          wx.request({
            url: 'http://172.18.32.138:3030/Create/Gou',    
            data: {
              type:type,
              destination:destination,
              imageUrl:imgUrl,
              description:description,
              last_for_time:''
            },
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {sessionId:'847694c4-14dd-47b2-8922-facd8e379f47',"Content-Type": "application/x-www-form-urlencoded"}, // 设置请求的 header
            success: function(res){
              // success
              if(res.data.errcode == 1){
                wx.navigateBack({
                  delta: 1, // 回退前 delta(默认为1) 页面
                  success: function(){
                    wx.showToast({
                      title: '成功',
                      icon:'success'
                    })
                  }
                })
              }
              
            }
          })
        },
        fail: function() {
          // fail
          console.log("上传失败");
        },
        complete: function() {
          // complete
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