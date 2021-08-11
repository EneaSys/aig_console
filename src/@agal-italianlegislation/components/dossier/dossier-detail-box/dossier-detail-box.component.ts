import { Component, Input, OnInit } from '@angular/core';
import { DossierDTO } from 'aig-italianlegislation';

@Component({
    selector: 'agal-dossier-detail-box',
    templateUrl: './dossier-detail-box.component.html',
    styleUrls: ['./dossier-detail-box.component.scss']
})
export class AgalDossierDetailBoxComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    dossier: DossierDTO;
}