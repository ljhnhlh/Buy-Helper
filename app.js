App({
  onLaunch: function () {
    var sessionId =  wx.getStorageSync('sessionId');
    var expirTime =  wx.getStorageSync('expireTime');
    var time = wx.getStorageSync('time');
    console.log(sessionId +","+expirTime+","+time)
    var needLogin = false
    if(!sessionId || !expirTime)
      needLogin = true;
    else{
      var now = new Date()
      if(now - time >= expirTime)
        needLogin = true;
        console.log(now - time);
    }
    if(needLogin){
      //需要登陆
      wx.login({
        success: function(res){
          wx.request({
            url: 'http:172.18.32.138',
            data: {code:res.code},
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function(reqback){
              if(reqback.errcode == 0){
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
                wx.setStorage({
                  key: 'sessionId',
                  data: reqback.sessionId
                })
                wx.setStorage({
                  key: 'expireTime',
                  data: reqback.expirTime
                })
                var now_time = new Date();
                wx.setStorage({
                  key: 'time',
                  data: now_time
                })
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
    
  }
})