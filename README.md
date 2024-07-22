# Spaceman "Hangman" Game



## Overview
The Spaceman "Hangman" game is a simple yet engaging web-based game inspired by the classic hangman format. Players try to guess a hidden word one letter at a time while launching a spaceship by making correct guesses. Incorrect guesses result in the spaceship getting closer to "crashing". The game ends when the spaceship explodes or the word is guessed correctly and it launches.

This README will guide you through the game's purpose, how to set it up, and the available features.

## Features
- Interactive Gameplay: Players guess letters to uncover a hidden word, with visual feedback and updates on their progress.
- High Scores: Scores are saved and displayed on a leaderboard, motivating players to achieve higher scores.
- Hints: Each word comes with a hint to help players make educated guesses.
- Play Again Option: Players can easily start a new game after finishing one.

## Technology Stack
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js with Express.js
- Database: PostgreSQL
- Hosting: Heroku

## Game Play
- Start a Game: Click on "Play Again" to start a new game.
- Guess Letters: Click on the letters on the keyboard to make guesses. Correct guesses will reveal letters in the hidden word, while incorrect guesses reduce the number of attempts left.
- Hints: A hint will be provided to help you guess the word.
- Game Over: The game ends either when you guess the word or run out of attempts. Your score will be saved and displayed on the high scores leaderboard.
- End Game: Click "End Game" to save your score and return to the home page.
