/*
 * grunt-jsencrypt
 * http://www.cnblogs.com/mcmurphy
 *
 * Copyright (c) 2015 kangming
 * Licensed under the MIT license.
 */
'use strict';
module.exports = function(grunt) {
    grunt.registerMultiTask('jsencrypter', 'Script encryption', function() {
        var done = this.async();
        var options = this.options({
            banner: "",
            separator: ';'
        });
        var http = require('http'),
            qs = require('querystring'),
            encryptOptions = {
                hostname: 'tool.lu',
                port: 80,
                path: '/js/ajax.html',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.118 Safari/537.36'
                }
            },
            encryptHandle = function(data, onSucceed, onFaild, timeout) {
                var content = qs.stringify(data);
                var resultContent = "";
                var req = http.request(encryptOptions, function(res) {
                    res.setEncoding('utf8');
                    if (res.statusCode === 200) {
                        res.on('data', function(chunk) {
                            resultContent += chunk;
                        }).on('end', function(res) {
                            onSucceed(resultContent);
                            done();
                        });
                    } else {
                        onFaild("request 500");
                    }
                });
                req.on('error', function(e) {
                    onFaild(e);
                });
                req.write(content);
                req.setTimeout(timeout || 2000, function() {});
                req.end();
            };
        this.files.forEach(function(f) {
            var onEncryptSuccessHandle = function(result) {
                    var encryptCode = JSON.parse(result).text;
                    encryptCode = options.banner + encryptCode;
                    grunt.file.write(f.dest, encryptCode);
                    grunt.log.writeln('File "' + f.dest + '" created.');
                },
                onEncryptFaildHandle = function(result) {
                    grunt.file.write(f.dest, result);
                    grunt.log.writeln('File "' + f.dest + '" created.');
                };
            var src = f.src.filter(function(filepath) {
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            }).map(function(filepath) {
                return grunt.file.read(filepath);
            }).join(grunt.util.normalizelf(options.separator));
            var encryptData = {
                code: src,
                operate: 'pack'
            };
            encryptHandle(encryptData, function(result) {
                onEncryptSuccessHandle.call(this, result);
            }, function(result) {
                onEncryptFaildHandle.call(this, result);
            }, 2000);
        });
    });
};