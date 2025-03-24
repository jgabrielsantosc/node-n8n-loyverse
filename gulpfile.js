const gulp = require('gulp');
const copy = require('gulp-copy');

gulp.task('build:icons', () => {
	return gulp
		.src('src/nodes/Loyverse/*.svg')
		.pipe(copy('dist/nodes/Loyverse', { prefix: 3 }));
}); 