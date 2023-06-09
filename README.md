# Welbi Technical Exercise - Backend
Primary mono repo for the Welbi technical exercise project. 

## Getting Started

### Node

This project was build using Node 18. Using anything less than that may produce errors.

### Running

The project dependencies and build files have been included in the project, 
so you shouldn't have to do a yarn install or build manually, 
You should just be able to run `yarn run start` from the project root
and everything, in theory, should start up.

However, not all systems are created equal and in the event the start command fails out of the box, run the following commands from the project root:

1. `yarn install`
2. `yarn run build`
3. `yarn run start`

This project is meant to use yarn 3. If you experience issues with doing a `yarn install`, type this in the project root:

`yarn set version berry`

Then repeat the three steps.


## The backend server:

You can test if the backend is running and receiving input by opening the following link in your browser:

`http://localhost:8888/`

## The front end:

The front end client should then be accessible in your web browser here:

`http://localhost:3000/`

### UI

The front end consists of a single autocomplete component that will fetch and populate with names of all the residents.
Upon selecting a resident, the data should be fetched and displayed,

### Recommended Programs

If the resident has any hobbies, the top 3 programs with the most residents attending will be recommended.
The list of residents attending each program has been purposefully omitted.


## Tests

I have omitted the test files on purpose for this sample project because it got to the point where I needed to "finish the page I was on and turn it in", so to speak.
