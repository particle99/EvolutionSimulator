import { OutputNeuron } from "./outputNeurons";
import { InputNeuron } from "./inputNeurons";

interface HiddenNeuron {
    label: string,
    incoming: InputNeuron[],
    value: number, 
    weight: number
}

const hiddenNeurons: HiddenNeuron[] = [
    { label: "HN1", incoming: [], value: 1, weight: 4 },
    { label: "HN2", incoming: [], value: 0.8, weight: 3 },
    { label: "HN3", incoming: [], value: 0.6, weight: 2 },
    { label: "HN4", incoming: [], value: 0.4, weight: 1 },
    { label: "HN5", incoming: [], value: 0.2, weight: 0 }
];

export { hiddenNeurons, HiddenNeuron };