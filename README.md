# MyFlix
MyFlix is a the client-side of a full-stack CRUD app built using the MERN (Mongo, Express, React, Node) stack, and hosted with [Netlify](https://www.netlify.com/) at MYSITEADDRESS. The API, titled movie-api, is located [here](https://github.com/RCarpus/movie-api) on GitHub and is hosted by [Heroku](https://devcenter.heroku.com/) at https://rcarpus-movie-api.herokuapp.com/.  

Users of the app are able to register an account, view a database of movies, view and modify a list of favorite movies, update their personal information, and delete their accounts. 
## Build Tools
Movie client uses [Parcel](https://parceljs.org/docs/) to transpile JSX into JavaScript and SCSS into CSS, and bundle the project into as few files as possible to serve to the client.  
To start the build tools, run the command `parcel src/index.html` in the powershell terminal. The project will be hosted at localhost:1234 and will have live-reload enabled.
## Framework
This app uses [React](https://reactjs.org/docs/getting-started.html) as a framework to display all views in a single page.
## Packages
### React Redux
The application state is managed using [React Redux](https://react-redux.js.org/introduction/getting-started), a package that manages state using the flux design pattern.
### Ajax
Ajax operations are performed using [Axios](https://axios-http.com/docs/intro), a promise-based HTTP client for nodejs and the browser. 
### prop-types
Type checking at runtime is performed using [prop-types](https://www.npmjs.com/package/prop-types). With prop-types, the intended types of properties passed to React components is checked against properties recieved and displays errors in the console if there are any issues, but there is no other functionality to it.
### react-bootstrap
MyFlix uses [react-bootstrap](https://react-bootstrap.github.io/getting-started/introduction/), a bootstrap package geared specifically for use with React, as a starting point for using consistent, quality styles. Elements such as `<button>` and `<form>` are replaced by react-bootstrap's `<Button>` and `<Form>` elements that are designed to play nicely with React. Standard Bootstrap classes and features also apply.
### react-router-dom
Routing is handled with [react-router-dom](https://github.com/remix-run/react-router/blob/main/docs/getting-started/tutorial.md), a client and server-side routing library for React.
### Components
| View | Description |
| --- | --- |
| `<MainView>` | This is the main view that contains each other custom component except for the `<TopBanner>`. `<MainView>` is rendered within the `index.jsx` file and is wrapped with a bootstrap `<Container>`, a react-router-dom `<Router>`, and the React Redux `<Provider>` elements. The `<MainView>` renders an appropriate view based on the state of the application. <br><br> If no user is logged in and `state.isRegistered` is `true` (default), a `<LoginView>` is rendered. <br><br> If no user us logged in and `state.isRegistered` is `false` (triggered by a button in `<LoginView>`), the `<RegisterView>` is rendered. <br><br> If a user is logged in, the `<MainView>` will render the `<MoviesList>` at the default endpoint. <br><br> The `<MainView>` also has routing to endpoints triggering `<MovieView>`, `<DirectorView>`, `<GenreView>`, and `<ProfileView>` elements. See routing for details. |
| `<MovieCard>` | This is a simple element displaying the title of a movie. It is passed the `onMovieClick` function from the `<MainView>` as a parameter. The `onclick` function for the rendered `<MovieCard>` updates the `MainView.state.selectedMovie` with the clicked element's movie. |
| `<MovieView>` | This element displays details for the movie passed into the `movie` parameter. The element has a back button, which when clicked, updated the `MainView.state.selectedMovie` to `null`, triggering the rendering of the list of `<MovieCard>` elements. |

