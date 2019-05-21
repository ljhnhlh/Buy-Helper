package buyhelper.demo;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.UUID;

import java.util.concurrent.TimeUnit;


@RequestMapping("/Create")
@RestController
public class Create {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private StringRedisTemplate stringRedisTemplate;

    private JSONObject GetOpenId(String code) {
        //得到完整的
        //{
        // errcode,
        // errmsg,
        // openid
        // session_key
        // }
        RestTemplate restTemplate = new RestTemplate();
        String appid = "wx08dea5e778f278de&";
        String secret = "77fc034ff68fe7799e4e8723466a50d7&";
        String url = "https://api.weixin.qq.com/sns/jscode2session?appid=" + appid
                + "&secret=" + secret
                + "&js_code=" + code
                + "&grant_type=authorization_code";
        JSONObject jsonObject = new JSONObject();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON_UTF8);
        HttpEntity<String> entity = new HttpEntity<String>(headers);
        String strbody = restTemplate.exchange(url, HttpMethod.GET, entity, String.class).getBody();
        JSONObject res = JSONObject.parseObject(strbody, JSONObject.class);
        int errcode = 0;
        String errmsg = "";
        try {
            errcode = res.getInteger("errcode");
            errmsg = res.getString("errmsg");
            //若出错，则仅返回errcode
            if (errcode != 0) {
                jsonObject.put("errcode", errcode);
                jsonObject.put("errmsg", errmsg);
                return jsonObject;
            }
        } catch (Exception e) {
        }
        String openid = "";
        String session_key = "";
        try {
            openid = res.getString("openid");
            session_key = res.getString("session_key");

        } catch (Exception e) {
        }
        jsonObject.put("errcode", errcode);
        jsonObject.put("errmsg", errmsg);
        jsonObject.put("openid", openid);
        jsonObject.put("session_key", session_key);
        return jsonObject;
    }

    private int hasRegistered(String openid){
        try {
            return jdbcTemplate.queryForObject("select 1 from user where openid = ? limit 1;", new Object[]{openid}, int.class);
        } catch (Exception e) {
            return 0;
        }
    }
    private String getOpenidFromSession(String sessionId){
        String openid = "";
        try {
            String key =  stringRedisTemplate.opsForValue().get(sessionId);
            JSONObject temp = (JSONObject) JSON.parse(key);
            openid = temp.getString("openid");
        }catch (Exception e){
            System.out.println(e);
        }
        return openid;
    }
    private JSONObject setSessionId(JSONObject res) {
        JSONObject RedisSession = new JSONObject();

        //用json存储
        String openid = res.getString("openid");
        String session_key = res.getString("session_key");
        RedisSession.put("openid", openid);
        RedisSession.put("session_key", session_key);
        JSONObject time = new JSONObject();
        if (hasRegistered(openid) == 1) {
            //生成sessionId
            String SessionId = UUID.randomUUID().toString();
            //存入redis
            stringRedisTemplate.opsForValue().set(SessionId, RedisSession.toString(), 60, TimeUnit.MINUTES);

            //返回sessionId
            time.put("errcode",1);
            time.put("errmsg","Login in successfully");
            time.put("SessionId", SessionId);
            time.put("expireTime", 60);
        }else{
            time.put("errcode",0);
            time.put("errmsg","Please First Register");
        }
        return time;
    }
    @RequestMapping(method = RequestMethod.POST, value = "/Login")
    public JSONObject Login(@RequestParam("code") String code) {

        JSONObject res = GetOpenId(code);
        if (res.getInteger("errcode") != 0)
            return res;

        JSONObject session = setSessionId(res);
        return session;
    }
    @RequestMapping(value = "/User", method = RequestMethod.POST)
    public JSONObject CreateUser(@RequestParam(value = "nickName") String nickName, @RequestParam(value = "code") String code, @RequestParam(value = "avatarUrl") String avatarUrl, @RequestParam(value = "gender") String gender) {
//        code = "081HSn7U0N9ZA02TG44U0K157U0HSn7M"
        System.out.println(code);
        JSONObject res = GetOpenId(code);
        System.out.println(res);
        if (res.getInteger("errcode") != 0)
            return res;

        String openid = res.getString("openid");
//        String session_key = res.getString("session_key");
        int t = 0;
        try{
             t = jdbcTemplate.update("insert into buy_helper.user(openid,nickname,avatarUrl,gender,stars,status)values (?,?,?,?,3,0)", openid, nickName, avatarUrl, gender);
        }catch (Exception e){
            System.out.println(e);
        }

        JSONObject rest = new JSONObject();
        if (t <= 0) {
            rest.put("errcode", -1);
            rest.put("errmsg", "create user failed");
        }else{
            rest.put("errcode", t);
            rest.put("errmsg", "create user successfully");
            JSONObject session = setSessionId(res);
            rest.put("SessionId", session.getString("SessionId"));
            rest.put("expireTime", session.getInteger("expireTime"));
        }
        return rest;
    }

    @RequestMapping(value = "/Gou", method = RequestMethod.POST)
    public  JSONObject CreateGou(@RequestHeader("sessionId")String sessionId,@RequestParam("type")int type, @RequestParam("destination") String destination,@RequestParam("description")String description,@RequestParam("imageUrl") String imageUrl,@RequestParam("last_for_time")String last_for_time){
        String openid = getOpenidFromSession(sessionId);
        JSONObject res = new JSONObject();
        if(openid.length() < 10)
        {
            res.put("errcode",-1);
            res.put("errmsg","please login");
            return res;
        }
        String sql;
        if(type == 0){//0为代购，1为求购
            sql = "insert  into buy_helper.daigou(uid,destination,description,imageUrl,status,last_for_time)values (?,?,?,?,0,?)";
        }
        else {
            sql = "insert  into buy_helper.qiugou(uid,destination,description,imageUrl,status,last_for_time)values (?,?,?,?,0,?)";
        }
        int t = 0;
        try{
            t = jdbcTemplate.update(sql,openid,destination,description,imageUrl,last_for_time);
        }catch (Exception e){
            System.out.println(e);
        }

        if(t <= 0){
            res.put("errmsg","create failed");
        }
        else{
            res.put("errmsg","create successfully");
        }
        res.put("errcode",t);
        return  res;
    }
    @RequestMapping(value = "/SubGou",method = RequestMethod.POST)
    public JSONObject CreateSubGou(@RequestHeader("sessionId")String sessionId,@RequestParam("type")int type,@RequestParam("id")int id,@RequestParam("description")String description,@RequestParam("payment")String payment){
        String openid = getOpenidFromSession(sessionId);
        JSONObject res = new JSONObject();
        if(openid.length() < 10)
        {
            res.put("errcode",-1);
            res.put("errmsg","please login");
            return res;
        }
        String sql;
        if(type == 0){//0为代购，1为求购
            sql = "insert  into buy_helper.sub_daigou(uid,did,description,payment,status)values (?,?,?,?,0)";
        }
        else {
            sql = "insert  into buy_helper.sub_qiugou(uid,qid,description,payment,status)values (?,?,?,?,0)";
        }
        int t = 0;
        try{
            t = jdbcTemplate.update(sql,openid,id,description,payment);
        }catch (Exception e){
            System.out.println(e);
        }

        if(t <= 0){
            res.put("errmsg","create failed");
        }
        else{
            res.put("errmsg","create successfully");
        }
        res.put("errcode",t);
        return  res;
    }
    @RequestMapping(value = "/onShow",method = RequestMethod.GET)
    public List<sub_gou> LoadSubGou(@RequestParam("type")int type,@RequestParam("id")int id){
        return loadSubGou(type,id);
    }
    private List<sub_gou> loadSubGou(int type,int id){
        String sql;
        if(type == 0)
        {
            sql = "sid,description,payment,sub_daigou.status,avatarUrl from buy_helper.sub_daigou,buy_helper.user where did = ? and uid = openid;";
        }else {
            sql = "select sid,description,payment,sub_qiugou.status,avatarUrl from buy_helper.sub_qiugou,buy_helper.user where qid = ? and uid = openid;";
        }
        try {
            return  jdbcTemplate.query(sql,new Object[]{id},new BeanPropertyRowMapper(sub_gou.class));
        }catch (Exception e){
            System.out.println(e);
            return  null;
        }
    }

    @RequestMapping(value = "/onLoad",method = RequestMethod.GET)
    public JSONObject onLoad(@RequestParam("type")int type){
        //头像，昵称，星星，地点，描述,id

        String sql;
        int id;
        JSONObject jsonObject = new JSONObject();
        if(type == 0){
            // 获取最大的id，即最新的消息id，找出15条返回
            id = jdbcTemplate.queryForObject("SELECT COUNT(did) AS NumberOfProducts FROM daigou;", int.class);
            sql = "select did,avatarUrl,nickname,stars,destination,description,last_for_time from daigou, user where did <= ? and uid = openid order by did DESC limit 15";
        }else {
            id = jdbcTemplate.queryForObject("SELECT COUNT(did) AS NumberOfProducts FROM qiugou;", int.class);
            sql = "select did,avatarUrl,nickname,stars,destination,description,last_for_time from qiugou, user where did <= ? and uid = openid order by did DESC limit 15";
        }
        try{
            List<LoadGou> temp = jdbcTemplate.query(sql,new Object[]{id},new BeanPropertyRowMapper(LoadGou.class));
            jsonObject.put("errcode",1);
            jsonObject.put("errmsg","load successfully");
            jsonObject.put("list",temp.toString());

        }catch (Exception e){
            System.out.println(e);
            jsonObject.put("errcode",0);
            jsonObject.put("errmsg","load Failed");

        }
        return  jsonObject;
    }

    @RequestMapping(value = "downLoad",method = RequestMethod.GET)
    public JSONObject downLoad(@RequestParam("type")int type,@RequestParam("id")int id){
        String sql;

        JSONObject jsonObject = new JSONObject();
        if(type == 0){
            sql = "select did,avatarUrl,nickname,stars,destination,description,last_for_time from daigou, user where did <= ? and uid = openid order by did DESC limit 15";
        }else {
            sql = "select did,avatarUrl,nickname,stars,destination,description,last_for_time from qiugou, user where did <= ? and uid = openid order by did DESC limit 15";
        }
        try{
            List<LoadGou> temp = jdbcTemplate.query(sql,new Object[]{id},new BeanPropertyRowMapper(LoadGou.class));
            jsonObject.put("errcode",1);
            jsonObject.put("errmsg","load successfully");
            jsonObject.put("list",temp.toString());

        }catch (Exception e){
            System.out.println(e);
            jsonObject.put("errcode",0);
            jsonObject.put("errmsg","load Failed");

        }
        return  jsonObject;
    }

    @RequestMapping(value = "/detail_daigou",method= RequestMethod.GET)
    public JSONObject DetailDaigou(@RequestParam("id")int id){
        String sql = "select imageUrl,status1_image,status2_image,status from daigou where did = ?";
        JSONObject jsonObject = new JSONObject();
        try{
            List<detail_daigou> temp = jdbcTemplate.query(sql,new Object[]{id},new BeanPropertyRowMapper(detail_daigou.class));
            jsonObject.put("errcode",1);
            jsonObject.put("errmsg","create successfully");
            jsonObject.put("list",temp.toString());
        }catch (Exception e){
            jsonObject.put("errcode",0);
            jsonObject.put("errmsg","create failed");
        }
        return jsonObject;
    }
    @RequestMapping(value = "/detail_qiugou",method= RequestMethod.GET)
    public JSONObject DetailQiugou(@RequestParam("id")int id){
        String sql = "select avatarUrl,nickname,stars,imageUrl,status1_image,status2_image,status from qiugou,user where did = ? and uid2 = openid";
        JSONObject jsonObject = new JSONObject();
        try{
            List<detail_daigou> temp = jdbcTemplate.query(sql,new Object[]{id},new BeanPropertyRowMapper(detail_daigou.class));
            jsonObject.put("errcode",1);
            jsonObject.put("errmsg","create successfully");
            jsonObject.put("list",temp.toString());
        }catch (Exception e){
            jsonObject.put("errcode",0);
            jsonObject.put("errmsg","create failed");
        }
        return jsonObject;
    }

    @RequestMapping(value = "/ReceiveGou",method = RequestMethod.GET)
    public JSONObject ReceiveGou(@RequestParam("sessionId")String sessionId,@RequestParam("type")int type,@RequestParam("id")int id){
        String openid = getOpenidFromSession(sessionId);
        String sql;
        if(type == 0){
            sql = "update daigou set uid2 = ?,status = 1 where status = 0 and did = ? ";
        }else {
            sql = "update qiugou set uid2 = ?,status = 1 where status = 0 and did = ? ";
        }
        JSONObject jsonObject = new JSONObject();
        int t = 0;
        try {
            t = jdbcTemplate.update(sql,openid,id);
        }catch (Exception e){
            System.out.println(e);
        }
        if(t == 1){
            jsonObject.put("errmsg","accept suc");
        }else {
            jsonObject.put("errmsg","accept failed");
        }
        jsonObject.put("errcode",t);
        return jsonObject;
    }

    @RequestMapping(value = "/ReceiveSubGou",method = RequestMethod.GET)
    public JSONObject ReceiveSubGou(@RequestParam("sessionId")String sessionId,@RequestParam("type")int type,@RequestParam("id")int id,@RequestParam("did") int did){
//        subgou 缺了uid2，要不要补上
//        String openid = getOpenidFromSession(sessionId);
//        String sql;
//
//        if(type == 0){
//            sql = "update sub_daigou set status = 1 where status = 0 and sid = ? and daigou.  = ? and ";
//        }else {
//            sql = "update sub_qiugou set status = 1 where status = 0 and sid = ? ";
//        }
//        JSONObject jsonObject = new JSONObject();
//        int t = 0;
//        try {
//            t = jdbcTemplate.update(sql,openid,id);
//        }catch (Exception e){
//            System.out.println(e);
//        }
//        if(t == 1){
//            jsonObject.put("errmsg","accept suc");
//        }else {
//            jsonObject.put("errmsg","accept failed");
//        }
//        jsonObject.put("errcode",t);
//        return jsonObject;
    }

}
