
//import "babel-polyfill";
import {bootstrap} from 'zaitun';
import devTool from 'zaitun/devTool/devTool';
import rootCom from './rootCom';
import counterCom from './counter';

declare const System:any;

class AuthService{
    canActivate(router){
      console.log('canActivate:',router);
      return new Promise(accept=>accept(true));
    }
    canDeactivate(com, router){
      
      return com.canDeactivate();
    }
}

const routes=[
  {path:'/counter', component:counterCom, canActivate:AuthService},
  {path:'/counterList/:times/:msg',canDeactivate:AuthService, canActivate:AuthService,  loadComponent:()=>System.import('./counterList')},
  {path:'/todos',canActivate:AuthService, loadComponent:()=>System.import('./todos/todos')}, 
  {path:'/animation', loadComponent:()=>System.import('./Animation')}, 
  {path:'/orderAnimation',loadComponent:()=>System.import('./OrderAnimation')},
  {path:'/heroAnimation',loadComponent:()=>System.import('./Hero')}
];

bootstrap({
  containerDom:'#app',
  mainComponent:rootCom, 
  //locationStrategy:'history', 
  routes:routes,
  activePath:'/counter',
  //devTool:devTool
});

