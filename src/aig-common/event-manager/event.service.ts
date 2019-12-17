import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface EsEvent {
    reason: string,
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