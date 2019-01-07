import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { RoleMySuffix } from 'app/shared/model/role-my-suffix.model';
import { RoleMySuffixService } from './role-my-suffix.service';
import { RoleMySuffixComponent } from './role-my-suffix.component';
import { RoleMySuffixDetailComponent } from './role-my-suffix-detail.component';
import { RoleMySuffixUpdateComponent } from './role-my-suffix-update.component';
import { RoleMySuffixDeletePopupComponent } from './role-my-suffix-delete-dialog.component';
import { IRoleMySuffix } from 'app/shared/model/role-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class RoleMySuffixResolve implements Resolve<IRoleMySuffix> {
    constructor(private service: RoleMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RoleMySuffix> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<RoleMySuffix>) => response.ok),
                map((role: HttpResponse<RoleMySuffix>) => role.body)
            );
        }
        return of(new RoleMySuffix());
    }
}

export const roleRoute: Routes = [
    {
        path: 'role-my-suffix',
        component: RoleMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Roles'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'role-my-suffix/:id/view',
        component: RoleMySuffixDetailComponent,
        resolve: {
            role: RoleMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Roles'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'role-my-suffix/new',
        component: RoleMySuffixUpdateComponent,
        resolve: {
            role: RoleMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Roles'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'role-my-suffix/:id/edit',
        component: RoleMySuffixUpdateComponent,
        resolve: {
            role: RoleMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Roles'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const rolePopupRoute: Routes = [
    {
        path: 'role-my-suffix/:id/delete',
        component: RoleMySuffixDeletePopupComponent,
        resolve: {
            role: RoleMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Roles'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
