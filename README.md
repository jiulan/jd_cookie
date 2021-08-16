# jd_cookie

~~~
docker run -d --name jd_cookie -p 6789:6789 jiulan/jd_cookie:latest
~~~

## 可用参数
~~~
#示例 docker run -d --name jd_cookie -p 6789:6789 -e QYWX_KEY=xxx -e QYWX_AM=xxx -e UPDATE_API=http://ip:5678/updateCookie jiulan/jd_cookie:latest
~~~

. 1. ServerChan，教程：http://sc.ftqq.com/3.version
 PUSH_KEY=""

.  2. BARK，教程（看BARK_PUSH和BARK_SOUND的说明）：https://gitee.com/lxk0301/jd_docker/blob/master/githubAction.md#%E4%B8%8B%E6%96%B9%E6%8F%90%E4%BE%9B%E4%BD%BF%E7%94%A8%E5%88%B0%E7%9A%84-secrets%E5%85%A8%E9%9B%86%E5%90%88
 BARK_PUSH=""
 BARK_SOUND=""

.  3. Telegram，如需使用，TG_BOT_TOKEN和TG_USER_ID必须同时赋值，教程：https://gitee.com/lxk0301/jd_docker/blob/master/backUp/TG_PUSH.md
 TG_BOT_TOKEN=""
 TG_USER_ID=""

.  4. 钉钉，教程（看DD_BOT_TOKEN和DD_BOT_SECRET部分）：https://gitee.com/lxk0301/jd_docker/blob/master/githubAction.md#%E4%B8%8B%E6%96%B9%E6%8F%90%E4%BE%9B%E4%BD%BF%E7%94%A8%E5%88%B0%E7%9A%84-secrets%E5%85%A8%E9%9B%86%E5%90%88
 DD_BOT_TOKEN=""
 DD_BOT_SECRET=""

.  5. iGot聚合推送，支持多方式推送，填写iGot的推送key。教程：https://wahao.github.io/Bark-MP-helper/#/
 IGOT_PUSH_KEY=""

.  6. Push Plus，微信扫码登录后一对一推送或一对多推送，参考文档：http://www.pushplus.plus
- 其中PUSH_PLUS_USER是一对多推送的“群组编码”（一对多推送下面->您的群组(如无则新建)->群组编码）注:(1、需订阅者扫描二维码 2、如果您是创建群组所属人，也需点击“查看二维码”扫描绑定，否则不能接受群组消息推送)，只填PUSH_PLUS_TOKEN默认为一对一推送
 PUSH_PLUS_TOKEN=""
 PUSH_PLUS_USER=""

.  7. 企业微信机器人消息推送 webhook 后面的 key，文档：https://work.weixin.qq.com/api/doc/90000/90136/91770
 QYWX_KEY="ed6e8703-3a38-46b4-88d3-4af3cf64257b"

.  8. 企业微信应用消息推送的值，文档：https://work.weixin.qq.com/api/doc/90000/90135/90236 
 依次填上corpid的值,corpsecret的值,touser的值,agentid,media_id的值，注意用,号隔开，例如："wwcff56746d9adwers,B-791548lnzXBE6_BWfxdf3kSTMJr9vFEPKAbh6WERQ,mingcheng,1000001,2COXgjH2UIfERF2zxrtUOKgQ9XklUqMdGSWLBoW_lSDAdafat"
 QYWX_AM=""


