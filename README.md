# MyFlix
MyFlix is a the client-side of a full-stack CRUD app built using the MERN (Mongo, Express, React, Node) stack, and hosted with [Netlify](https://www.netlify.com/) at https://rcarpus-myflix.netlify.app/. The API, titled movie-api, is located [here](https://github.com/RCarpus/movie-api) on GitHub and is hosted by [Heroku](https://devcenter.heroku.com/) at https://rcarpus-movie-api.herokuapp.com/. Please visit the link to the API hosted with Heroku for documentation on the api endpoints used with this app.

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
## Components
| View | Description |
| --- | --- |
| `<MainView>` | This is the main view that contains each other custom component except for the `<TopBanner>`. `<MainView>` is rendered within the `index.jsx` file and is wrapped with a bootstrap `<Container>`, a react-router-dom `<Router>`, and the React Redux `<Provider>` elements. The `<MainView>` renders an appropriate view based on the state of the application. <br><br> If no user is logged in and `state.isRegistered` is `true` (default), a `<LoginView>` is rendered. <br><br> If no user us logged in and `state.isRegistered` is `false` (triggered by a button in `<LoginView>`), the `<RegisterView>` is rendered. <br><br> If a user is logged in, the `<MainView>` will render the `<MoviesList>` at the default endpoint. <br><br> The `<MainView>` also has routing to endpoints triggering `<MovieView>`, `<DirectorView>`, `<GenreView>`, and `<ProfileView>` elements. See routing for details. |
| `<TopBanner>` | The top banner is rendered within `index.jsx` alongside the `<MainView>`, inside the `<Router>` and `<Provider>`, but outside the `<Container>`. This way, the `<TopBanner>` has access to routing and state changes but is not restricted in width like the rest of the app. In addition the the Ryan Carpus logo and site title, when logged in, the banner also renders a `<LogoutButton>` and a `<Link>` to the `<ProfileView>`. |
| `<LoginView>` | If no user data is present in the store and state.IsRegistered is true (default), `<LoginView>` is rendered in the `<MainView>`. This view renders a React `<Form>` element that handles the user's login inputs using client-side data validation before sending to the server. This view also has a `<Button>` that triggers the `<RegistrationView>` by setting state.isRegistered to false. |
| `<LogoutButton>` | Logs out the user by simply clearing the localStorage and deleting the userData from state. |
| `<RegistrationView>` | If state.isRegistered is false (set from `<LoginView>`), this view renders a React `<Form>` for a new user to create an account. The form uses client-side validation. This view also has a `<button>` that triggers the `<LoginView>` by setting state.isRegistered true. |
| `<MoviesList>` | The default view after logging in. This filters and sorts the movies data using the `<VisibilityFilter>` and `<ToggleSortButton>` and displays a grid of `<MovieCard>` elements. |
| `<VisibilityFilter>` | A simple input using `<Form.Control>` that just sets the state.Filter to the value in the input field |
| `<ToggleSortButton>` | A `<Button>` that toggles state.sortBy between 'ASC' and 'DESC'. Note: String values are used here to promote the future possibility of additional sort criteria (ie: by director or genre name) |
| `<MovieCard>` | A react-bootstrap `<Card>` element displaying the title of a movie, one line of the description, and the image of a movie passed as a prop. Also has a `<Link>` to the `<MovieView>` for that movie. |
| `<MovieView>` | This element displays full details for a movie based on the id in the url. From this view, `<GenreView>` and `<DirectorView>` elements are linked to by a `<Link>` element. This view also has a `<FavoriteButton>` which is passed the functions `isFavorite`, `removeFromFavorites`, and `addToFavorites`. |
| `<FavoriteButton>` | This element uses the function prop `isFavorite` to determine if the movie is in the user's FavoriteMovies list, and renders a `<Button>` with either an empty star or a filled up star to indicate this. Clicking the star triggers either `removeFromFavorites` or `addToFavorites`. |
| `<GenreView>` | Displays information about the genre by the name in the url. This information is extracted from a movie of that genre. This view also displays a grid of `<MovieCard>` elements that have this genre. |
| `<DirectorView>` | Displays information about the genre by the name in the url. This information is extracted from a movie of that genre. This view also displays a grid of `<MovieCard>` elements that have this director. |
| `<ProfileView>` | Displays all user information and provides a `<Form>` for users to update their personal information. Users can update only the fields they want to change, and the client-side validation will only apply to the fields that are not blank. This view also includes a `<Button>` to unregister a user. This deletes the userData from state, clears the localStorage, and deletes the user from the server. This view also displays a grid of `<MovieCard>` elements corresponding to the user's FavoriteMovies list. Each `<MovieCard>` has an associated `<Button>` that removes the movie from the FavoritesList. |

## Routing
Routing is handled with [react-router-dom](https://github.com/remix-run/react-router/blob/main/docs/getting-started/tutorial.md), a client and server-side routing library for React.
| Route | Rendered View |
| --- | --- |
| `/` | `<LoginView>` or `<RegistrationView>` or `<MoviesList>` |
| `/movies/:movieId` | `<MovieCard>` for the movie where movie.\_id === :movieId |
| `/directors/:directorName` | `<DirectorView>` for the director where director.Name === :directorName |
| `/genres/:genreName` | `<GenreView>` for the genre where genre.Name === :genreName |
| `/profile` | `<ProfileView>` for the currently logged in user |

