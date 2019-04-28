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

