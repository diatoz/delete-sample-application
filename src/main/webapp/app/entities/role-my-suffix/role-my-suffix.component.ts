import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IRoleMySuffix } from 'app/shared/model/role-my-suffix.model';
import { AccountService } from 'app/core';
import { RoleMySuffixService } from './role-my-suffix.service';

@Component({
    selector: 'jhi-role-my-suffix',
    templateUrl: './role-my-suffix.component.html'
})
export class RoleMySuffixComponent implements OnInit, OnDestroy {
    roles: IRoleMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected roleService: RoleMySuffixService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.roleService.query().subscribe(
            (res: HttpResponse<IRoleMySuffix[]>) => {
                this.roles = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInRoles();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IRoleMySuffix) {
        return item.id;
    }

    registerChangeInRoles() {
        this.eventSubscriber = this.eventManager.subscribe('roleListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
