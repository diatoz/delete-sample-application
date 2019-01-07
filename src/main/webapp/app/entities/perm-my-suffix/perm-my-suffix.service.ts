import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPermMySuffix } from 'app/shared/model/perm-my-suffix.model';

type EntityResponseType = HttpResponse<IPermMySuffix>;
type EntityArrayResponseType = HttpResponse<IPermMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class PermMySuffixService {
    public resourceUrl = SERVER_API_URL + 'api/perms';

    constructor(protected http: HttpClient) {}

    create(perm: IPermMySuffix): Observable<EntityResponseType> {
        return this.http.post<IPermMySuffix>(this.resourceUrl, perm, { observe: 'response' });
    }

    update(perm: IPermMySuffix): Observable<EntityResponseType> {
        return this.http.put<IPermMySuffix>(this.resourceUrl, perm, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IPermMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPermMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
