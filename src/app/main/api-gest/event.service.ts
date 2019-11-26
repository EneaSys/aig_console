import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export enum EsEventType {
    REFRESH
}

export interface EsEvent {
    type: EsEventType,
    data?: any,
}

@Injectable()
export class EventService {
    private _eventReload = new Subject();
    reloadPage$ = this._eventReload.asObservable();
    reloadCurrentPage(data?: EsEvent) {
      this._eventReload.next(data);
    }
}