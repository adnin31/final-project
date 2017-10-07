import axios from 'axios'
const api = 'http://localhost:3000/api'

export const movieList = movie => ({
  type: 'GET_MOVIE_ALL',
  payload: {
    movielist: movie
  }
})

export const studioList = studio => ({
  type: 'GET_STUDIO_ALL',
  payload: {
    studiolist: studio
  }
})

export const getAllMovie = () => dispatch => {
  axios.get(api + `/movie/`)
  .then(({data}) => {
    dispatch(movieList(data))
  })
  .catch(err => {
    dispatch({error: err})
  })
}

export const getAllStudio = () => dispatch => {
  axios.get(api + `/studio/`)
  .then(({data}) => {
    console.log('action axios get studio', data)
    dispatch(studioList(data))
  })
  .catch(err => {
    dispatch(err)
  })
}
