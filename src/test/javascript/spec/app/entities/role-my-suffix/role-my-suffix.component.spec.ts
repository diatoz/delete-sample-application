/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DeleteTestModule } from '../../../test.module';
import { RoleMySuffixComponent } from 'app/entities/role-my-suffix/role-my-suffix.component';
import { RoleMySuffixService } from 'app/entities/role-my-suffix/role-my-suffix.service';
import { RoleMySuffix } from 'app/shared/model/role-my-suffix.model';

describe('Component Tests', () => {
    describe('RoleMySuffix Management Component', () => {
        let comp: RoleMySuffixComponent;
        let fixture: ComponentFixture<RoleMySuffixComponent>;
        let service: RoleMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DeleteTestModule],
                declarations: [RoleMySuffixComponent],
                providers: []
            })
                .overrideTemplate(RoleMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(RoleMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RoleMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new RoleMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.roles[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
