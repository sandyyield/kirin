# 本项目初衷是为方便线上排查,统计,运维一些用户数据
#### 不过也可能变成啥都有的大杂烩,coding的时候尽量往拓展性方向靠
> *顺便采用一些相对激进技术*
1. 首先需要先安装craco,因为采纳了antd建议的方案
    > yarn add @craco/craco craco-less
    >但是有些机器好像dev server 老是挂
    
####  大概这么些个德行,有需要就改
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
```
/* craco.config.js */
const CracoLessPlugin = require('craco-less');
const { getThemeVariables } = require('antd/dist/theme');

module.exports = {
    plugins: [
        //配置 babel-plugin-import
        // ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }, 'antd'],
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        // modifyVars: { '@primary-color': '#1DA57A' },
                        modifyVars: getThemeVariables({
                            dark: true
                        }),
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};
```
```
/* config-overrides.js */
const { override, fixBabelImports } = require('customize-cra');

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
    }),
);
```



2. 

# 相关依赖(包括但不限于,有的可能忘记罗列了)
## 前端:
* React全家桶
* TypeScript
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


# 一些说明
> 感觉review代码检查起来太费事了,加个Typescript完事了
## *1.* 路由结构

## 引入TS产生的一些问题:
  + 为当前项目引入TypeScript 
     > **yarn add --dev typescript**
  + 自己手动创建一个**tsconfig.json** 或者执行 **yarn run tsc --init**自动生成
+ 2021年5月26日 :
  - 重新安装一下ts的react-router-dom依赖即可 
  > Could not find a declaration file for module 'react-router-dom'. 'D:/kirin/kirin/node_modules/react-router-dom/index.js' implicitly has an 'any' type.     
  Try `npm i --save-dev @types/react-router-dom` if it exists or add a new declaration (.d.ts) file containing `declare module 'react-router-dom';`  TS7016
  解决: **yarn add @types/react-router-dom**
  
+ 好像类似的小问题还不少,有点麻烦
