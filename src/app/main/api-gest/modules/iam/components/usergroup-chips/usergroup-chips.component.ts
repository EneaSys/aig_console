import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'aig-usergroup-chips',
    templateUrl: './usergroup-chips.component.html',
    styleUrls: ['./usergroup-chips.component.scss']
})
export class AigUserGroupChipsComponent implements OnInit {
    constructor() { }

    @Input()
    userGroups: any[];

    ngOnInit(): void { }
}
