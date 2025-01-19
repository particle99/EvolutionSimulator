import { Genome, GenomeType } from "./genome";
import { World } from "../World/world";
import { Brain } from "../NeuralNetwork/brain";

class Organism {
    public world: World;
    public genome: Genome;
    public brain: Brain;

    public position: [ number, number ];
    public size: [ number, number ];

    public offspring: Organism[] = [];
    public canReproduce: boolean = true;

    constructor(world: World, genome: Genome, position: [ number, number ], size: [ number, number ], isOffspring?: boolean, parentBrain?: Brain) {
        this.world = world;
        this.genome = genome;

        (isOffspring == true && parentBrain !== undefined ? this.brain = parentBrain : this.brain = new Brain(this.genome.getGeneticData(), this.world));

        this.position = position;
        this.size = size;

        this.setInputNeuronData();
    }

    public getColor(): [ number, number, number ] {
        const r: number = 0;
        const g: number = 0;
        const b: number = 0;

        const genome: GenomeType = this.genome.getGeneticData();

        const R: number = Math.floor((genome.inputNodes.reduce((a, b) => a + b, r) / genome.inputNodes.length)*10);
        const G: number = Math.floor((genome.hiddenNodes.reduce((a, b) => a + b, g) / genome.hiddenNodes.length)*10);
        const B: number = Math.floor((genome.outputNodes.reduce((a, b) => a + b, b) / genome.outputNodes.length)*10);

        return [ R, G, B ];
    }

    public setInputNeuronData(): void {
        this.brain.inputNodes.forEach(node => {
            switch(node.label) {
                case "AC": //return if there are adjacent cells
                    break;
                case "WP": //return if world pos is in the west
                    node.value = this.position[0] < Math.floor(this.world.width / 2) ? 1 : 0;
                    break;
                case "EP": //return if world pos is in the east
                    node.value = this.position[0] > Math.floor(this.world.width / 2) ? 1 : 0;
                    break;
                case "SP": //return if world pos is in the south
                    node.value = this.position[1] < Math.floor(this.world.height / 2) ? 1 : 0;
                    break;
                case "NP": //return if world pos is in south
                    node.value = this.position[1] > Math.floor(this.world.height / 2) ? 1 : 0;
                    break;
                case "BDW": //return position relative to west boarder
                    node.value = (this.position[0] / this.world.width);
                    break;
                case "BDE": //return position relative to east boarder
                    node.value = ((this.world.width - this.position[0]) / 100);
                    break;
                case "BDS": //return position relative to south boarder
                    node.value = (this.position[1] / this.world.height);
                    break;
                case "BDN": //return position relative to north boarder
                    node.value = ((this.world.height - this.position[1]) / 100);
                    break;
            }
        })
    }

    public movementAction(label: string): void {
        const cell = this.world.getCell(this.position);

        console.log("Chosen direction: ", label);

        switch(label) {
            case "ME": //move east
                if(cell.adjacentCells[0] !== 0 && cell.adjacentCells[0].occupied !== true) {
                    const [ x, y ] = this.position;

                    this.world.deoccupyCell(this.position);
                    this.world.occupyCell([ x + 1, y ], this);
                }

                break;
            case "MW": 
                if(cell.adjacentCells[1] !== 0 && cell.adjacentCells[1].occupied !== true) {
                    const [ x, y ] = this.position;

                    this.world.deoccupyCell(this.position);
                    this.world.occupyCell([ x - 1, y ], this);
                }

                break;
            case "MS":
                if(cell.adjacentCells[2] !== 0 && cell.adjacentCells[3].occupied !== true) {
                    const [ x, y ] = this.position;

                    this.world.deoccupyCell(this.position);
                    this.world.occupyCell([ x, y + 1 ], this);
                }

                break;
            case "MN":
                if(cell.adjacentCells[3] !== 0 && cell.adjacentCells[3].occupied !== true) {
                    const [ x, y ] = this.position;

                    this.world.deoccupyCell(this.position);
                    this.world.occupyCell([ x, y - 1 ], this);
                }
            }
    }

    public getRandomMovement(types: string[]): string {
        const index: number = Math.floor(Math.random() * types.length);
        return types[index];
    }

    public completeAction(): void {
        const action = this.brain.generateAction();

        const cell = this.world.getCell(this.position);

        if(action.label == "RNG" || action.label == "ST") {
            const movement: string = this.getRandomMovement([ "ME", "MW", "MS", "MN" ]);
            this.movementAction(movement);
        } else {
            this.movementAction(action.label);
        }
    }

    public reproduce(): void {
        const randomXOne = Math.floor(Math.random() * this.world.width);
        const randomYOne = Math.floor(Math.random() * this.world.height);

        const randomXTwo = Math.floor(Math.random() * this.world.width);
        const randomYTwo = Math.floor(Math.random() * this.world.height);

        this.offspring = [
            new Organism(this.world, this.genome, [ randomXOne, randomYOne ], this.size, true, this.brain),
            new Organism(this.world, this.genome, [ randomXTwo, randomYTwo ], this.size, true, this.brain)
        ]
    }
}

export { Organism };