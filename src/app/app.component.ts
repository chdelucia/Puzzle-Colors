import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // DOM elements
  title = 'Game Of Colors';
  domMatrix = [];
  legend = [];
  moves = 0;
  extraTableBoard = false;

  // user selected colors
  firtItemClicked;
  secondItemClicked;

  // Config Colors You can edit those color from 130 to 255
  private red = [255, 0, 0];
  private green = [0, 255, 0];
  private blue = [0, 0, 255];

  // depend on rgb will calculate the final color
  private finalColor;

  // add the colors to an array
  private colors = [this.red, this.green, this.blue];

  // Table board config
  private matrixSize = 9;
  private maxOftype = this.matrixSize / this.colors.length;


  ngOnInit() {
    this.setFinalColor();
    this.createMatrix();
    this.createLegend();
  }

  /**
   * Handler click event
   * @param position index of matrix
   */
  onClick(position): void {
    // check if box is the finalColor
    if (this.domMatrix[position].join() !== this.finalColor.join()) {
      this.saveColorClicked(position);

      if (this.firtItemClicked && this.secondItemClicked) {
        const newColor = this.sumSelectedColors();
        const isValid = this.isValid(newColor);

        if (isValid) { this.updateColors(newColor); } 
        this.deselectBoxes();
      } else {
        // wait for the second color
        return
      }
    }
  }

  /** 
   * Restart the Games
   */
  restartGame():void {
    this.domMatrix = [];
    this.resetMovesCounter();
    this.deselectBoxes();
    this.createMatrix();
  }

  /**
   * Set the game Level
   * @param {String} value 
   */
  setLevel(value: string): void {
    this.matrixSize = 9 * parseInt(value);
    this.maxOftype = this.matrixSize / 3;
    this.restartGame();
    this.extraTableBoard = value !== "1"  ? true : false;
  }

  /** 
   * Creates random tableBoard Array<number[]>
   * Each color is an Array<number> [255,0,0]
  */
  private createMatrix(): void {
    const tempColors = [this.red, this.green, this.blue];
    const counterColors = [];

    for (let i = 0; i < this.matrixSize; i++) {
      const randomNumber = Math.floor(Math.random() * tempColors.length);
      const color = tempColors[randomNumber];
      if (counterColors[randomNumber]) {
        counterColors[randomNumber] += 1;
      } else {
        counterColors[randomNumber] = 1;
      }

      this.domMatrix.push(color);
      if (counterColors[randomNumber] === this.maxOftype) {
        tempColors.splice(randomNumber, 1);
        counterColors.splice(randomNumber, 1);
      }
    }
  }

  /** 
   * Creates the Legend
  */
  private createLegend(): void {

    // creates legend for the sum of primary colors
    const posibleColors = [];
    for (let i = 0; i < this.colors.length; i++) {
      for (let j = i + 1; j < this.colors.length; j++) {
        const newColor = this.colors[i].map((num, index) => num + this.colors[j][index]);
        this.legend.push({
          mainColor: this.colors[i],
          secondColor: this.colors[j],
          resultColor: newColor
        });
        posibleColors.push(newColor);
      }
    }
    // Creates legend for the sum of secondary colors
    for (let i = 0; i < this.colors.length; i++) {
      let newColor
      for (let j = 0; j < posibleColors.length; j++) {
        let isPosible = 0;
        newColor = this.colors[i].map((value, index) => {
          return value + posibleColors[j][index];
        })

        let isValid = this.isValid(newColor);
        if (isValid) {
          this.legend.push({
            mainColor: this.colors[i],
            secondColor: posibleColors[j],
            resultColor: newColor,
          });
        }
      }
    }

    this.colors = this.colors.concat(posibleColors);
  }

  /** 
   * Deselect Boxes
  */
  private deselectBoxes(): void {
    this.firtItemClicked = undefined;
    this.secondItemClicked = undefined;
  }

  /**
   * Check is the sum of both color is correct
   * @param newColor 
   */
  private isValid(newColor): boolean {
    let isValid = true;
    newColor.some(num => {
      if (num > 255) isValid = false
    });
    return isValid;
  }

  /** 
   * Restart the moves Counter
   */
  private resetMovesCounter(): void {
    this.moves = 0;
  }

  /**
   * Save color clicked on a temp variable
   * @param {number} position 
   */
  private saveColorClicked(position):void {
    if (!this.firtItemClicked) {
      this.firtItemClicked = {
        color: this.domMatrix[position],
        position: position,
      };
      this.moves++;
    } else {
      if (this.firtItemClicked.color.join() === this.domMatrix[position].join() ){
        this.deselectBoxes();
      } else {
        this.secondItemClicked = {
          color: this.domMatrix[position],
          position: position,
        };
        this.moves++;
      }
    }
  }

  private setFinalColor() {
    this.finalColor = this.colors[0].map( (item, index) => {
      return item + this.colors[1][index] + this.colors[2][index];
    })
  }

  /** 
   * Sums both colors selected by user
   */
  private sumSelectedColors(): Array<number> {
    return this.firtItemClicked.color.map((num, index) => {
      return num + this.secondItemClicked.color[index];
    });
  }

  /**
   * Update the matrix of colors
   * @param {Array<number>} newColor ie: [0,255,0]
   */
  private updateColors(newColor): void {
    this.domMatrix[this.firtItemClicked.position] = this.domMatrix[this.secondItemClicked.position] = newColor;
  }
}
