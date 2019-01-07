import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IRoleMySuffix } from 'app/shared/model/role-my-suffix.model';
import { RoleMySuffixService } from './role-my-suffix.service';
import { IPermMySuffix } from 'app/shared/model/perm-my-suffix.model';
import { PermMySuffixService } from 'app/entities/perm-my-suffix';

@Component({
    selector: 'jhi-role-my-suffix-update',
    templateUrl: './role-my-suffix-update.component.html'
})
export class RoleMySuffixUpdateComponent implements OnInit {
    role: IRoleMySuffix;
    isSaving: boolean;

    perms: IPermMySuffix[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected roleService: RoleMySuffixService,
        protected permService: PermMySuffixService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ role }) => {
            this.role = role;
        });
        this.permService.query().subscribe(
            (res: HttpResponse<IPermMySuffix[]>) => {
                this.perms = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.role.id !== undefined) {
            this.subscribeToSaveResponse(this.roleService.update(this.role));
        } else {
            this.subscribeToSaveResponse(this.roleService.create(this.role));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IRoleMySuffix>>) {
        result.subscribe((res: HttpResponse<IRoleMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackPermById(index: number, item: IPermMySuffix) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}
