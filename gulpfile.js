var gulp = require('gulp');
console.log('gulpfile: ', __filename);


var uglify = require('gulp-uglify');
gulp.src('wu.dialog.js')
	.pipe(uglify({
		preserveComments: 'license'
	}))
	.pipe(gulp.dest('dest'))

