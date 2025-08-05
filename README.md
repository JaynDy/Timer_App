Timer App is a web application that allows users to create a main countdown timer along with one or more additional timers linked to it.
It’s a great tool for alternating between work and rest periods, or for managing any type of recurring task.

Technologies Used:
React + Vite
JavaScript
CSS Modules
Node.js
Express
File system (fs) for data storage
JSON-based REST API

Key Features:
Create a main timer (e.g. for a work session).
Add one or more additional timers (e.g. for breaks after work).

After the main timer finishes:
A sound alert is played (can be turned off).
A “Bee” button animation is triggered to draw attention.

Unlimited number of timers and subtimers.
Ability to edit, delete, and save timers.
View a list of all created timers and select the one you need.

Technical Details:
Timer data and the sound on/off state are stored on the server in JSON format.
The app is built with a client-server architecture.

Links:
Live demo: https://timer-app-nine-neon.vercel.app
Server repository on GitHub: Timer_App_Server

Installation & Versions:
The Timer App is available in two formats:
Web Application — available online (branch: main)
Desktop Application — installable as a local app (branch: desktopApp, built using Electron.js)

A short installation guide for the desktop version is available in the README.md on the desktopApp branch.
