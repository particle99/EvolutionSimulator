import { Genome, GenomeType } from "../Biology/genome";
import { Organism } from "../Biology/organism";
import { Brain } from "../NeuralNetwork/brain";
import { World } from "../World/world";

const genome: Genome = new Genome(2, 3, 2, false);

const geneticData: GenomeType = genome.getGeneticData();
const world: World = new World(100, 100, [ 1, 1 ]);
const organism: Organism = new Organism(world, genome, [ 25, 30 ], [ 1, 1 ]);