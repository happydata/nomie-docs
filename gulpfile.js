let gulp = require('gulp');
let s3   = require('gulp-s3');
let awsCreds = require('/Volumes/nomie-keys/aws.js');

let AWS = {
  "key":    awsCreds.access_key,
  "secret": awsCreds.secret_key,
  "bucket": "docs.nomie.io",
  "region": "us-east-1"
}

gulp.task('default', () => {
  gulp.src('./_book/**').pipe(s3(AWS));
});
