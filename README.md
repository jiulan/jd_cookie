# jd_cookie

~~~
docker build -t [image_name]:[version] .
~~~

#容器运行
~~~
#docker run -d --name jd_cookie -p 6789:6789 -e QYWX_KEY={QYWX_KEY} -e QYWX_AM={QYWX_AM} -e UPDATE_API={UPDATE_API} echowxsy/jd_cookie
# UPDATE_API=http://ip:5678/updateCookie

~~~
