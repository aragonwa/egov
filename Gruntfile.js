module.exports = function(grunt) {
  'use strict';
  var globalConfig = {
    src: 'src',
    public: 'public',
    tfs: 'tfs',
    styleguide :'public'
  };

  // 1. All configuration goes here 
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    globalConfig: globalConfig,
    less: {
      development: {
        options: {
          paths: ['<%= globalConfig.src %>/less'],
          cleancss: false,
          compress: false,
          modifyVars: {
            'fa-font-path' : '"http://netdna.bootstrapcdn.com/font-awesome/4.3.0/fonts"'
          }
        },
        files: {
          '<%= globalConfig.public %>/css/kc-theme-default.css': '<%= globalConfig.src %>/less/kc-theme-default.less',
          '<%= globalConfig.public %>/css/kc-theme-caring.css': '<%= globalConfig.src %>/less/kc-theme-caring.less',
          '<%= globalConfig.public %>/css/kc-theme-corporate.css': '<%= globalConfig.src %>/less/kc-theme-corporate.less',
          '<%= globalConfig.public %>/css/kc-theme-environment.css': '<%= globalConfig.src %>/less/kc-theme-environment.less',
          '<%= globalConfig.public %>/css/kc-print.css': '<%= globalConfig.src %>/less/print/kc-print.less',
          '<%= globalConfig.public %>/css/ie-only.css': '<%= globalConfig.src %>/less/IE-only/ie-only.less'
        }
      },
      tfs: {
        options: {
          paths: ['<%= globalConfig.src %>/src/less'],
          cleancss: false,
          compress: false,
        },
        files: {
          '<%= globalConfig.tfs%>/css/kc-theme-default.css': '../src/less/kc-theme-default.less',
          '<%= globalConfig.tfs %>/css/kc-theme-caring.css': '../src/less/kc-theme-caring.less',
          '<%= globalConfig.tfs %>/css/kc-theme-corporate.css': '../src/less/kc-theme-corporate.less',
          '<%= globalConfig.tfs %>/css/kc-theme-environment.css': '../src/less/kc-theme-environment.less',
          '<%= globalConfig.tfs %>/css/kc-print.css': '../src/less/print/kc-print.less',
          '<%= globalConfig.tfs %>/css/ie-only.css': '../src/less/IE-only/ie-only.less'
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie >= 8']
      },
      development: {
        src: '<%= globalConfig.public %>/css/*.css', // source files will be overwritten            
      },
      tfs: {
        src: '<%= globalConfig.tfs %>/css/*.css', // source files will be overwritten            
      },
    },
    concat: {
      development: {
        options: {
          stripBanners: {
            options: {},
          },
          banner: '/*\n'+
                  ' * Author: King County Web Team\n' +
                  ' * Date: <%= grunt.template.today("yyyy-mm-dd") %> \n'+
                  ' * Description: King County JS file\n'+
                  ' *\/\n',
        },
        files: {
          '<%= globalConfig.public %>/js/main.js':
          ['<%= globalConfig.src %>/js/lib/*.js',
          '<%= globalConfig.src %>/js/vendor/site-improve.js',
          '<%= globalConfig.src %>/js/vendor/fitvids.min.js',
          '<%= globalConfig.src %>/js/vendor/scrollToFixed.min.js'],
        },
      },
      tfs: {
        options: {
          data: {
            debug: false,
          },
          banner: '/*\n'+
                  ' * Author: King County Web Team\n' +
                  ' * Date: <%= grunt.template.today("yyyy-mm-dd") %> \n'+
                  ' * Description: King County JS file\n'+
                  ' *\/\n',
        },
        files: {
          '<%= globalConfig.tfs %>/js/main.js':
          ['<%= globalConfig.src %>/js/lib/*.js',
          '<%= globalConfig.src %>/js/vendor/site-improve.js',
          '<%= globalConfig.src %>/js/vendor/fitvids.min.js',
          '<%= globalConfig.src %>/js/vendor/scrollToFixed.min.js'],
        },
      },
    },
    replace:{
      development: {
        src: '<%= globalConfig.public %>/js/main.js',
        overwrite: true,
        replacements: [{
          from: '!{httpPrefix}',
          to: 'http:'
        }]
      },
      tfs: {
        src: '<%= globalConfig.tfs %>/js/main.js',
        overwrite: true,
        replacements: [{
          from: '!{httpPrefix}',
          to: ''
        }]
      },
    },
    jshint: {
      development: {
        options: {
          curly: true,
          eqeqeq: true,
          eqnull: true,
          browser: true,
          quotmark: 'single',
          undef: true,
          unused: true,
          trailing: true,
          globals: {
            jQuery: true,
            $:false,
            Modernizer:false
          },
        },
        files : {
          src: ['<%= globalConfig.public %>/js/main.js']
        }
      },
      spec: {
        options: {
          curly: true,
          eqeqeq: true,
          eqnull: true,
          browser: true,
          quotmark: 'single',
          undef: true,
          unused: true,
          trailing: true,
          globals: {
            jQuery: true,
            $:false,
            Modernizer:false
          },
        },
        files : {
          src: ['<%= globalConfig.src %>/js/lib/onload/onload-lib/onload.js']
        }
      },
    },
    uglify: {
      options: {
        banner: '/*\n'+
                ' * Author: King County Web Team\n' +
                ' * Date: <%= grunt.template.today("yyyy-mm-dd") %> \n'+
                ' * Description: King County JS file\n'+
                ' *\/\n'
      },
      development: {
        files: {
          '<%= globalConfig.public %>/js/main.js': ['<%= globalConfig.public %>/js/main.js']
        }
      },
      tfs: {
        files: {
          '<%= globalConfig.tfs %>/js/main.js': ['<%= globalConfig.src %>/js/main.js']
        }
      }
    },
    coffee: {
      dev: {
        options: {
          bare: true
        },
        files: {
          '<%= globalConfig.src %>/js/test.js': '<%= globalConfig.src %>/coffee/test.coffee', // 1:1 compile
        }
      }
    },
    copy: {
      'dev-js':{
        files: [{
          src: '<%= globalConfig.src %>/js/vendor/kc-analytics.js',
          dest: '<%= globalConfig.public %>/js/vendor/kc-analytics.js'
        },
        {
          src: '<%= globalConfig.src %>/js/vendor/modernizr-latest.js',
          dest: '<%= globalConfig.public %>/js/vendor/modernizr-latest.js'
        }]
      },
      'tfs-js':{
        files: [{
          src: '<%= globalConfig.src %>/js/vendor/kc-analytics.js',
          dest: '<%= globalConfig.tfs %>/js/vendor/kc-analytics.js'
        },
        {
          src: '<%= globalConfig.src %>/js/vendor/modernizr-latest.js',
          dest: '<%= globalConfig.tfs %>/js/vendor/modernizr-latest.js'
        }]
      },
      'dev': {
        src: '<%= globalConfig.src %>/js/main.js',
        dest: '<%= globalConfig.public %>/js/main.js'
      },
    },
    jade: {
      development: {
        options: {
          pretty: true,
          data: {
            debug: false,
            rootPrefix: '',
            httpPrefix: 'http:'
          }
        },
        files: [{
          cwd: '<%= globalConfig.src %>/jade',
          src: '*.jade',
          dest:'<%= globalConfig.public %>/',
          expand: true,
          ext:'.html'
        }]
      },
      tfs: {
        options: {
          pretty: true,
          data: {
            debug: false,
            rootPrefix: '/',
            httpPrefix: ''
          }
        },
        files: [{
          cwd: '<%= globalConfig.src %>/jade',
          src: '*.jade',
          dest:'<%= globalConfig.tfs %>/',
          expand: true,
          ext:'.html',
        }]
      },
      styleguide: {
        options: {
          pretty: true,
          data: {
            debug: false,
            rootPrefix: '../public/',
            httpPrefix: 'http:'
          }
        },
        files: [{
          cwd: '<%= globalConfig.src %>/jade/styleguide',
          src: ['*.jade', '!styleguide-base.jade'],
          dest:'../styleguide/',
          expand: true,
          ext:'.html',
        }]
      },
      spec: {
        options: {
          pretty: true,
          data: {
            debug: false,
            rootPrefix: '',
            httpPrefix: 'http:'
          }
        },
        files: {
          '<%= globalConfig.public %>/jumbotron.html': '<%= globalConfig.src %>/jade/jumbotron.jade'
        }
      }
    },
    clean: {
      development: {
        options: {
          force: true
        },
        src: ['<%= globalConfig.public %>/*.html', '!<%= globalConfig.public %>/index.html']
      },
    },
    'ftp-deploy': {
      build: {
        auth: {
          host: 'webupload2.kingcounty.gov',
          port: 21,
          authKey: 'key1'
        },
        src: ['<%= globalConfig.public %>/' ],
        dest: 'kcproto/bs3/',
        exclusions: ['<%= globalConfig.public %>/html','']
      }
    },
    watch: {
      styles: {
        files: ['<%= globalConfig.src %>/less/*'],
        tasks: ['less'],
        options: {
          cleancss: true
        }
      },
      scripts:{
        files: ['<%= globalConfig.src %>/js/*'],
        tasks:['scripts']
      },
      jade: {
        files: ['<%= globalConfig.src %>/jade/*'],
        tasks: ['jade'],
        options: {
          pretty: true,
          data: {
            debug: false,
          }
        }
      },
      spec: {
        files: ['<%= globalConfig.src %>/jade/jumbotron.jade'],
        tasks: ['jade:spec']
      }
    },
    connect: {
      server: {
        options: {
          useAvailablePort: true,
          base: '<%= globalConfig.tfs% >',
          keepalive: true
        }
      }
    },
    qunit: {
      all: ['test/**/*.html']
    }
  });

  // 3. Where we tell Grunt we plan to use this plug-in.
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-ftp-deploy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-newer');


  // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
  grunt.registerTask('default', ['build', 'watch']);
  grunt.registerTask(
    'html',
    'Build html files from jade',
    ['jade:development', 'jade:styleguide']
  );
  grunt.registerTask(
    'scripts',
    'Concats and minifies files',
    ['concat:development', 'replace:development', 'copy:dev-js']//,'uglify'
  );
  grunt.registerTask(
    'scripts-tfs',
    'Concats and minifies files',
    ['concat:tfs', 'replace:tfs', 'copy:tfs-js']//,'uglify'
  );
  grunt.registerTask(
    'styles',
    'Compiles the stylesheets',
    [ 'less:development', 'autoprefixer:development']
  );
  grunt.registerTask(
    'styles-tfs',
    'Compiles the stylesheets for tfs',
    [ 'less:tfs', 'autoprefixer:tfs']
  );
  grunt.registerTask(
    'build',
    'Compiles all of the assets into to the build directory.',
    ['less:development', 'scripts', 'jade' ]
  );
  grunt.registerTask(
    'tfs',
    'Build html files from jade',
    ['jade:tfs','styles-tfs', 'scripts-tfs']
  );
  grunt.registerTask(
    'development',
    'Compiles all of the assets into to the build directory.',
    ['clean', 'styles', 'scripts', 'jade:development']
  );
  grunt.registerTask(
    'deploy',
    'Compiles all of the assets into to the build directory.',
    ['clean', 'styles', 'scripts', 'jade:development', 'ftp-deploy']
  );
};