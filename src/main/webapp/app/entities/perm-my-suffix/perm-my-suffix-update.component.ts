import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IPermMySuffix } from 'app/shared/model/perm-my-suffix.model';
import { PermMySuffixService } from './perm-my-suffix.service';
import { IRoleMySuffix } from 'app/shared/model/role-my-suffix.model';
import { RoleMySuffixService } from 'app/entities/role-my-suffix';

@Component({
    selector: 'jhi-perm-my-suffix-update',
    templateUrl: './perm-my-suffix-update.component.html'
})
export class PermMySuffixUpdateComponent implements OnInit {
    perm: IPermMySuffix;
    isSaving: boolean;

    roles: IRoleMySuffix[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected permService: PermMySuffixService,
        protected roleService: RoleMySuffixService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ perm }) => {
            this.perm = perm;
        });
        this.roleService.query().subscribe(
            (res: HttpResponse<IRoleMySuffix[]>) => {
                this.roles = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.perm.id !== undefined) {
            this.subscribeToSaveResponse(this.permService.update(this.perm));
        } else {
            this.subscribeToSaveResponse(this.permService.create(this.perm));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IPermMySuffix>>) {
        result.subscribe((res: HttpResponse<IPermMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackRoleById(index: number, item: IRoleMySuffix) {
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
