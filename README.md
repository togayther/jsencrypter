## jsencrypter
A npm package to encrypt your javascript code and reduce your file size.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install jsencrypter --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('jsencrypter');
```

## The "jsencrypter" task

### Overview
In your project's Gruntfile, add a section named `jsencrypter` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  jsencrypter: {
    main: {
      options: {
        // Task-specific options go here.
      },
      your_target: {
        // Target-specific file lists and/or options go here.
      },
    }
  },
});
```

### Options

#### options.separator
Type: `String`
Default value: `';'`

A string value that is used to do something with whatever.

#### options.banner
Type: `String`
Default value: `''`

A string value that is used to do something else with whatever else.

### Usage Examples

#### Default Options

```js
grunt.initConfig({
  jsencrypter: {
    main:{
      options: {},
      files: {
        'js/main.encrypt.js': ['js/main.min.js']
      }
    }
  }
});
```

#### Custom Options

```js
grunt.initConfig({
  jsencrypter: {
    main:{
      options: {
        separator: ';',
        banner: '/*your banner text*/\n',
      },
      files: {
        'js/main.encrypt.js': ['js/main.min.js']
      }
    }
  }
});
```

or

```js
grunt.initConfig({
  jsencrypter: {
    main:{
      options: {
        separator: ';',
        banner: '/*your banner text*/\n',
      },
      src: ['js/main.min.js'],
      dest : 'js/main.encrypt.js'
    }
  }
});
```

## Result

![](http://123.56.135.166/resource/img/jsencrypter.png)

