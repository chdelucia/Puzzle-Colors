import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
describe('AppComponent', () => {
  let fixture,app;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
    app.ngOnInit();
  }));

  it('should create the app', async(() => {
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app'`, async(() => {
    expect(app.title).toEqual('Game Of Colors');
  }));

  it('should be 9 elements', () => {  
    expect(app.domMatrix.length).toEqual(9);   
  });

  it(`should have 0 'moves'`, async(() => {
    expect(app.moves).toEqual(0);
  }));

  it('should count and save the color', async(() => {  
    app.onClick(2); 
    if (app.moves === 1){
      expect(app.firtItemClicked.color.join()).toEqual(app.domMatrix[2].join())
    }
    expect(app.moves).toEqual(1);
  }));

  it('should be Easy LvL', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('select').textContent).toContain('Easy');
  }));

  it('should count 2 moves', async(() => {  
    app.onClick(2); 
    app.onClick(4);
    expect(app.moves).toEqual(2);
  }));

  it('Restart game should count 0 moves', async(() => {  
    app.onClick(2); 
    app.onClick(4);
    app.restartGame();
    expect(app.moves).toEqual(0);
  }));
});

