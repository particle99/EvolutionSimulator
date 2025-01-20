# EvolutionSimulator
A simulator written in typescript to showcase the effects of natural selection and evolution.

As of right now the visualizer is really laggy and bad. It is not recommened to use it.

# How does it work?
The simulator starts with x amount of organisms, each with their own unique genome. This "genome" is simply a 2d array that configures the neuron connections and actions. Weights are randomly set at the beginning and are constant when a brain is passed onto a new generation.

The way an organism can reproduce is if it fits the natural selection criteria. In the code base, the critera is if the organism is on the western side of the world, it reproduces. All other organisms die. This causes "evolution" over time because successful organisms pass on their genome which eventually causes the pool to become homogeneous (similiar in genetic data) and all have similar actions.

# Inspiration 
Based off of this video

https://www.youtube.com/watch?v=N3tRFayqVtk
