import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitDetailsDialogComponent } from './produit-details-dialog.component';

describe('ProduitDetailsDialogComponent', () => {
  let component: ProduitDetailsDialogComponent;
  let fixture: ComponentFixture<ProduitDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProduitDetailsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProduitDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
