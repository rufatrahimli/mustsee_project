export function searchMoveis(movies) {
    return {
        type: "MovieSearch",
        payload: {
        movies: movies,
        },
    };
}

export function addFavoriteList(id) {
    return {
        type: "AddFavFilm",
        payload: {
            id: id,
        },
    };
}
  

export function removeMovieFromFavoriteList(id) {
    return {
        type: "MovieListRemove",
        payload: {
            id: id,
        },
    };
}


export function registerFavoriteList(listID) {
    return {
        type: "register",
        payload: {
            listID: listID,
        },
    };
}

export function getListIntoState(title, movies) {
    return {
        type: "ListState",
        payload: {
            title: title,
            listMovies: movies,
        },
    };
}

export function getMovieInfoToState(movieDetails) {
    return {
        type: "MovieInfo",
        payload: {
            movieDetails: movieDetails,
        },
    };
}



