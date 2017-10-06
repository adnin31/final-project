import axios from 'axios'
const api = 'http://localhost:3000/api'

export const movieList = movie => ({
  type: 'GET_MOVIE_ALL',
  payload: {
    movielist: movie
  }
})

export const theaterList = theater => ({
  type: 'GET_THEATER_ALL',
  payload: {
    theaterlist: theater
  }
})

export const getAllMovie = () => dispatch => {
  axios.get(api + `/movie/`)
  .then(({data}) => {
    dispatch(movieList(data))
  })
  .catch(err => {
    dispatch(err)
  })
}

export const getAllTheater = () => dispatch => {
  axios.get(api + `/theater/`)
  .then(({data}) => {
    console.log('action axios get theater', data)
    dispatch(theaterList(data))
  })
  .catch(err => {
    dispatch(err)
  })
}
