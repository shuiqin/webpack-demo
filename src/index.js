/**
 * Created by shuiqin on 2/22/18.
function component() {
  var element = document.createElement('div');

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(['Hello', 'webpack'], ' '); // https://unpkg.com/lodash@4.16.6

  return element;
}

document.body.appendChild(component());*/

/**
 * Created by shuiqin on 2/22/18.
 */
// import _ from 'lodash';  //使用全局变量
import './style.css';  //
import Cart from './cart.png'; // fileloader
import Data from './resource/data/data.xml'

// output file lazy load
import printMe from './print.js'
import { cube } from './math.js';
import webpackPrint from 'webpack-print';

import { file, parse } from './globals.js';
//var webpackPrint = require('webpack-print');
function component() {
  var element = document.createElement('div');
  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = join(['Hello', 'webpack',' 511 cubed is eauql to', cube(5)], ' '); // import by the scripts
  element.classList.add('hello');

  var myIcon = new Image();
  myIcon.src =  Cart;
  element.appendChild(myIcon);
  console.log(Data);
  console.log(Data.note.heading);

  console.log("===========111===========");
  webpackPrint();
  console.log(file);
  console.log("=========11=============");


  //创建按钮使用printMe
  var btn = document.createElement('button');
  btn.innerHTML = 'Click me and check the console!';
  // lazy load
  btn.onclick = printMe;
  btn.onclick = e => import('./print').then(module=>{
    var print = module.default;
    print();
  });
  element.appendChild(btn);
  return element;
}

document.body.appendChild(component());

/*
* Accepting the updated PrintMe module!
 VM66 0.ac9bf287ce1001238bae.hot-update.js:13
* */
if(module.hot){
  module.hot.accept('./print.js', function () {
    console.log('Accepting the updated PrintMe module!~~~');
    printMe();
  });
}

console.log('=-----------------');
if (process.env.NODE_ENV !== 'production') {  //能自动缩减react生产包容量
    console.log('Looks like we are in development mode!');
} else {
  console.log('Looks like we are in production mode!');
}


if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(registration => {
    console.log('SW registered: ', registration);
}).catch(registrationError => {
    console.log('SW registration failed: ', registrationError);
});
});
}