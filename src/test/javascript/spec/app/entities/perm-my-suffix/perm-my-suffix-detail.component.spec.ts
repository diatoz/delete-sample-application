/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DeleteTestModule } from '../../../test.module';
import { PermMySuffixDetailComponent } from 'app/entities/perm-my-suffix/perm-my-suffix-detail.component';
import { PermMySuffix } from 'app/shared/model/perm-my-suffix.model';

describe('Component Tests', () => {
    describe('PermMySuffix Management Detail Component', () => {
        let comp: PermMySuffixDetailComponent;
        let fixture: ComponentFixture<PermMySuffixDetailComponent>;
        const route = ({ data: of({ perm: new PermMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DeleteTestModule],
                declarations: [PermMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PermMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PermMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.perm).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
