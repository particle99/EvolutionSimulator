import { inputNeurons, InputNeuron } from "./inputNeurons";
import { outputNeurons, OutputNeuron } from "./outputNeurons";
import { hiddenNeurons, HiddenNeuron } from "./hiddenNeurons";
import { GenomeType } from "../Biology/genome";
import { World } from "../World/world";

function random_number_dec(start: number, end: number, df: number): number {
    const num = start + (Math.random() * (end - start));
    return parseFloat(num.toFixed(df));
}

class Brain {
    public params: GenomeType;
    public world: World;

    public inputNodes: InputNeuron[] = [];
    public hiddenNodes: HiddenNeuron[] = [];
    public outputNodes: OutputNeuron[] = [];

    constructor(params: GenomeType, world: World) {
        this.params = params;
        this.world = world;

        this.createNodes();
        this.establishConnections();
    }

    public getSums(sum: number): number {
        return 1 / (1 + Math.exp(-sum));
    }

    public softmax(nums: number[]): number[] {
        const e: number[] = nums.map(x => x = Math.exp(x));
        const sum: number = e.reduce(((x, y) => { return x + y }), 0);
        const r: number[] = e.map(x => x = x / sum);
        return r;
    }

    public getLargestValue(nums: number[]): number {
        let index: number = 0;
        let largestVal: number = 0;
        for(let i = 0; i < nums.length; i++) {
            if(nums[i] > largestVal) {
                largestVal = nums[i];
                index = i;
            }
        }

        return index;
    }

    private createNodes(): void {
        const i_n: number[] = this.params.inputNodes,
            h_n: number[] = this.params.hiddenNodes,
            o_n: number[] = this.params.outputNodes;
        
        for(let x_i = 0; x_i < i_n.length; x_i++)
            this.inputNodes.push(inputNeurons[i_n[x_i]]);
    
        for(let x_h = 0; x_h < h_n.length; x_h++)
            this.hiddenNodes.push(hiddenNeurons[h_n[x_h]]);

        for(let x_o = 0; x_o < o_n.length; x_o++) 
            this.outputNodes.push(outputNeurons[o_n[x_o]]);
    }

    private establishConnections(): void {
        //incoming connections
        for(let h = 0; h < this.hiddenNodes.length; h++) 
            for(let i = 0; i < this.inputNodes.length; i++) this.hiddenNodes[h].incoming.push(this.inputNodes[i]);

        for(let o = 0; o < this.outputNodes.length; o++)
            for(let i = 0; i < this.hiddenNodes.length; i++) this.outputNodes[o].incoming.push(this.hiddenNodes[i]);
    }

    //public generateRandomValues(range: [ number, number ]): void {
    //    const [ max, min ] = range;
    //    for(let ON = 0; ON < this.inputNodes.length; ON++)
    //        this.inputNodes[ON].value = random_number_dec(max, min, 1);
    //}

    public generateRandomWeights(range: [ number, number ]): void {
        const [ max, min ] = range;
        for(let HN = 0; HN < this.hiddenNodes.length; HN++) {
            let sum: number = 0;
            for(let i = 0; i < this.hiddenNodes[HN].incoming.length; i++) {
                this.hiddenNodes[HN].incoming[i].weight = random_number_dec(max, min, 1);

                sum += this.hiddenNodes[HN].incoming[i].value * this.hiddenNodes[HN].incoming[i].weight;
            }
            //apply activation function to create a range between -1 and 1
            this.hiddenNodes[HN].value = this.getSums(sum);
        }

        for(let ON = 0; ON < this.outputNodes.length; ON++) {
            let sum: number = 0;
            for(let i = 0; i < this.outputNodes[ON].incoming.length; i++) {
                this.outputNodes[ON].incoming[i].weight = random_number_dec(max, min, 1);

                sum += this.outputNodes[ON].incoming[i].value * this.outputNodes[ON].incoming[i].weight;
            }

            this.outputNodes[ON].value = this.getSums(sum);
        }
    }

    public generateAction(): OutputNeuron {
        const outputValues: number[] = [];

        for(let i = 0; i < this.outputNodes.length; i++) outputValues.push(this.outputNodes[i].value);

        const softmaxValues = this.softmax(outputValues);
        const outputIndex = this.getLargestValue(softmaxValues);
        return this.outputNodes[outputIndex];
    }
}

export { Brain };