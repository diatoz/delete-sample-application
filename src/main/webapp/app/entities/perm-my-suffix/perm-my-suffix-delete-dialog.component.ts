import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPermMySuffix } from 'app/shared/model/perm-my-suffix.model';
import { PermMySuffixService } from './perm-my-suffix.service';

@Component({
    selector: 'jhi-perm-my-suffix-delete-dialog',
    templateUrl: './perm-my-suffix-delete-dialog.component.html'
})
export class PermMySuffixDeleteDialogComponent {
    perm: IPermMySuffix;

    constructor(protected permService: PermMySuffixService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.permService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'permListModification',
                content: 'Deleted an perm'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-perm-my-suffix-delete-popup',
    template: ''
})
export class PermMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ perm }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PermMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.perm = perm;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
