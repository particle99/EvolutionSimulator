import { inputNeurons, InputNeuron } from "../NeuralNetwork/inputNeurons";
import { outputNeurons, OutputNeuron } from "../NeuralNetwork/outputNeurons";
import { hiddenNeurons, HiddenNeuron } from "../NeuralNetwork/hiddenNeurons";

interface GenomeType {
    inputNodes: number[],
    hiddenNodes: number[],
    outputNodes: number[]
}

class Genome {
    public genome: GenomeType = { inputNodes: [], hiddenNodes: [], outputNodes: [] };

    public inputNeuronLength: number;
    public hiddenNeuronLength: number;
    public outputNeuronLength: number;

    public mutation: boolean = false;

    constructor(inputNeuronLength: number, hiddenNeuronLength: number, outputNeuronLength: number, mutation: boolean) {
        this.mutation = mutation;

        this.inputNeuronLength = inputNeuronLength;
        this.hiddenNeuronLength = hiddenNeuronLength;
        this.outputNeuronLength = outputNeuronLength;

        this.generateRandomGenome();
    }   

    /**
     * @function generateRandomGenome {} returns a array filled with numbers that serve as genomes to determine brain shape and connections
     */
    public generateRandomGenome(): void {
        let inputNodes: number[] = [];
        let outputNodes: number[] = [];
        let hiddenNodes: number[] = [];

        let IN = inputNeurons;
        let HN = hiddenNeurons;
        let ON = outputNeurons;

        for(let i = 0; i < this.inputNeuronLength; i++) {
            const chosenNeuron: number = Math.floor(Math.random() * IN.length);
            IN = IN.filter(x => x !== IN[chosenNeuron]);
            inputNodes.push(chosenNeuron);
        }

        for(let i = 0; i < this.outputNeuronLength; i++) {
            const chosenNeuron: number = Math.floor(Math.random() * ON.length);
            ON = ON.filter(x => x !== ON[chosenNeuron]);
            outputNodes.push(chosenNeuron)
        }

        for(let i = 0; i < this.hiddenNeuronLength; i++) {
            const chosenNeuron: number = Math.floor(Math.random() * HN.length);
            HN = HN.filter(x => x !== HN[chosenNeuron]);
            hiddenNodes.push(chosenNeuron);
        }

        this.genome.inputNodes = inputNodes;
        this.genome.hiddenNodes = hiddenNodes;
        this.genome.outputNodes = outputNodes;
    }

    public getGeneticData(): GenomeType {
        return this.genome;
    }
}

export { Genome, GenomeType };