/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DeleteTestModule } from '../../../test.module';
import { PermMySuffixComponent } from 'app/entities/perm-my-suffix/perm-my-suffix.component';
import { PermMySuffixService } from 'app/entities/perm-my-suffix/perm-my-suffix.service';
import { PermMySuffix } from 'app/shared/model/perm-my-suffix.model';

describe('Component Tests', () => {
    describe('PermMySuffix Management Component', () => {
        let comp: PermMySuffixComponent;
        let fixture: ComponentFixture<PermMySuffixComponent>;
        let service: PermMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DeleteTestModule],
                declarations: [PermMySuffixComponent],
                providers: []
            })
                .overrideTemplate(PermMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PermMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PermMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new PermMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.perms[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
