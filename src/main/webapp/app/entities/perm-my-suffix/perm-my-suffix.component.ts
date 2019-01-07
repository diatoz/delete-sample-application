import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPermMySuffix } from 'app/shared/model/perm-my-suffix.model';
import { AccountService } from 'app/core';
import { PermMySuffixService } from './perm-my-suffix.service';

@Component({
    selector: 'jhi-perm-my-suffix',
    templateUrl: './perm-my-suffix.component.html'
})
export class PermMySuffixComponent implements OnInit, OnDestroy {
    perms: IPermMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected permService: PermMySuffixService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.permService.query().subscribe(
            (res: HttpResponse<IPermMySuffix[]>) => {
                this.perms = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInPerms();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPermMySuffix) {
        return item.id;
    }

    registerChangeInPerms() {
        this.eventSubscriber = this.eventManager.subscribe('permListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
