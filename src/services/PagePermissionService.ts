import {Injectable, Router, Component} from 'zaitun';
import {AppService} from './AppService';

@Injectable('application',[AppService])
export class PagePermissionService {
    
    constructor(private service:AppService) {
      
    }
    canActivate(router: Router) {
      //return new Promise(accept=>accept(true));              
      return this.service.confirm('Confirm', 'Do you realy want to enter into this page?').then((e) => Promise.resolve(e === 'yes'));
      //return confirm('Do you realy want to enter into this page?');
    }
    canDeactivate(component: Component, router: Router) {
      //return component.canDeactivate();
      return this.service.confirm('Confirm', 'Do you realy want to leave this page?').then((e) => Promise.resolve(e === 'yes'));
      //return confirm('Do you realy want to leave this page?');
    }
  }