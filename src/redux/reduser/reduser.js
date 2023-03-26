const initialState = {
    movies: [],
    favoriteList: [],
    title: "",
    listID: "",
    listMovies: [],
    movieDetails: [],
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case "MovieSearch":
            return {
                ...state,
                movies: action.payload.movies,
            };

        case "AddFavFilm":
            const newState = { ...state };
            const id = action.payload.id;
            const match = newState.movies.find((item) => item.imdbID === id);
            if (match) {
                newState.favoriteList = [...newState.favoriteList, { ...match }];
            }
            return newState;

        case "MovieListRemove":
            const newFilms = state.favoriteList.filter(
                (item) => item.imdbID !== action.payload.id
            );
            return { ...state, favoriteList: newFilms };

        case "register":
            return {
                ...state,
                listID: action.payload.listID,
            };

        case "ListState":
            return {
                ...state,
                title: action.payload.title,
                listMovies: action.payload.listMovies,
            };

        case "MovieInfo":
            return {
                ...state,
                movieDetails: action.payload.movieDetails,
            };

        default:
            return state;
    }
}

export default reducer;
