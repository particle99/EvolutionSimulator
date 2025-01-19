import { HiddenNeuron } from "./hiddenNeurons";

interface OutputNeuron {
    label: string,
    value: number,
    incoming: HiddenNeuron[]
}

const outputNeurons: OutputNeuron[] = [
    { label: "ME", incoming: [], value: 1 }, //move east
    { label: "MW", incoming: [], value: 1 }, //move west
    { label: "MS", incoming: [], value: 1 }, //move south
    { label: "MN", incoming: [], value: 1 }, //move north
    { label: "RNG", incoming: [], value: 1 }, //random movement
    { label: "ST", incoming: [], value: 1 } //static (no movement);
];

export { outputNeurons, OutputNeuron };