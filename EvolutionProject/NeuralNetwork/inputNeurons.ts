import { HiddenNeuron } from "./hiddenNeurons";

interface InputNeuron {
    label: string,
    weight: number,
    value: number,
}

const inputNeurons: InputNeuron[] = [
    { label: "AC", weight: 3, value: 1 }, //adjacent cell(s)
    { label: "WP", weight: 3, value: 1 }, //is on west side of world
    { label: "EP", weight: 3, value: 1 }, //is on east side of world
    { label: "NP", weight: 3, value: 1 }, //is on north side of world
    { label: "SP", weight: 3, value: 1 }, //is on south side of world
    { label: "BDW", weight: 3, value: 1 }, //border distance (west)
    { label: "BDE", weight: 3, value: 1 }, //border distance (east)
    { label: "BDN", weight: 3, value: 1 }, //border distance (north)
    { label: "BDS", weight: 3, value: 1 }, //border distance (south)
];

export { inputNeurons, InputNeuron };