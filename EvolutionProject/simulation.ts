import { World } from "./World/world";
import { Genome, GenomeType } from "./Biology/genome";
import { Organism } from "./Biology/organism";

import { WebSocketServer } from "ws";

class Simulation {
    public world: World;
    public populationSize: number;
    public worldSize: [ number, number ];
    public cellSize: [ number, number ];

    public server: WebSocketServer;
    public socket: any;

    public brainShape: [ number, number, number ];

    public population: Organism[] = [];

    public simulationSpeed: number;
    public simulationInterval: any;

    public totalSurvived: number = 0;
    public oldPopulation: number = 0;

    public maxPopulationSize: number = 150;

    public generation: number;
    public ticksPerGeneration: number;
    public currentTick: number;

    constructor(port: number, populationSize: number, worldSize: [ number, number ], cellSize: [ number, number ], brainShape: [ number, number, number ], FPS: number = 30) {
        this.populationSize = populationSize;
        this.worldSize = worldSize;
        this.cellSize = cellSize;

        this.world = new World(this.worldSize[0], this.worldSize[1], this.cellSize);

        this.server = new WebSocketServer({ port: port });

        this.brainShape = brainShape;

        this.currentTick = 0;
        this.generation = 0;
        this.ticksPerGeneration = 75;

        this.simulationSpeed = 1000 / FPS;

        this.handleEvents();

        this.createPool();
        //this.runSimulation();
    }

    public handleEvents(): void {
        this.server.on("connection", this.onConnection.bind(this));
        this.server.on("error", this.onError.bind(this));
    }

    public onConnection(ws: WebSocket, req: any): void {
        this.socket = ws;

        setTimeout(() => {
            this.runSimulation();
        }, 1000);
    }

    public onError(): void {}

    public sendData(): void {
        const toBeSent: object[] = [];

        this.population.forEach(organism => {
            toBeSent.push({
                x: organism.position[0],
                y: organism.position[1],
                color: organism.getColor()
            })
        })

        this.socket.send(JSON.stringify(toBeSent));
    };

    public createPool(): void {
        for(let i = 0; i < this.populationSize; i++) {
            const genome: Genome = new Genome(this.brainShape[0], this.brainShape[1], this.brainShape[1], false);
            const position: [ number, number ] = [ Math.floor(Math.random() * this.worldSize[0]), Math.floor(Math.random() * this.worldSize[1])]
            this.population.push(new Organism(this.world, genome, position, this.cellSize));
        }
    }

    public getPopulationReproductionPercentage(): number {
        const popSize: number = this.oldPopulation;

        const percentageReproduced: number = (this.totalSurvived / popSize) * 100;
        return percentageReproduced;
    }

    public checkForNaturalSelection(): void {
        if(this.currentTick == this.ticksPerGeneration) {
            let offspring: any[] = [];
            let totalReproduced: number = 0;

            for(const index in this.population) {
                const organism: Organism = this.population[index];
                if(organism.position[1] >= this.worldSize[1] / 2) {
                    organism.reproduce();

                    offspring.length < this.maxPopulationSize ? offspring.push(organism.offspring[0], organism.offspring[1]) : 0;

                    totalReproduced++;
                } else {
                    organism.canReproduce = false;
                }
            }

            this.oldPopulation = this.populationSize;
            this.population = offspring;
            this.populationSize = this.population.length;
            this.totalSurvived = totalReproduced;

            console.log(`Generation ${this.generation}, percentage of population reproduced: ${this.getPopulationReproductionPercentage()}%, new population size: ${this.population.length}`);

            this.currentTick = 0;
            this.generation++;
        }
    }

    public tick(): void {
        this.currentTick += 1;
        for(let index = 0; index < this.population.length; index++) {
            const organism: Organism = this.population[index];
            //complete an action
            organism.completeAction();
            //check against natural selection
            this.checkForNaturalSelection();
            //send data to draw 
            this.sendData();
        }
    }

    public runSimulation(): void {
        this.simulationInterval = setInterval(() => {
            this.tick();
        }, this.simulationSpeed);
    }

    public stopSimulation(): void {
        clearInterval(this.simulationInterval);
    }
}

export { Simulation };