// pages/register/register.js
var app = getApp()
Page({

  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    selectShow: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: ['15:10', '15:15', '15:20'], //下拉列表的数据
    index: 0, //选择的下拉列表下标
    array: ['中山大学', '华南理工大学', '华南师范大学', '广州大学', '广州工业大学', '广州中医药大学', '广州药科大学', '星海音乐学院']
  },
  bindPickerChange: function (e) {
    var value = e.detail.value;

    console.log(this.data.array[value]);
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindGetUserInfo:function(e){
    //注册
    wx.login({
      success: function(res){
        console.log("注册code",res.code)
        console.log("注册头像",e.detail.userInfo.avatarUrl)
        wx.request({
          url: 'http://172.18.32.138:3030/Create/User',
          data: {
            code:res.code,
            nickName:e.detail.userInfo.nickName,
            avatarUrl:e.detail.userInfo.avatarUrl,
            gender:e.detail.userInfo.gender
          },
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {"Content-Type": "application/x-www-form-urlencoded"}, // 设置请求的 header
          success: function(rest){
            console.log("输出rest",rest);
            console.log("输出rest code",rest.errcode);
            if(rest.data.errcode == 1){
              app.globalData.sessionId = rest.data.sessionId;
              console.log("sessionId:",app.globalData.sessionId);
              
              wx.switchTab({  
                url: '/pages/daigou/daigou'
              })
              wx.showToast({
                title: '成功',
                icon:'success'
              })
            }
            else{
              console.log(res);
            }
          },
          fail: function() {
            wx.showToast({
              title: '系统错误',
              icon:'success'
            })
            console.log("系统错误");
          }
        })
      }
    })
   }
})