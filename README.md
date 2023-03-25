# TellMe

TellMe is a fullstack app that helps the user to know what other people think about him by generating a link that he can
send to anyone or post on social media then other people can send recommendations, criticism, feelings, ...etc. without
exposing the sender Identity


![Screenshot 2023-03-25 051607.png](https://images.zenhubusercontent.com/641e69bba2d3b289364b33b5/9f38f23a-4d23-4bf7-b9fe-cf0a487c0f10)


## Tech Stack


**Client:** React, TailwindCSS, React Router, Socket.IO

**Server:** Node, Express, MongoDB, Socket.IO

**Language:** Typescript

**Testing:** Cypress.io, Jest, React Testing Library

## Features

* Multiple authentication methods (email and password, google and facbook)
![multiple authentication meathods](https://images.zenhubusercontent.com/641e69bba2d3b289364b33b5/24dbd46f-09d7-4ba7-974c-b4536eb8a61e)

* Custom link generation for others to send messages to you through it
![link generation field](https://images.zenhubusercontent.com/641e69bba2d3b289364b33b5/7f7fbed3-9195-4e21-b45b-f804aad54825)

* Message sending page
![message sending page](https://images.zenhubusercontent.com/641e69bba2d3b289364b33b5/1acfef28-1637-4c73-846e-49e04dc3b908)

* Recieve messages without knowing the sender identity
![recieved messages page](https://images.zenhubusercontent.com/641e69bba2d3b289364b33b5/a3e8046a-ff85-4d1e-b1c2-36424ca383f6)

* Real-time update whenever a new message is sent
![real-time message update](https://user-images.githubusercontent.com/104834523/227696919-a48042fc-a25d-4f6d-a7c3-c6c2d3b61f83.gif)

* fully responsive
![mobile screens](https://images.zenhubusercontent.com/641e69bba2d3b289364b33b5/423a4059-f52f-4c1b-9296-fbe8ce4a7192)


## Run Locally

Clone the project

```bash
  git clone https://github.com/abdo-355/tell_me.git
```

Go to the project directory

```bash
  cd tell_me
```

Install client and server's dependencies

```bash
  cd client
  npm i
  cd .. && cd server
  npm i
```

#### Add Environment Variables


To run this project, you will need to add the following environment variables to your .env file

for the front end:

* `REACT_APP_BACKEND` your back end url

and for the back end:
* `MONGODB_URI`
* `SECRET_KEY` for jsonwebtoken
* `GOOGLE_CLIENT_ID`
* `GOOGLE_CLIENT_SECRET`
* `GOOGLE_REDIRECT_URL`
* `FACEBOOK_APP_ID`
* `FACEBOOK_APP_SECRET`
* `FACEBOOK_REDIRECT_URL`
* `EXPRESS_SESSION_SECRET`
* `MAILING_EMAIL` your gmail
* `MAILING_PASSWORD` your app password, see [this](https://medium.com/@abdoluxor366/configure-gmail-authentication-with-nodemailer-de0e0ee0e261)
* `FRONT_END` your front end url

#### finally
run the front end and the back end server using
```bash
npm start
```
