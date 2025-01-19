import { Organism } from "../Biology/organism";

interface Cell {
    size: number[], //w, h
    position: number[], //x, y
    occupied: boolean,
    occupant?: Organism, //null unless occupied is true
    adjacentCells: any
}

class World {
    public width: number;
    public height: number;

    public cells: any[] = [];
    public cellSize: [ number, number ];

    constructor(width: number, height: number, cellSize: [ number, number ]) {
        this.width = width;
        this.height = height;
        
        this.cellSize = cellSize;

        this.createCells();
    }

    public createCells(): void {
        //create the cells
        for(let column = 0; column < this.width; column++) {
            const cellRow: Cell[] = [];
            for(let row = 0; row < this.height; row++) {
                const cell: Cell = {
                    size: this.cellSize,
                    position: [ row, column ],
                    adjacentCells: [],
                    occupied: false,
                };
                cellRow.push(cell);
            }
            this.cells.push(cellRow);
        }

        //loop again to update adjacent cells
        for(let y = 0; y < this.width; y++) {
            for(let x = 0; x < this.height; x++) {
                this.cells[y][x].adjacentCells = this.calculateAdjacentCells(this.cells[y][x]);
            }
        }
    }

    protected calculateAdjacentCells(cell: Cell): Cell[] {
        const [ row, column ] = cell.position;

        //determine all adjacent cells (not diagonal)
        //account for cells on borders or corners with only 3 or 2 adjacent cells.. 
        const right: Cell = (row !== 0 && row !== this.width - 1 ? this.cells[column][row + 1] : 0);
        const left: Cell = (row !== 0 && row !== this.width - 1 ? this.cells[column][row - 1] : 0);
        const down: Cell = (column !== 0 && column !== this.height - 1 ? this.cells[column + 1][row] : 0);
        const up: Cell = (column !== 0 && column !== this.height - 1 ? this.cells[column - 1][row] : 0);

        const adjacentCells: Cell[] = [
            right, 
            left,
            down,
            up
        ];

        return adjacentCells;
    }

    public getCell(position: [ number, number ]): Cell {
        const [ row, column ] = position;

        return this.cells[column][row];
    }

    public occupyCell(position: [ number, number ], organism: Organism): boolean {
        const [ row, column ] = position;

        if(this.cells[column][row].occupied == false) {
            this.cells[column][row].occupant = organism;
            this.cells[column][row].occupied = true;

            organism.position = position;

            return true;
        } else {
            return false;
        }
    }

    public deoccupyCell(position: [ number, number ]): boolean {
        const [ row, column ] = position;

        if(this.cells[column][row].occupied == true) {
            this.cells[column][row].occupant = undefined;
            this.cells[column][row].occupied = false;

            return true;
        } else {
            return false;
        }
    }
}

export { World };