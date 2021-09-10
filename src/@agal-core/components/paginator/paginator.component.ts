import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'agal-paginator',
    templateUrl: './paginator.component.html',
    styleUrls: ['./paginator.component.scss']
})
export class AgalPaginatorComponent implements OnInit {
    @Input()
    totalRecords: number;

    @Input()
    pageSizeOptions: number[];

    @Input()
    initialSize: number = 30;

    @Output() paginator = new EventEmitter<any>();

    selectPageForm: FormGroup;

    constructor(
        private _formBuilder: FormBuilder,
    ) {
        this.selectPageForm = this._formBuilder.group({
            page: [1, Validators.required]
        })
    }
    ngOnInit(): void {
        this.selectSize(this.initialSize);
    }

    _page: number = 1;

    pages: number = 0;
    
    pageable: any = {
        page: 0,
        size: 30
    }

    pagination: any = {
        first: 0,
        last: 0    
    }

    ngOnChanges(changes: SimpleChanges) {
		this.calculate();
    }

    selectPageFormSubmit() {
        if (!this.selectPageForm.valid) {
            return;
        }

        this.selectPage(this.selectPageForm.value.page);
    }

    selectSize(size: any) {
        this.pageable.size = +size;
        this.selectPage(0);
    }

    private selectPage(page: number) {
        if(page == this.pageable.page+1) {
            return;
        }
        if(page == null || page < 1 || page > this.pages+1) {
            page = 1;
        }
        this.selectPageForm.controls['page'].patchValue(page);
        this.pageable.page = page-1;
        this.paginator.emit(this.pageable);
        this.calculate();
    }

    private calculate() {
        this.pages = this.totalRecords / this.pageable.size;

        this.pagination.first = this.pageable.size * this.pageable.page + 1;
        this.pagination.last = this.pagination.first - 1 + this.pageable.size;
        if(this.pagination.last > this.totalRecords) {
            this.pagination.last = this.totalRecords;
        }
    }
}
