# Spaceman "Hangman" Game



## Overview
The Spaceman "Hangman" Game is a web-based word-guessing game inspired by the classic "Hangman." Players attempt to guess a hidden word by selecting letters within a limited number of tries. The game features a space theme, where a spaceship image changes based on the player’s progress.

This README will guide you through the game's purpose, how it works and the available features.

## Features
- Username entry to personalize gameplay.
- Random word generation with hints to guide players.
- Virtual on-screen keyboard for letter selection.
- Real-time score updates and tracking.
- Lives system with five chances per word.
- Timer with 30 seconds per word.
- Animated spaceship that changes based on progress.
- High scores saved and displayed on the home page.

## Technology Stack
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js with Express.js
- **Database:** PostgreSQL
- **Hosting:** Heroku

## Game Play
- Enter a username to begin the game.
- Guess the hidden word by selecting letters using the on-screen keyboard.
- Each correct guess fills in the corresponding letter in the word.
- Each incorrect guess decreases your remaining lives.
- Earn or lose points based on correct or incorrect guesses.
- Complete the word before time runs out or it's game over.
- Scores are saved and the top 5 can be viewed on the home page.
