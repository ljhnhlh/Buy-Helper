App({
  onLaunch: function () {
    var that = this;
    // 因为无法set storage，所以先不用
    // var sessionId =  wx.getStorageSync('sessionId');
    // var expirTime =  wx.getStorageSync('expireTime');
    // var time = wx.getStorageSync('time');
    

    var needLogin = true;
    // if(!sessionId || !expirTime)
    //   needLogin = true;
    // else{
    //   var now = new Date()
    //   if(now - time >= expirTime)
    //     needLogin = true;
    //   console.log("now and time",now - time);
    // }
    // console.log(needLogin);
    
    if(needLogin){
      //需要登陆
      wx.login({
        success: function(res){
          console.log(res.code);
          wx.request({
            url: 'http://172.18.32.138:3030/Create/Login',
            data: {code:res.code},
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {"Content-Type": "application/x-www-form-urlencoded"}, // 设置请求的 header
            success: function(reqback){
              console.log(reqback);
              console.log(reqback.data);
              
              // var temp = JSON.parse(reqback.data)
              // console.log(temp.errmsg);
              var temp = reqback.data
              if(temp.errcode == 0){
                //需要注册
                wx.redirectTo({
                  url: '/pages/register/register',
                  fail: function() {
                    console.log("程序错误");
                  }
                })
                console.log(reqback.errmsg);
              }else
              {
                // 已测试
                that.globalData.sessionId = reqback.data.sessionId
              }
            },
          })
        }
      })
    }
    

  },
  onShow: function () {
    
  },
  onHide: function () {
    
  },
  onError: function (msg) {
    
  },
  globalData: {
    sessionId: null,
    detail_info:null,
  }
})