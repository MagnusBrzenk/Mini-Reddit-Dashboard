# Mini-Reddit Dashboard

## Project Purpose

This is a demo project for implementing responsive d3 charts within a Typescript-React-Immutable frontend architecture.

The main purpose is to explore and establish some boilerplate code for embedding d3/threeJs data visualizations within react components. The details of the product (visualizing reddit data) were chosen arbitrarilyy; reddit provides a simple and stable API, and I was vaguely curious to see how different subreddits compare in all time rankings; it's not the most exciting data set.

Another goal of this project is to compare deployment and operation of AWS Lambda vs Google Firebase Functions.

Another somewhat whimsical goal was to create an architecture called `typescript-MERliN` (Mongo-Express-React-lambda-immutable-Node), though I'm struggling to date to find a good reason to connect to mongo.

## Project Status

This project is still under development. You can see the latest demo deployed to Firebase [here](https://mini-reddit-dashboard.firebaseapp.com)

## Project RoadMap

-   Deploy first version to Firebase
-   Deploy second version to AWS Lambda
-   Data Representations
    -   Simple Versions
        -   Line Graph
        -   Histogram Tab
        -   Pie Chart Tab
        -   3D Histogram
    -   Smooth-Transition Versions

## Project Setup

### Local Development

At the moment the app has no dependencies on the provided express server so, to run locally, you only need to fire up the `webpack-dev-server` using the script command `sh _devWebapp.sh`. The browser will then open at `http://localhost:3000/`.

### Deploy to Firebase

-   TODO: describe set up in Firebase console (it's really easy)
-   TODO: describe set up of local cli tool (it's really easy)
-   Finally, run `sh _buildFirebase`

### Deploy to AWS Lambda

-   TODO: get it working first

## Project Architecture

Much of this architecture is carried over from [this demo](https://github.com/MagnusBrzenk/typescript-immutable-MERN-stack-demo).
