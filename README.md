# CivicPath AI

A guided assistant that simplifies the election process for voters.

## Problem Statement

The election process is often more complex than it needs to be. Voters struggle with fragmented information, unclear registration steps, and a lack of awareness about their specific rights. This confusion can lead to lower turnout and a sense of disconnection from the democratic process.

## Our Approach

CivicPath AI is not a chatbot. It is a guided system designed to remove the guesswork from voting. By using a step-by-step assistant, we prioritize clarity and usability, walking users through their specific journey rather than leaving them to navigate a generic chat interface.

## Key Features

- **Guided voting journey**: A clear, linear path through the election process.
- **Context-aware flow**: Information that updates based on your location and voter status.
- **Polling location assistance**: Simple tools to help you find where you need to go.
- **Accessible UI**: A minimal design built for fast loading and easy navigation.
- **Lightweight and fast**: Zero bloat, focused purely on getting users the right information.

## How It Works

The flow is simple:

1. **Details**: User enters basic info (like location or voter type).
2. **Processing**: The system identifies the specific steps required.
3. **Guidance**: The assistant shows the exact next step in the journey.

## Tech Stack

- **Frontend**: Vanilla JS, Vite, Tailwind CSS
- **Backend**: Node.js, Express
- **AI**: Google Gemini API

## Why We Built This

This project was built for **Google Developers Prompt Wars** (Virtual Hackathon). Our focus was on real-world usability—building something that solves a practical problem through simplicity rather than adding unnecessary complexity.

## Running the Project

1. **Install Dependencies**  
   Run `npm install` in the root directory.

2. **Setup Environment**  
   Create a `.env` file and add your `GEMINI_API_KEY`.

3. **Start Development**  
   Run `npm run dev` to start both the frontend and backend.

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:8080`

## Notes

- The assistant is designed to provide guidance based on current election guidelines.
- Always verify your final polling details on official government portals.
