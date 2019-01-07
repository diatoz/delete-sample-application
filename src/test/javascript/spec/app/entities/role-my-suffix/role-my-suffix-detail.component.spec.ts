/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DeleteTestModule } from '../../../test.module';
import { RoleMySuffixDetailComponent } from 'app/entities/role-my-suffix/role-my-suffix-detail.component';
import { RoleMySuffix } from 'app/shared/model/role-my-suffix.model';

describe('Component Tests', () => {
    describe('RoleMySuffix Management Detail Component', () => {
        let comp: RoleMySuffixDetailComponent;
        let fixture: ComponentFixture<RoleMySuffixDetailComponent>;
        const route = ({ data: of({ role: new RoleMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DeleteTestModule],
                declarations: [RoleMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(RoleMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RoleMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.role).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
