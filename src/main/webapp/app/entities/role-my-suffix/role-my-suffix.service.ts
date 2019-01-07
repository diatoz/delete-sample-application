import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IRoleMySuffix } from 'app/shared/model/role-my-suffix.model';

type EntityResponseType = HttpResponse<IRoleMySuffix>;
type EntityArrayResponseType = HttpResponse<IRoleMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class RoleMySuffixService {
    public resourceUrl = SERVER_API_URL + 'api/roles';

    constructor(protected http: HttpClient) {}

    create(role: IRoleMySuffix): Observable<EntityResponseType> {
        return this.http.post<IRoleMySuffix>(this.resourceUrl, role, { observe: 'response' });
    }

    update(role: IRoleMySuffix): Observable<EntityResponseType> {
        return this.http.put<IRoleMySuffix>(this.resourceUrl, role, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IRoleMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IRoleMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
