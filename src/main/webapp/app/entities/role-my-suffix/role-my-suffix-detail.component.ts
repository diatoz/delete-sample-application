import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRoleMySuffix } from 'app/shared/model/role-my-suffix.model';

@Component({
    selector: 'jhi-role-my-suffix-detail',
    templateUrl: './role-my-suffix-detail.component.html'
})
export class RoleMySuffixDetailComponent implements OnInit {
    role: IRoleMySuffix;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ role }) => {
            this.role = role;
        });
    }

    previousState() {
        window.history.back();
    }
}
