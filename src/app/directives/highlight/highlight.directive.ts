import { Directive, ElementRef, inject, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {
  private el = inject(ElementRef);
  @Input() appHighlight:[number,number][] = [];
  @Input() posX:number = 0;
  @Input() posY:number = 0;
  constructor() { 
    
  }

  ngOnChanges(){
    if(this.appHighlight.find((x)=> {
      
      return x[0] === this.posX && x[1]=== this.posY
    })){
      this.el.nativeElement.style.backgroundColor = 'yellow';
    }
   
  }

}
