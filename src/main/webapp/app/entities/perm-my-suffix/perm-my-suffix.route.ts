import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PermMySuffix } from 'app/shared/model/perm-my-suffix.model';
import { PermMySuffixService } from './perm-my-suffix.service';
import { PermMySuffixComponent } from './perm-my-suffix.component';
import { PermMySuffixDetailComponent } from './perm-my-suffix-detail.component';
import { PermMySuffixUpdateComponent } from './perm-my-suffix-update.component';
import { PermMySuffixDeletePopupComponent } from './perm-my-suffix-delete-dialog.component';
import { IPermMySuffix } from 'app/shared/model/perm-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class PermMySuffixResolve implements Resolve<IPermMySuffix> {
    constructor(private service: PermMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PermMySuffix> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<PermMySuffix>) => response.ok),
                map((perm: HttpResponse<PermMySuffix>) => perm.body)
            );
        }
        return of(new PermMySuffix());
    }
}

export const permRoute: Routes = [
    {
        path: 'perm-my-suffix',
        component: PermMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Perms'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'perm-my-suffix/:id/view',
        component: PermMySuffixDetailComponent,
        resolve: {
            perm: PermMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Perms'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'perm-my-suffix/new',
        component: PermMySuffixUpdateComponent,
        resolve: {
            perm: PermMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Perms'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'perm-my-suffix/:id/edit',
        component: PermMySuffixUpdateComponent,
        resolve: {
            perm: PermMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Perms'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const permPopupRoute: Routes = [
    {
        path: 'perm-my-suffix/:id/delete',
        component: PermMySuffixDeletePopupComponent,
        resolve: {
            perm: PermMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Perms'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
