
//import "babel-polyfill";
import {bootstrap} from 'zaitun';
import devTool from 'zaitun/devTool/devTool';
import rootCom from './rootCom';
import counterCom from './counter';

declare const System:any;

const routes=[
  {path:'/counter', component:counterCom},
  {path:'/counterList/:times/:msg', loadComponent:()=>System.import('./counterList')},
  {path:'/todos', loadComponent:()=>System.import('./todos/todos')},  
];

bootstrap({
  containerDom:'#app',
  mainComponent:rootCom,
  routes:routes,
  activePath:'/counter',
  devTool:devTool
});

