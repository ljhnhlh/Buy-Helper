[TOC]





# spring boot 学习地址

https://blog.csdn.net/qq_31001665/

# spring boot接收post数据并返回

```java
 @PostMapping("/kuaidi")
    public String GetKuaiDiInfo(@RequestBody Map<String,Object>reqMap){
        String express_loc = reqMap.get("express_loc").toString();
        String num = reqMap.get("num").toString();

        return express_loc + " " + num;
    }
```



返回值在res.data中

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190427112445643.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM2MzAzODYy,size_16,color_FFFFFF,t_70)







# spring boot 发送 http post 请求

- 使用 Restemplate 来发送HTTP请求
- 使用 LinkedMultiValueMap 传递数据
- 使用 HttpHeaders 设置请求头
- 使用 HttpEntity 设置请求体

```java
@RequestMapping(value = "/BalDetail",method = RequestMethod.POST)
    public JSONObject CreateIssueBalanceDetail(int price,String type,String uid,String path){

        //请求路径
        String url = "https://moneydog.club:3336/History/"+path;
        //使用Restemplate来发送HTTP请求
        RestTemplate restTemplate = new RestTemplate();
        // json对象
        JSONObject jsonObject = new JSONObject();
		
        // LinkedMultiValueMap 有点像JSON，用于传递post数据，网络上其他教程都使用 
        // MultiValueMpat<>来传递post数据
        // 但传递的数据类型有限，不能像这个这么灵活，可以传递多种不同数据类型的参数
        LinkedMultiValueMap body=new LinkedMultiValueMap();
        body.add("price",price);
        body.add("type",type);
        body.add("uid",uid);
        
        //设置请求header 为 APPLICATION_FORM_URLENCODED
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        
        // 请求体，包括请求数据 body 和 请求头 headers
        HttpEntity httpEntity = new HttpEntity(body,headers);

        
        try {
            //使用 exchange 发送请求，以String的类型接收返回的数据
            //ps，我请求的数据，其返回是一个json
            ResponseEntity<String> strbody = restTemplate.exchange(url,HttpMethod.POST,httpEntity,String.class);
			//解析返回的数据
            JSONObject jsTemp = JSONObject.parseObject(strbody.getBody());
            System.out.println(jsonObject.toJSONString());
            return jsTemp;

        }catch (Exception e){
            System.out.println(e);
        }
        return  null;
    }
```

### 使用postman测试：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190605112907904.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM2MzAzODYy,size_16,color_FFFFFF,t_70)

## 引用

[Spring框架中发送http请求--RestTemplate](https://blog.csdn.net/u014430366/article/details/65633679)



# end

