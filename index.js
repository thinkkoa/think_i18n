/**
 *
 * @author     richen
 * @copyright  Copyright (c) 2017 - <richenlin(at)gmail.com>
 * @license    MIT
 * @version    17/7/3
 */
const lib = require('think_lib');
/**
 * default options
 */
const defaultOptions = {
    language: 'zh-cn', //默认语言设置 zh-cn en
    lang_pathname: true, //开启多语言解析 /zh-cn/home/index  自动解析为 /home/index使用中文语言
    language_path: think.app_path + '/i18n', //多语言配置文件目录
};

module.exports = function (options, app) {
    options = options ? lib.extend(defaultOptions, options, true) : defaultOptions;
    let koa = global.think ? (think.app || {}) : (app.koa || {});
    koa.once('appReady', () => {
        think._caches.configs.lang = new think.loader(options.language_path, {root: '', prefix: ''}) || {};
        lib.define(think, 'i18n', function(name) {
            let lang = think.config(options.language, 'lang');
            if (name === undefined) {
                return lang;
            }
            name = lib.toString(name);
            if (name.indexOf('.') > -1) {
                let keys = name.split('.');
                return lang[keys[0]] ? (lang[keys[0]][keys[1]] || '') : '';
            } else {
                return lang[name] || '';
            }
        });
    });
    return function (ctx, next) {
        if (options.lang_pathname) {
            let pathname = ctx.path.split('/');
            if (ctx.path.indexOf('/') === 0) {
                pathname.shift();
            }
            if (pathname[0] && (pathname[0] in think._caches.configs.lang)){
                options.language = pathname[0];
                pathname.shift();
                ctx.path = pathname.join('/');
            }
        }
        return next();
    };
};