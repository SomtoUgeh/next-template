# Next app template

In the project directory, you can run:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the
result.

The page will reload if you make edits. <br /> You will also see any lint errors
in the console.

## Structure

### Auth

Auth protection is handled in the base `Routes.config.tsx` file. Frontend checks
for boolean flag from server to ensure the user is verified and then pushed to
authenticated app.

### Server state management

Interaction with the server and storage of server state is handled in the `lib/`
folder. This contains 3 folders: `api/`, `queries/` and `utils/`. `api/`
contains api routes for resources. `queries/` contains server state
implementation using [react-query](https://react-query.tanstack.com/overview)

### State management

State management is handled with react. `useState` `useReducer` and `useContext`
are used in this project. Contexts are setup in the `contexts/` folder and
reducers are setup in the `reducer/` folder.

### UI

User interface is built using Styled Components and Chakra UI as the component
library of choice. Global/base styles are located in the `styles/` folder

### Routes

Routes are setup in the `routes/` folder. `routes.config` contains all the
routes and respective components in this projects.

### Linting

ESLint, Prettier, husky and lint-staged are used in this project. Check
`package.json` and `rc` files for rules. There are also git hooks setup on
commit and push

### Others

Assets are located at `assets/`. Utils functions are located at `utils/` and
components are located at `components/`
