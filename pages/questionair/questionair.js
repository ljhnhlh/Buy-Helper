// pages/questionair/questionair.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    description:'',
    content:[],
    inner:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  create:function () {
    var name = "调查问卷"
    var description = "饭堂满意度"
    var content = new Array()

    content.push({type:0,title:"对饭堂的满意度", a:"不满意",b:'一般',c:'较满意',d:'满意'})

    content.push({type:1,title:"喜欢窗口", a:"不满意",b:'一般',c:'较满意',d:'满意'})

    content.push({type:2,title:"对饭堂的建议",a:"",b:'',c:'',d:''})
    var content_count = []
    
    // var content2 = {content:content}
    for(var i = 0;i < content.length;i++){
      content_count.push({type:content[i].type,a:0,b:0,c:0,d:0,fill:''})
    }
    // var temp = {content:JSON.stringify(content),content_count:JSON.stringify(content_count)};
    // var data = JSON.stringify(temp)
    var t1 = JSON.stringify(content)
    var t2 = JSON.stringify({content_count:content_count})
    wx.request({
      url: 'http://172.18.32.138:8080/Create//questionair',
      data: {
        name:name,
        description:description,
        pay:4,
        content:t1,
        content_count:t2
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {sessionId:' 847694c4-14dd-47b2-8922-facd8e379f47',"Content-Type": "application/x-www-form-urlencoded"}, // 设置请求的 header
      success: function(res){
        console.log(res);
      }
    })
  },
  fill:function () {
    var content_count = []
    // content2.push([0,0,0,0,1,""])
    content_count.push({type:0,a:1,b:0,c:0,d:0,fill:''})
    // content2.push([1,0,1,1,0,""])
    content_count.push({type:1,a:0,b:1,c:1,d:0,fill:''})
    // content2.push([2,''])
    content_count.push({type:2,a:0,b:0,c:0,d:0,fill:'加点饭'+";"})
    var content = JSON.stringify({content_count:content_count})
    wx.request({
      url: 'http://172.18.32.138:8080/Create/fill',
      data: {
        content_count:content,
        id:19
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {sessionId:' 847694c4-14dd-47b2-8922-facd8e379f47',"Content-Type": "application/x-www-form-urlencoded"}, // 设置请求的 header
      success: function(res){
        console.log(res);
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  // 获取问卷，用于填写
  get:function () {  
    wx.request({
      url: 'http://172.18.32.138:3030/Create/getQuestionairContent',
      data: {
        id:17
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        console.log(res);
        var temp = res.data[0].content;
        var t = JSON.parse(temp)
        console.log(t[1]);
        
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  }
})