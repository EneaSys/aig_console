import { Component, OnInit } from '@angular/core';
import { AigUserService } from '../../../_common/services/context-user.service';
import { HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Component({
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class AigUserListComponent implements OnInit {
    constructor(private userService : AigUserService) { }

    displayedColumns: string[] = ['id', 'usercode', 'groups', 'buttons'];
    dataSource: any[];

    ngOnInit(): void {
        this.loadUsers();
    }

    private loadUsers(){
        this.userService.query().subscribe(
            (res: HttpResponse<any[]>) => this.dataSource = res.body,
            (res: HttpErrorResponse) => console.log("Errore: ", res.message)
        );
    }
}
