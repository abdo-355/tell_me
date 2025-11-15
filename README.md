# TellMe

A fullstack app that helps the user to know what other people think about him by generating a link that he can send to anyone or post on social media then other people can send recommendations, criticism, harsh truths, ...etc. without exposing the sender's identity.

### Live Demo

[View Live Demo](https://tellme.abdodeveloper.com/)

![Screenshot 2023-03-25 051607.png](https://images.zenhubusercontent.com/641e69bba2d3b289364b33b5/9f38f23a-4d23-4bf7-b9fe-cf0a487c0f10)

## Tech Stack

**Client:** React, TailwindCSS, React Router, Socket.IO

**Server:** Node.js, Express, MongoDB, Socket.IO

**Language:** TypeScript

**Testing:** Cypress.io, Jest, React Testing Library

**Deployment:** Docker, Docker Compose

## Docker Setup

The application is fully containerized with:

- **Multi-stage builds** for optimized images
- **Private networking** for database security
- **Latest stable versions** of all components (Node 20, MongoDB 8.0, Nginx 1.27)
- **Environment-based configuration** via `.env` file

## Features

- Multiple authentication methods (email and password, optionally Google, Facebook, and GitHub)
  ![multiple authentication methods](https://images.zenhubusercontent.com/641e69bba2d3b289364b33b5/24dbd46f-09d7-4ba7-974c-b4536eb8a61e)

- Custom link generation for others to send messages to you through it
  ![link generation field](https://images.zenhubusercontent.com/641e69bba2d3b289364b33b5/7f7fbed3-9195-4e21-b45b-f804aad54825)

- Message sending page
  ![message sending page](https://images.zenhubusercontent.com/641e69bba2d3b289364b33b5/1acfef28-1637-4c73-846e-49e04dc3b908)

- Receive messages without knowing the sender identity
  ![recieved messages page](https://images.zenhubusercontent.com/641e69bba2d3b289364b33b5/a3e8046a-ff85-4d1e-b1c2-36424ca383f6)

- Real-time update whenever a new message is sent
  ![real-time message update](https://user-images.githubusercontent.com/104834523/227697055-e15200a6-0a60-4cd4-a824-f5bd4b4c5b60.gif)

- fully responsive
  ![mobile screens](https://images.zenhubusercontent.com/641e69bba2d3b289364b33b5/423a4059-f52f-4c1b-9296-fbe8ce4a7192)

## Motivation

Here there is a common practice among young adults to have a [Sarahah](https://sarahah.org/en) link in their bio and post it on some occasions. TLDR it's a platform for receiving anonymous feedback from friends. While learning programming this caught my attention and had my "I can build this!" moment.

## Usage

- **Sign Up/Login**: Create an account using email or social providers.
- **Generate Link**: Use the Link Generator to create your unique feedback URL.
- **Share**: Distribute the link on social media or directly.
- **Receive Feedback**: View incoming anonymous messages in real-time on your Messages page.

## Quick Start

Clone the project

```bash
  git clone https://github.com/abdo-355/tell_me.git
```

Go to the project directory

```bash
  cd tell_me
```

## Setup Options

### Option 1: Docker Compose (Recommended)

**Prerequisites:** Docker and Docker Compose installed

1. **Copy environment file**

   ```bash
   cp .env.example .env
   ```

2. **Update environment variables**
   Edit `.env` with your actual values:
   - `MONGODB_URI` (defaults to Docker MongoDB)
   - `SECRET_KEY` for JWT
   - `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, etc. for OAuth (optional)
   - `FACEBOOK_APP_ID`, `FACEBOOK_APP_SECRET`, etc. (optional)
   - `EXPRESS_SESSION_SECRET`
   - `RESEND_API_KEY` and `RESEND_FROM_EMAIL` for email
   - `FRONT_END` (defaults to <http://localhost:3000>)
   - `REACT_APP_SOCIAL_AUTH_ENABLED` (set to `true` to enable social auth, defaults to `false`)

3. **Start the application**

   ```bash
   docker-compose up --build
   ```

4. **Access the app**
   - Frontend: <http://localhost:3000>
   - Backend API: <http://localhost:8080>
   - Health check: <http://localhost:8080/health>

### Option 2: Manual Setup

**Prerequisites:** Node.js, MongoDB installed locally

1. **Install dependencies**

   ```bash
   cd client && npm install
   cd ../server && npm install
   ```

2. **Setup environment variables**
   Copy `server/.env.example` to `server/.env` and fill in your values
   Copy `client/.env.example` to `client/.env` and fill in your values (especially `REACT_APP_SOCIAL_AUTH_ENABLED` if enabling social auth)

3. **Start MongoDB**
   Make sure MongoDB is running locally

4. **Start services**

   ```bash
   # Terminal 1: Start server
   cd server && npm run start:prod

   # Terminal 2: Start client
   cd client && npm start
   ```

## Contributing

As this is a portfolio project, I'm not currently accepting code contributions. However, I'm open to suggestions and feedback!
