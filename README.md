# TIBIA LOG

WORK IN PROGRESS

## Getting started

### Prerequisites

Make sure you have the following installed:

- Node.js (v14 or above)
- npm

1. Clone the repository

```
git clone https://github.com/ArkadiuszWasilewski/tibialogs
cd pokedex-app
```

2. Install dependencies

```
npm install
```

3. Start the development server

```
npm run dev
```

4. Open your browser

```
Go to http://localhost:5173/tibialogs/ to view the application.
- will be a blank site, because we need to set up env variable first

```

## Environment Variables

Create a .env file in the root directory and add the following variables:
You can edit name of existing .env.example and add your firebase authorisation variables.

```
VITE_FIREBASE_API_KEY=<your_firebase_api_key>
VITE_FIREBASE_AUTH_DOMAIN=<your_firebase_auth_domain>
VITE_FIREBASE_PROJECT_ID=<your_firebase_project_id>
VITE_FIREBASE_STORAGE_BUCKET=<your_firebase_storage_bucket>
VITE_FIREBASE_MESSAGING_SENDER_ID=<your_firebase_messaging_sender>
VITE_FIREBASE_APP_ID=<your_firebase_app_id>
```

### Steps to get your own keys:

1. Create account or log in on [Firebase](https://firebase.google.com/)
2. Go to [Console](https://console.firebase.google.com/u/0/) and create project.
3. Enter your project name, on next page you can disable google analytics (we don't need that), wait until project is created.
4. Go to Authentication tab, choose Email as your sign-in method, enable Email/Password verification then Save your settings.
5. On production version you might need to delete localhost from allowed domains (not important for test purpose)
6. Go to Add Firebase to your web app (it's in hero section, button marked as "</>"), give App nickname (eg. auth-test), and click Register app.
7. You've got your own Firebase auth variables in firebaseConfig
8. Set up those variables in your own .env file.

## Tech Stack

**Client:**

- React - A JavaScript library for building user interfaces.
- Vite - A fast frontend build tool and development server.
- Tailwind CSS - A utility-first CSS framework for rapidly building custom designs.
- Flowbite - Pre-built UI components based on Tailwind CSS.
- PokeAPI - An external API to fetch Pokémon data.

**Server:**

- Firebase - A platform for developing web applications, used here for user authentication.

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Acknowledgements

- [Flowbite](https://flowbite.com/docs/getting-started/introduction/) for pre-built UI components.
- [Firebase](https://firebase.google.com/docs) for user authentication.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
