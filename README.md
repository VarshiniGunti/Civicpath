# CivicPath AI

A simple guide to help people understand how to vote in India.

## One-line Description

A guided assistant that gives you a step-by-step path to get ready for election day.

## Problem

Voting should be simple, but the rules are spread out across many different websites and documents. Many people, especially new voters, find it hard to know exactly how to register or what to do at the polling booth. Generic chatbots often give long, confusing answers that don't help much.

## What I Built

I built CivicPath AI to make the voting journey clear and easy to follow. It is **not a chatbot** where you just have a long conversation. Instead, it’s a guided flow that gives you a tailored roadmap based on your location and voter type. It gets straight to the point.

## Tech Stack

- **Frontend:** React and Tailwind CSS
- **Backend:** Node.js and Express
- **AI Engine:** Google Gemini 1.5 Flash
- **Deployment:** Google Cloud Run

## How It Works

First, you choose your state and what kind of voter you are. The app then creates a simple 4-step path just for you. You can click through each step to find the right forms, check your ID requirements, and learn how the process works from start to finish.

## Features

- **Personalized Roadmap:** Shows you only the steps that apply to you.
- **EVM Simulator:** An interactive tool to practice using a voting machine.
- **Quick Quiz:** A simple way to check if you're ready to vote.
- **Clean UI:** A simple, soft-color design that is easy to read.

## Setup

1. **Clone the repo:** `git clone https://github.com/VarshiniGunti/Civicpath.git`
2. **Install:** Run `npm install`
3. **Environment:** Add your `GEMINI_API_KEY` to a `.env` file.
4. **Run:** Use `npm run dev` to start it locally.

## Built For

Built for the **Virtual Prompt Wars** hackathon by **Hack2Skill** and **Google for Developers**.
