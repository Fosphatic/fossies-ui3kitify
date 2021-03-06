// jshint esversion: 6
// jshint node: true
/*
 * Build project assets for development and production
 *
 * Installation (Node Package Manager / Yarn):
 * > npm install --global gulp-cli
 * > yarn install
 *
 * Usage (GulpJS):
 * > gulp styles  [--production][--src={filepath/filename.scss} [--dest={path/dirname}]]
 * > gulp scripts [--production][--src={filepath/filename.js} [--dest={path/dirname}]]
 * > gulp upbuild [--production]
 * > gulp images  [--src={filepath/filename.filetypes} [--dest={path/dirname}]]
 * > gulp watch
 */
"use strict";
const pkg = require("./package.json");
const args = require('yargs').argv;
const gulp = require("gulp");
const $ = require("gulp-load-plugins")({
    pattern: ["*"],
    scope: ["devDependencies"]
});

gulp.task('default', ['styles', 'scripts']);

gulp.task('styles', function(cb){
const
    srcFiles = args.src || pkg.paths.root + pkg.paths.assets + pkg.paths.src.styles + pkg.paths.ext.styles,
    destDir = args.dest || pkg.paths.root + pkg.paths.assets + pkg.paths.dest.styles;
    $.pump([gulp.src(srcFiles),
        $.sourcemaps.init(),
        $.sass({
            errLogToConsole: true,
            outputStyle: 'nested',
            //sourceComments: true,
            sourceMapEmbed: false,
            includePaths: pkg.paths.include.sass
        }),
        $.autoprefixer({
            cascade: false,
            //map: true,
            browsers: pkg.browserslist
        }),
        $.sourcemaps.write("./", {
            includeContent: false,
            sourceRoot: pkg.paths.sourcemap.root
        }),
        gulp.dest(destDir),
        $.if(args.production, $.ignore.exclude("*.map")),
        $.size({showFiles: true, showTotal: false}),
        $.if(args.production, $.rename({suffix: ".min"})),
        $.if(args.production, $.cleanCss()),
        $.if(args.production, gulp.dest(destDir)),
        $.if(args.production, $.size({showFiles: true, showTotal: false}))
    ], cb);
});

gulp.task('scripts', function(cb){
const
    srcFiles = args.src || pkg.paths.root + pkg.paths.assets + pkg.paths.src.scripts + pkg.paths.ext.scripts,
    destDir = args.dest || pkg.paths.root + pkg.paths.assets + pkg.paths.dest.scripts;
    $.pump([gulp.src(srcFiles),
        $.include({hardFail: true, includePaths: [pkg.paths.root + pkg.paths.assets].concat(pkg.paths.include.js) }),
        gulp.dest(destDir),
        $.size({showFiles: true, showTotal: false}),
        $.if(args.production, $.rename(function (fullname) {
            fullname.extname = ".min.js";
        })),
        $.if(args.production, $.uglify({output: {comments: "/^!/"}})),
        $.if(args.production, gulp.dest(destDir)),
        $.if(args.production, $.size({showFiles: true, showTotal: false}))
    ], cb);
});

gulp.task('upbuild', ['images', 'styles', 'scripts'], function(cb){
const
    fs = require('fs'),
    srcFile = args.src || pkg.paths.root + "fields.yaml";
    if (fs.existsSync(srcFile)) {
        let obyaml = $.jsYaml.safeLoad(fs.readFileSync(srcFile, "utf8"), {json: true});
        obyaml.fields.version.default++;
        fs.writeFileSync(srcFile, $.jsYaml.dump(obyaml, {indent: 4}));
    }
});

gulp.task('images', function(cb){
const
    srcFiles = args.src || pkg.paths.root + pkg.paths.assets + pkg.paths.src.images + pkg.paths.ext.images,
    destDir = args.dest || pkg.paths.root + pkg.paths.assets + pkg.paths.dest.images;
    $.pump([gulp.src(srcFiles),
        $.imagemin([
            $.imagemin.jpegtran({progressive: true}),
            $.imagemin.optipng({optimizationLevel: 6}),
            $.imagemin.gifsicle({interlaced: true}),
            $.imagemin.svgo({plugins: [{removeViewBox: false}, {cleanupIDs: false}]}),
        ]),
        gulp.dest(destDir)
    ], cb);
});

gulp.task('watch', function(){
    gulp.watch( [pkg.paths.root + pkg.paths.assets + pkg.paths.src.styles + pkg.paths.ext.styles], ['styles'] );
    gulp.watch( [pkg.paths.root + pkg.paths.assets + pkg.paths.src.scripts + pkg.paths.ext.scripts], ['scripts'] );
});
