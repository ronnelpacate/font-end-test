var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-ruby-sass');
var minifyCSS = require('gulp-minify-css');

var jsPaths = [
	'public/assets/bower_components/angular/angular.js', 
	'public/assets/bower_components/moment/moment.js', 
	'public/QueueApp.js',
	'public/customer/**/*.js',
	'public/add-customer/**/*.js'
];

var cssPath = 'public/assets/css/sass/**/*.scss';

//concat and minify javascript
gulp.task('scripts', function() {
    return gulp.src(jsPaths)
		.pipe(concat('application.js'))
		.pipe(gulp.dest('public/assets/js'));
});

gulp.task('styles', function() {
	return sass(cssPath, {style: 'expanded'})
		.on('error', sass.logError)
		.pipe(concat('application.min.css'))
		.pipe(minifyCSS())
		.pipe(gulp.dest('public/assets/css'));
});

gulp.task('watch', function() {
    gulp.watch(jsPaths, ['scripts']);
    gulp.watch(cssPath, ['styles']);
});

gulp.task('default', function() {
	gulp.start(['scripts'], ['styles']);
});