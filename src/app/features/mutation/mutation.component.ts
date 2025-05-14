import { Component, signal } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatButtonModule} from '@angular/material/button'; 
import { FormControl, FormsModule, Validators } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon'; 
import { ReactiveFormsModule } from '@angular/forms';
import { UpperCasePipe } from '@angular/common';
import { HighlightDirective} from '../../directives/highlight/highlight.directive'

@Component({
  selector: 'app-mutation',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
    HighlightDirective,
    UpperCasePipe
  ],
  templateUrl: './mutation.component.html',
  styleUrl: './mutation.component.scss'
})
export class MutationComponent {
  size= signal<number>(0);
  dnaSequence: FormControl<string| null> = new FormControl<string>('', { validators: [ Validators.pattern('^[ATCGatcg]+$') ]});
  dna= signal<string[]>([]);
  posSequence= signal<[number,number][]>([]);
  show=false;
  addSequence(){
    if( this.dna.length <= this.size() && this.dnaSequence.value != null){
      this.dna().push(this.dnaSequence.value);
      this.dnaSequence.setValue('');
    }
  }

  validNewPosition(x:number,y:number){
    return x>=0 && x<this.size() && y>=0 && y<this.size();
  }

  searchPositions(x:number, y:number, changeX:number, changeY:number){
    const char = this.dna()[x][y];
    const positions:[number, number][] = [[x,y]];
    for (let i = 1; i < 4; i++) {
      const nx = x + changeX * i;
      const ny = y + changeY * i;
      if (!this.validNewPosition(nx, ny) || this.dna()[nx][ny] !== char) {
        return false;
      }
      positions.push([nx,ny]);
    }
    this.posSequence.update(prev=> [...prev, ...positions ] );
    return true;
  }

  searchSequences(){
    const directions= [ [0,1], [1,0], [1,1],[1,-1]];
    let count=0;
    for (let i = 0; i < this.size(); i++){
      for (let j = 0; j < this.size(); j++) {
        for (let [dx, dy] of directions) {
          if (this.searchPositions(i, j, dx, dy)) {
            count++;
          }
        }
      }
    }
    this.show=true;
    console.log(count, this.posSequence());
  }

}
