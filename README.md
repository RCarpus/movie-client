# movie-client
Movie client is the client-side app to be used in conjunction with the [movie-api](https://github.com/RCarpus/movie-api).  
The api is hosted with Heroku at [https://rcarpus-movie-api.herokuapp.com/](https://rcarpus-movie-api.herokuapp.com/)  
## Build Tools
Movie client uses [Parcel](https://parceljs.org/docs/) to transpile JSX into JavaScript and SCSS into CSS, and bundle the project into as few files as possible to serve to the client. Parcel is currently set up in development mode. As such, the code is not minified.  
To start the build tools, run the command `npx parcel src/index.html` in the powershell terminal. The project will be hosted at localhost:1234 and will have live-reload enabled.
## Framework
This app uses [React](https://reactjs.org/docs/getting-started.html) as a framework to display all views in a single page.
## Packages
Ajax operations are performed using [Axios](https://axios-http.com/docs/intro), a promise-based HTTP client for nodejs and the browser.  
Type checking at runtime is performed using [prop-types](https://www.npmjs.com/package/prop-types). With prop-types, the intended types of properties passed to React components is checked against properties recieved and displays errors in the console if there are any issues.
### Views
| View | Description |
| --- | --- |
| `<MainView>` | This is the main view that contains each other element. The main view displays a list of `<MovieCard>` elements when no movie is selected. Clicking on a movie title will update MainView.state.selectedMovie with the selected movie. This triggers the rendering of the appropriate `<MovieView>` in place of the list of list of `<MovieCard>`s. |
| `<MovieCard>` | This is a simple element displaying the title of a movie. It is passed the `onMovieClick` function from the `<MainView>` as a parameter. The `onclick` function for the rendered `<MovieCard>` updates the `MainView.state.selectedMovie` with the clicked element's movie. |
| `<MovieView>` | This element displays details for the movie passed into the `movie` parameter. The element has a back button, which when clicked, updated the `MainView.state.selectedMovie` to `null`, triggering the rendering of the list of `<MovieCard>` elements. |
## Styles
MyFlix uses [react-bootstrap](https://react-bootstrap.github.io/getting-started/introduction/) as a starting point for using consistent, quality styles.
## Routing
Routing is handled with [react-router-dom](https://github.com/remix-run/react-router/blob/main/docs/getting-started/tutorial.md), a client and server-side routing library for React.
# Known bugs
After logging out from the profile screen and logging back in, being directed to the user profile, the placeholders for email and birthday do not populate, and the favorite movies do not populate. If you navigate back and access the profile through a movie view, the items will populate.  
The POST request to add a favorite movie returns a 401. Don't know why.  
The PUT request to update user data returns a 401. Don't know why.  
The toggle favorite button WILL remove a favorite when toggled from shaded to empty. However, when clicking on the empty star, the star will shade, but will NOT add a favorite movie. See above.