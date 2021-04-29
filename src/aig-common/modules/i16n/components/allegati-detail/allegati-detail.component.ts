import { Component, Input, OnInit } from '@angular/core';
import { AllegatiDTO } from 'aig-italianlegislation';


@Component({
    selector: 'aig-allegati-detail',
    templateUrl: './allegati-detail.component.html',
    styleUrls: ['./allegati-detail.component.scss']
})
export class AigAllegatiDetailComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    allegati: AllegatiDTO;

}