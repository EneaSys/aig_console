import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root'
})
export class GleCommonService {

    constructor(
        public _translateService: TranslateService,
    ) {}
}