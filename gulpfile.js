var gulp = require('gulp'),
		jshint = require('gulp-jshint'),
		notify = require('gulp-notify'),
		uglify = require('gulp-uglify'),
		concat = require('gulp-concat'),
		clean = require('gulp-rimraf'),
    spawn = require('child_process').spawn,
    node;

var paths = {
	libs:['public/javascripts/vendor/**/*.js',
										'public/javascripts/vendor/**/*.css',
										'**/glyphicons*'],
	css:['public/stylesheets/*.css'],
	views:'public/views/*.html',
	images:'public/img/*',
	scripts:['public/javascripts/TodoModule.js',
			'public/javascripts/directives/*.js',
			'public/javascripts/services/*.js',
			'public/javascripts/controllers/*.js',
			'public/javascripts/filters/*.js',
			'!public/javascripts/vendor/**/*.js'],
	index:'public/*.html',
	server:['*.js','routes/*','models/*','config/*']
};

if (!process.env.PRODUCTION){
	var lr;
	function notifyLiveReload(){
			console.log('notify tinylr');
			lr.changed({
				body: {
					files: ['lba']
				}
			});
	};

	(function startLiveReload(){
		lr = require('tiny-lr')();
		lr.listen(35729);
	})();
}

function startServer(){
  if (node) node.kill()
	setTimeout(function(){
		node = spawn('node', ['app.js'], {stdio: 'inherit',cwd:'./dist'})
		node.on('close', function (code) {
			if (code === 8) {
				gulp.log('Error detected, waiting for changes...');
			}
		}),2000
	});
};

gulp.task('stop-server',function() {
  if (node) node.kill();
});
gulp.task('move-libs',['clean','stop-server'], function() {
return gulp.src(paths.libs,{base:'./'})
		.pipe(gulp.dest('dist'));
});

gulp.task('move-css',['clean','stop-server'], function() {
  return gulp.src(paths.css,{base:'./'})
		.pipe(gulp.dest('dist'));
});

gulp.task('move-views', ['clean','stop-server'],function() {
  return gulp.src(paths.views,{base:'./'})
		.pipe(gulp.dest('dist'));
});

gulp.task('move-images', ['clean','stop-server'],function() {
  return gulp.src(paths.images,{base:'./'})
		.pipe(gulp.dest('dist'));
});

gulp.task('move-index',['clean','stop-server'],function(){
	return gulp.src(paths.index,{base:'./'})
		.pipe(gulp.dest('dist'));
});
gulp.task('move-server', ['clean','stop-server'],function() {
  return gulp.src(paths.server,{base:'./'})
		.pipe(gulp.dest('dist'));
});

gulp.task('scripts',['move-css','clean','stop-server'], function() {
  return gulp.src(paths.scripts,{base:'./'})
	 .pipe(concat('public/javascripts/TodoModule.js'))
    .pipe(jshint())
   .pipe(jshint.reporter('default'))
//		.pipe(uglify())
		.pipe(gulp.dest('dist'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('clean',function() {
	return gulp.src('dist',{read:false})
		.pipe(clean({force:true}));
});

gulp.task('watch',function(){
	gulp.watch(paths.css,['default']);
	gulp.watch(paths.index,['default']);
	gulp.watch(paths.scripts,['default']);
	gulp.watch(paths.views,['default']);
});

gulp.task('default',['scripts','move-libs','move-views','move-images','move-css','move-server','move-index','watch'],function(){
	startServer();
	console.log('test');
	setTimeout(function(){
	notifyLiveReload();
	},5000);
});

process.on('exit', function() {
    if (node) node.kill()
});

gulp.task('deploy',['scripts','move-libs','move-views','move-images','move-css','move-server','move-index'])

