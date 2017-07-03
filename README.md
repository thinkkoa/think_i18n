# 介绍
-----

[![npm version](https://badge.fury.io/js/think_i18n.svg)](https://badge.fury.io/js/think_i18n)
[![Dependency Status](https://david-dm.org/richenlin/think_i18n.svg)](https://david-dm.org/richenlin/think_i18n)

Internationalization and localization for ThinkKoa.

# 安装
-----

```
npm i think_i18n
```

# 使用
-----

`注意:` i18n中间件需要ThinkKoa 框架版本 >= 1.4.0

1、项目中增加中间件 middleware/i18n.js

```
module.exports = require('think_i18n');
```

2、项目中间件配置 config/middleware.js:

```
list: [...,'i18n'], //加载的中间件列表
config: { //中间件配置
    ...,
    i18n: {
        language: 'zh-cn', //默认语言设置 zh-cn en
        lang_pathname: true, //开启多语言解析 /zh-cn/home/index  自动解析为 /home/index使用中文语言
        language_path: think.app_path + '/config/lang', //多语言配置文件目录
    }
}
```

3、使用

```js
let location = think.i18n('test');
```