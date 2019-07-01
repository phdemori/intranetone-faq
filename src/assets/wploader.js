'use strict';
let mix = require('laravel-mix');

function IOFaq(params={}){
  let $ = this;
  let dep = {
    faq: 'vendor/agileti/iofaq/src/assets/src/',
    moment: 'node_modules/moment/'
  }

  let config = {
    optimize:false,
    sass:false,
    cb:()=>{},
  }
  
  this.compile = (IO,callback = ()=>{})=>{

    mix.styles([
      IO.src.css + 'helpers/dv-buttons.css',
      IO.dep.io.toastr + 'toastr.min.css',
      IO.src.io.css + 'toastr.css',
      dep.faq + 'faq.css',
    ], IO.dest.io.root + 'services/io-faq.min.css');

    mix.babel([
      IO.dep.io.toastr + 'toastr.min.js',
      IO.src.io.js + 'defaults/def-toastr.js',
    ], IO.dest.io.root + 'services/io-faq-babel.min.js');
    
    mix.scripts([
      dep.moment + 'min/moment.min.js',
      IO.src.io.vendors + 'moment/moment-pt-br.js'
    ], IO.dest.io.root + 'services/io-faq-mix.min.js');

    //copy separated for compatibility
    mix.babel(dep.faq + 'faq.js', IO.dest.io.root + 'services/io-faq.min.js');
    mix.babel(dep.faq + 'jquery.autocomplete.min.js', IO.dest.io.root + 'vendors/jquery.autocomplete.min.js');
    mix.babel(dep.faq + 'jquery.mask.min.js', IO.dest.io.root + 'vendors/jquery.mask.min.js');
    
    callback(IO);
  }
}


module.exports = IOFaq;
