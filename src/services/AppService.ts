import { juForm } from '../components/ui/juForm';
import { VNode, div } from 'zaitun/dom';
import {Injectable} from 'zaitun';

@Injectable('application')
export class AppService {
  popup: juForm;
  private _popup_promise_resolve = null;
  private _popup_btn_name = '';
  private _confirm: boolean;
  private _popup_promise_reject;
  msg: VNode = div('message goes here');

  constructor() {

  }
  setPopup(popup: juForm) {
    this.popup = popup;
    popup.model.options.modalClose = () => {

      if (this._confirm && (this._popup_btn_name === 'no' || this._popup_btn_name !== 'yes') && typeof this._popup_promise_reject === 'function') {
        this._confirm = false;
        this._popup_promise_resolve(this._popup_btn_name);

      }
      else if (typeof this._popup_promise_resolve === 'function') {
        this._popup_promise_resolve(this._popup_btn_name);

      }
      this._popup_btn_name = '';
      this._popup_promise_reject = null;
      this._popup_promise_resolve = null;
      return true;
    }
  }
  private closeModal(btnName) {
    this._popup_btn_name = btnName;
    this.popup.modalClose();
  }
  private set(title, msg) {
    this.msg = typeof msg === 'string' ? div(msg) : msg;
    this.popup.model.options.title = title;
  }
  alert(title, msg: string | VNode) {
    this.set(title, msg);
    this.popup.model.options.buttons = [{ label: 'OK', on: { click: () => this.closeModal('ok') }, classNames: '.btn.btn-outline-success', elmSize: 'sm' }],
      this.popup.refresh();
    this.popup.showModal();
    return new Promise(accept => { this._popup_promise_resolve = accept; });
  }
  confirm(title, msg: string | VNode) {
    this._confirm = true;
    this.set(title, msg);
    this.popup.model.options.buttons = [
      { label: 'Yes', on: { click: () => this.closeModal('yes') }, classNames: '.btn.btn-outline-success', elmSize: 'sm' },
      { label: 'No', on: { click: () => this.closeModal('no') }, classNames: '.btn.btn-outline-success', elmSize: 'sm' }
    ],
      this.popup.refresh();
    this.popup.showModal();
    return new Promise((accept, reject) => {
      this._popup_promise_resolve = accept;
      this._popup_promise_reject = reject;
    });
  }
}

