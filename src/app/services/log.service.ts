import {Injectable} from '@angular/core';
import {Log} from "../models/log";
import {BehaviorSubject, Observable, of} from 'rxjs/index';

/*import{BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from "rxjs/internal/Observable";
import{of} from 'rxjs'*/

@Injectable({
  providedIn: 'root'
})
export class LogService {

  logs: Log[];

  private logSource = new BehaviorSubject<Log>({id: null, text: null, date: null});

  private stateSource = new BehaviorSubject<boolean>(true);

  stateClear = this.stateSource.asObservable();

  selectedLog = this.logSource.asObservable();

  constructor() {
    /*this.logs = [
      {id: '1', text: 'Generated components', date: new Date('12/26/2017 12:54:23')},
      {id: '2', text: 'Added Bootstrap', date: new Date('12/27/2017 09:54:23')},
      {id: '3', text: 'Added logs component', date: new Date('12/28/2017 12:00:23')},
    ]*/

    this.logs = [];
  }

  getLogs(): Observable<Log[]> {

    if (localStorage.getItem('logs') === null) {
      this.logs = [];
    } else {
      this.logs = JSON.parse(localStorage.getItem('logs'));
    }
    return of(this.logs.sort((a, b) => {
      return b.date = a.date;
    }));
  }

  setFormLof(log: Log) {
    // next function permette di lanciare un evento che tutti gli altri oggetti possono leggere
    this.logSource.next(log);
  }

  addLog(log: Log) {
    //Add new items to the beginning of an array
    this.logs.unshift(log);

    //Update to local storage
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  updateLog(log: Log) {
    this.logs.forEach((cur, index) => {
      if (log.id == cur.id) {
        this.logs.splice(index, 1);
      }
    });
    this.logs.unshift(log);
  }

  deleteLog(log: Log) {
    this.logs.forEach((cur, index) => {
      if (log.id == cur.id) {
        this.logs.splice(index, 1);
      }
    });

    //Delete local storage
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  clearState() {
    this.stateSource.next(true);
  }


}
