# movie-client
Movie client is the client-side app to be used in conjunction with the [movie-api](https://github.com/RCarpus/movie-api).  
## Build Tools
Movie client uses [Parcel](https://parceljs.org/docs/) to transpile JSX into JavaScript and SCSS into CSS, and bundle the project into as few files as possible to serve to the client. Parcel is currently set up in development mode. As such, the code is not minified.  
To start the build tools, run the command `npx parcel src/index.html` in the powershell terminal. The project will be hosted at localhost:1234 and will have live-reload enabled.
