import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'aig-usergroup-chip',
    templateUrl: './usergroup-chips-child.component.html',
})
export class AigUserGroupChipsChildComponent implements OnInit {
    constructor() { }
    
    @Input()
    userGroups: any[];
    @Input()
    parent: string;

    groupName: string;

    ngOnInit(): void { }

    composeName(group: any) : string{
        if(this.parent != null){
            return this.parent + " > " + group.name;
        } else {
            return group.name
        }
    }
}
