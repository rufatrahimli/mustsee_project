import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  removeMovieFromFavoriteList,
   registerFavoriteList
} from "../../redux/actions/actions";
import { connect, useDispatch } from "react-redux";
import "./Favorites.css";

function Favorites(props) {
  const [title, setTitle] = useState("");
  const [isSbm, setIsSbm] = useState(false);
  const dispatch = useDispatch();
  const saveListHandler = () => {
    setIsSbm(true);

    let savedList = {
      title: title,
      movies: getImdbIDArray(),
  };
    fetch(`https://acb-api.algoritmika.org/api/movies/list/`, {
      method: "POST",
      headers: {
          "Content-type": "application/json",
      },
      body: JSON.stringify(savedList),
  })
  .then((res) => res.json())
  .then((data) => {
      dispatch(registerFavoriteList(data.id));
  })
  .catch((err) => console.log(err));

  };

  const getImdbIDArray = () => {
    let favoritesIDArray = props.favoriteList.map((item) => {
      return item.imdbID;
    });
    return favoritesIDArray;
  };

  const allowedSave = title.length > 0 && props.favoriteList.length > 0;

  const favoriteChangeHandler = (e) => {
    setTitle(e.target.value);
  };

  return (
    <div className="favorites">
      <input
        className="favorites__name"
        onChange={favoriteChangeHandler}
        onClick={favoriteChangeHandler}
        placeholder="Введите название списка"
      />
      <ul className="favorites__list">
        {props.favoriteList.map((item) => {
          return (
            <li key={item.imdbID}>
              {item.Title} ({item.Year})
              <button
                className="remove-favorite-movie"
                onClick={() => {
                  props.removeMovieFromFavoriteList(item.imdbID);
                  setIsSbm(false);
                }}
              >
                X
              </button>
            </li>
          );
        })}
      </ul>

      {!isSbm ? (
        <button
          type="button"
          className="favorites__save"
          onClick={saveListHandler}
          disabled={!allowedSave}
          style={{
            cursor: allowedSave ? "pointer" : "not-allowed",
            backgroundColor: allowedSave ? "#496ddb" : "gray",
          }}
        >
          Сохранить список
        </button>
      ) : (
        <Link
          to={"/list/" + props.listID}
          target="_blank"
          className="link-to__list"
        >
          Перейти к списку
        </Link>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    favoriteList: state.favoriteList,
    favoritesIDArray: state.favoritesIDArray,
    listID: state.listID,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeMovieFromFavoriteList: (id) => {
      dispatch(removeMovieFromFavoriteList(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
