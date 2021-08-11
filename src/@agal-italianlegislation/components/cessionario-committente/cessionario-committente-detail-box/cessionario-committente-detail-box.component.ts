import { Component, Input, OnInit } from '@angular/core';
import { CessionarioCommittenteDTO } from 'aig-italianlegislation';

@Component({
    selector: 'agal-cessionario-committente-detail-box',
    templateUrl: './cessionario-committente-detail-box.component.html',
    styleUrls: ['./cessionario-committente-detail-box.component.scss']
})
export class AgalCessionarioCommittenteDetailBoxComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    cessionarioCommittente: CessionarioCommittenteDTO;
}