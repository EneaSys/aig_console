import { Component, Input, OnInit } from '@angular/core';
import { ContextUserDTO } from 'aig-management';

@Component({
    selector: 'agal-context-user-detail-box',
    templateUrl: './context-user-detail-box.component.html',
    styleUrls: ['./context-user-detail-box.component.scss']
})
export class AgalContextUserDetailBoxComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    contextUser: ContextUserDTO;
}