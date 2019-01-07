import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPermMySuffix } from 'app/shared/model/perm-my-suffix.model';

@Component({
    selector: 'jhi-perm-my-suffix-detail',
    templateUrl: './perm-my-suffix-detail.component.html'
})
export class PermMySuffixDetailComponent implements OnInit {
    perm: IPermMySuffix;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ perm }) => {
            this.perm = perm;
        });
    }

    previousState() {
        window.history.back();
    }
}
