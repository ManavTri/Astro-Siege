# Steelhacks Project
## Astro-Siege
A space-themed hotseat multiplayer sabotage/siege game
* Play against a friend on the same screen
* Place down obstacles to hinder your opponent
* Launch your rocket
* Steer past obstacles
* Win if you get more rockets to the other planet

Hackers:
* Manav Trivedy - School: mst79@pitt.edu / Personal: manavtrivedy@gmail.com
* Colton R - School: car415@pitt.edu / Personal: rizzocolton@gmail.com
* Peter C - School: pec140@pitt.edu / Personal: cytropg@gmail.com

# Project Story
## Inspiration
We were inspired by games like Ultimate Chicken Horse where players take turns placing traps then having to run through the traps themselves. 

## What it does
Astro-Siege is a space-themed hotseat multiplayer game with two phases. During the build phase, player 2 sets up obstacles for player 1 to navigate through including blackholes and asteroids. Once complete player 1 must try to send as many ships from their planet to player 2's planet in 50 seconds. When the round ends, player 1 then completes build phase for player 2, keeping the same obstacles from the previous round(s). This cycle repeats until 15 rounds have completed or when a player has sent 50 ships to the other planet.

## How we built it
Astro-Siege is built in JavaScript using p5.js for vector mechanics and visuals.

## Challenges we ran into
All of the team were new to GitHub, so figuring out workflow was tedious. Hosting the website was also difficult as we needed to make a work-around html file that referenced our primary one as the primary one was located in our 'src' folder. We couldn't figure out how to make class inheritance work with p5.js as obstacles weren't rendering if they were a subclass. There were numerous bugs during development, especially with programming dynamic visuals for obstacles and the ship.

## Accomplishments that we're proud of
Building a functional game start to finish from the inception of the idea to a fully functional prototype. Integrating realistic yet balanced gravity mechanics.

## What we learned
We learned chiefly how to cooperate and communicate effectively in a team. We also learned more about GitHub work flow and project designing principles (i.e. how to effectively organize code for other people).

## What's next for Astro-Siege
* Particle effects for obstacles and ship.
* Sound effects.
* Settings for round time limits, max rounds, and max scores.
* More varied obstacles (mobile comets, obstacles that the ship can bounce off of)
