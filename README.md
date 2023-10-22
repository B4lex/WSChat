# WSChat

Real-time chatting application using the Django Channels for WebSocket connection.

There are three main components of the application
- Backend: provides WS connection endpoint and API for authentication, profile management, messages fetching, etc.
- Frontend: frontend application written in Vue.JS exposing basic UI to interact with web application
- Mobile: mobile application for iOS and Android written in React Native. At this point, it's really raw and under development

# Setting up environments
Backend (requires Docker along with Compose plugin pre-installed):

```docker compose build --no-cache```

```docker compose up -d```

Both frontend and mobile:

```npm install```

```npm run serve```
