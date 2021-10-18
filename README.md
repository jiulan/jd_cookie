# 扫码时代已过去   
# 扫码时代已过去   
# 扫码时代已过去   

# jd_cookie

~~~
docker run -d --name jd_cookie -p 6789:6789 jiulan/jd_cookie:latest
~~~

## 可用参数
~~~
- UPDATE_API 修改ck接口地址
- QYWX_KEY 企业微信机器人的 webhook
- QYWX_AM 企业微信应用消息的值

#示例 docker run -d --name jd_cookie -p 6789:6789 -e QYWX_KEY=xxx -e QYWX_AM=xxx -e UPDATE_API=http://ip:5678/updateCookie jiulan/jd_cookie:latest
~~~
