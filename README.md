# 本项目主要是为方便一下提升线上项目维护效率
    顺便采用一些相对激进技术
1. 首先需要先安装craco,因为采纳了antd建议的方案
    > yarn add @craco/craco craco-less
    >但是有些机器好像dev server 老是挂
    
####  如果craco在某些机器上老是挂掉,也可以不用
    ```
    /* package.json */
    "scripts": {
       <!-- "start": "react-scripts start",
       "build": "react-scripts build",
       "test": "react-scripts test", -->
       "start": "craco start",
       "build": "craco build",
       "test": "craco test",
    }
  },
    ```
2. 

# 相关依赖(包括但不限于,有的可能忘记罗列了)
## 前端:
* React全家桶
>   react-router-dom,react-redux
* redux
>   redux,react-redux,redux-thunk
* axios + jsonp + fetch
* antd
* echarts
* react-draft-wysiwyg

### **以下项目可以去我的其他repository查看,目前就不放在这里**
## 前台:
    1.基于Node + express,Mongodb

## 后台:
    1. 基于.net6的微服务体系,C#的语法比较贴近ES6,有点简直一摸一样
+ Consul
+ Ocelot
+ polly
+ IdentityServer4
+ SkyWalking
+ Redis


#### 稍微记录一些特殊问题
 >   *Failed to connect to 127.0.0.1 port 1081: Connection refused*


# 项目结构
## *1.* 路由


