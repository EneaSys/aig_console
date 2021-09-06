import { Component, Input, OnInit } from '@angular/core';
import { ContextModuleDTO } from 'aig-management';

@Component({
    selector: 'agal-context-module-detail-box',
    templateUrl: './context-module-detail-box.component.html',
    styleUrls: ['./context-module-detail-box.component.scss']
})
export class AgalContextModuleDetailBoxComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    contextModule: ContextModuleDTO;
}