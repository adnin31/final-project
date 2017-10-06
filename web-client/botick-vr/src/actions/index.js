import axios from 'axios'
const api = 'http://botick-vr.appspot.com/api'

export const movieList = (movie, studio) => ({
  type: 'GET_MOVIE_ALL',
  payload: {
    movielist: movie,
    studiolist: studio
  }
})

export const theaterList = theater => ({
  type: 'GET_THEATER_ALL',
  payload: {
    theaterlist: theater
  }
})

export const getToken = token => ({
  type: 'SAVE_USER_TOKEN',
  payload: {
    token: token
  }
})

export const getAllMovie = () => dispatch => {
  axios.get(api + `/movie/`)
  .then(({data}) => {
    axios.get(api + `/studio/`)
    .then(({data2}) => {
      console.log('action axios get movie', data)
      dispatch(movieList(data, data2))
    })
    .catch(err => {
      dispatch(err)
    })
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

export const postLogin = dataUser => dispatch =>{
  axios.post( `${api}/user/signin`, {
    ...dataUser
  })
  .then( ({data}) => {
    localStorage.setItem('token',data.token)
    dispatch(getToken(data.token))
  })
}

export const logOut = dataUser => dispatch =>{
  localStorage.removeItem('token')
  dispatch(getToken(dataUser))
}
