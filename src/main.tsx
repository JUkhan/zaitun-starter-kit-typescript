/** @jsx html */

//import "babel-polyfill";
import {bootstrap, jsx} from 'zaitun';
const html=jsx.html;

import devTool from 'zaitun/devTool/devTool';
import rootCom from './rootCom';
import counterCom from './counter';

declare const System:any;

const routes=[
  {path:'/counter', component:counterCom},
  {path:'/counterList/:times/:msg', loadComponent:()=>System.import('./counterList')},
];

bootstrap({
  containerDom:'#app',
  mainComponent:rootCom,
  routes:routes,
  activePath:'/counter',
  devTool:devTool
});

