import { Component, Input, OnInit } from '@angular/core';
import { AllegatiDTO } from 'aig-italianlegislation';

@Component({
    selector: 'agal-allegati-detail-box',
    templateUrl: './allegati-detail-box.component.html',
    styleUrls: ['./allegati-detail-box.component.scss']
})
export class AgalAllegatiDetailBoxComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    allegati: AllegatiDTO;
}