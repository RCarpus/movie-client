import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';


let imgPath = './img/';

//temporary movie data until database is connected
let movies = [
  {
    "Genre": {
      "Name": "horror",
      "Description": "movies that make you scared"
    },
    "Director": {
      "Name": "Jordan Downey",
      "Bio": "Jordan Downey is a writer and director from Ohio, and no stranger to the horror community. While in college, he was an intern under Wes Craven and broke onto the scene with his first feature, the cult horror film ThanksKilling.",
      "BirthYear": 1986
    },
    "_id": "6197b3dd5ba878fd0afa740a",
    "Title": "Thankskilling",
    "Description": "An evil turkey takes revenge for his ancestors on Thanksgiving",
    "Featured": true,
    "ImagePath": imgPath + 'thankskilling.jpg'
  },
  {
    "Genre": {
      "Name": "comedy",
      "Description": "movies that make you laugh a lot"
    },
    "Director": {
      "Name": "Mike Judge",
      "Bio": "Michael Craig Judge (born October 17, 1962) is a super cool American actor, voice actor, animator, writer, producer, director and musician. He is the creator of the animated television series Beavis and Butt-Head (1993–1997, 2011, 2021–present), and co-creator of the television series King of the Hill (1997–2010), The Goode Family (2009), Silicon Valley (2014–2019), and Mike Judge Presents: Tales from the Tour Bus (2017–2018). He also wrote and directed the films Beavis and Butt-Head Do America (1996), Office Space (1999), Idiocracy (2006), and Extract (2009).",
      "BirthYear": 1962
    },
    "_id": "6197b5575ba878fd0afa740e",
    "Title": "Office Space",
    "Description": "A man and his friends accidentally launder hundreds of thousands of dollars from the company they all work for.",
    "Featured": false,
    "ImagePath": imgPath + 'officeSpace.jpg'
  },
  {
    "Genre": {
      "Name": "action",
      "Description": "movies that get your blood pumping"
    },
    "Director": {
      "Name": "Tetsuya Nomura",
      "Bio": "Tetsuya Nomura is a Japanese video game artist, designer and director working for Square Enix. He designed characters for the Final Fantasy series, debuting with Final Fantasy VI and continuing with various later installments.",
      "BirthYear": 1970
    },
    "_id": "6197b4b15ba878fd0afa740c",
    "Title": "Final Fantasy VII: Advent Children",
    "Description": "A video game protagonist rides a motorcycle and does battle with his archnemesis.",
    "Featured": true,
    "ImagePath": imgPath + "ffviiAdventChildren.jpg"
  },
  {
    "Genre": {
      "Name": "comedy",
      "Description": "movies that make you laugh a lot"
    },
    "Director": {
      "Name": "Mike Judge",
      "Bio": "Michael Craig Judge (born October 17, 1962) is a super cool American actor, voice actor, animator, writer, producer, director and musician. He is the creator of the animated television series Beavis and Butt-Head (1993–1997, 2011, 2021–present), and co-creator of the television series King of the Hill (1997–2010), The Goode Family (2009), Silicon Valley (2014–2019), and Mike Judge Presents: Tales from the Tour Bus (2017–2018). He also wrote and directed the films Beavis and Butt-Head Do America (1996), Office Space (1999), Idiocracy (2006), and Extract (2009).",
      "BirthYear": 1962
    },
    "_id": "6197b5925ba878fd0afa740f",
    "Title": "Idiocracy",
    "Description": "An American soldier takes part in a governmental hibernation experiment that goes wrong. He wakes up in the year 2505 in a world full of idiots.",
    "Featured": false,
    "ImagePath": imgPath + 'idiocracy.jpg'
  },
  {
    "Genre": {
      "Name": "family",
      "Description": "movies that are suitable for young children, but also enjoyed by adults"
    },
    "Director": {
      "Name": "Rob Minkoff",
      "Bio": "Robert Ralph Minkoff is an American filmmaker. He is known for co-directing the Academy Award-winning Disney animated feature The Lion King, along with directing Stuart Little, Stuart Little 2, The Haunted Mansion, The Forbidden Kingdom, and Mr. Peabody & Sherman.",
      "BirthYear": 1962
    },
    "_id": "6197b5d35ba878fd0afa7410",
    "Title": "Stuart Little",
    "Description": "A husband and a wife go to an orphanage, and instead of adopting a human child who is in need of a loving family, they adopt a literal mouse.",
    "Featured": false,
    "ImagePath": imgPath + 'stuartLittle.jpg'
  },
  {
    "Genre": {
      "Name": "animated",
      "Description": "movies made by drawing lots of pictures and then talking on top of them"
    },
    "Director": {
      "Name": "Hayao Miyazaki",
      "Bio": "Miyazaki Hayao is a Japanese animator, director, producer, screenwriter, author, and manga artist. A co-founder of Studio Ghibli, he has attained international acclaim as a masterful storyteller and creator of Japanese animated feature films, and is widely regarded as one of the most accomplished filmmakers in the history of animation.",
      "BirthYear": 1941
    },
    "_id": "6197b6235ba878fd0afa7411",
    "Title": "Spirited Away",
    "Description": "A girl and her family visit an amusement park. The girl's parents are turned into pigs, and she is kidnapped by ghosts.",
    "Featured": true,
    "ImagePath": imgPath + 'spiritedAway.jpg'
  },
  {
    "Genre": {
      "Name": "family",
      "Description": "movies that are suitable for young children, but also enjoyed by adults"
    },
    "Director": {
      "Name": "Chris Columbus",
      "Bio": "Chris Joseph Columbus is an American film director, producer, and screenwriter. After writing screenplays for several teen comedies in the mid-1980s, he made his directorial debut with a teen adventure, Adventures in Babysitting (1987). Columbus gained recognition soon after with the highly successful Christmas comedy Home Alone (1990) and its sequel Home Alone 2: Lost in New York (1992).",
      "BirthYear": 1958
    },
    "_id": "6197b8c85ba878fd0afa7412",
    "Title": "Harry Potter and the Sorcerer's Stone",
    "Description": "An eleven-year old boy goes to wizard school for a year and doesn't cast a single spell onscreen the entire time.",
    "Featured": false,
    "ImagePath": imgPath + 'harryPotterAndTheSorcerersStone.jpg'
  },
  {
    "Genre": {
      "Name": "animated",
      "Description": "movies made by drawing lots of pictures and then talking on top of them"
    },
    "Director": {
      "Name": "Rob Minkoff",
      "Bio": "Robert Ralph Minkoff is an American filmmaker. He is known for co-directing the Academy Award-winning Disney animated feature The Lion King, along with directing Stuart Little, Stuart Little 2, The Haunted Mansion, The Forbidden Kingdom, and Mr. Peabody & Sherman.",
      "BirthYear": 1962
    },
    "_id": "6197bc855ba878fd0afa7418",
    "Title": "The Lion King",
    "Description": "Animated lions perform a completely faithful rendition of Hamlet.",
    "Featured": false,
    "ImagePath": imgPath + 'theLionKing.jpg'
  },
  {
    "Genre": {
      "Name": "animated",
      "Description": "movies made by drawing lots of pictures and then talking on top of them"
    },
    "Director": {
      "Name": "Phil Lord",
      "Bio": "Phil Lord is an American film producer, director, and writer who is an executive producer of Solo: A Star Wars Story. Lord and industry partner Christopher Miller were the original directors for the film, but were replaced by Ron Howard.",
      "BirthYear": 1975
    },
    "_id": "6197b45d5ba878fd0afa740b",
    "Title": "The Lego Movie",
    "Description": "Sentient legos discover the meaning of life.",
    "Featured": false,
    "ImagePath": imgPath + 'theLegoMovie.jpg'
  },
  {
    "Genre": {
      "Name": "animated",
      "Description": "movies made by drawing lots of pictures and then talking on top of them"
    },
    "Director": {
      "Name": "Kunihiko Yuyama",
      "Bio": "Kunihiko Yuyama is a Japanese director best known for his work on the Pokémon anime franchise.",
      "BirthYear": 1952
    },
    "_id": "6197b5165ba878fd0afa740d",
    "Title": "Pokemon: The First Movie",
    "Description": "Ash goes to a party with the most powerful Pokemon in the world and then get amnesia so the anime doesn't need to acknowledge the events of the movie.",
    "Featured": false,
    "ImagePath": imgPath + "pokemonTheFirstMovie.jpg"
  }
];

export default class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: movies,
      selectedMovie: null
    };
  }

  //This method lets me affect the state of this parent element from the Movie Card Child element
  //when passed as an attribute into the MovieCard
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;

    if (movies.length === 0) return <div className="main-view">The list is empty</div>;

    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
          : movies.map(movie => <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />)
        }
      </div>
    );
  }
}