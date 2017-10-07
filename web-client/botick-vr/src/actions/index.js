import axios from 'axios'
const api = 'https://botick-vr.appspot.com/api'

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

export const getToken = token => ({
  type: 'SAVE_USER_TOKEN',
  payload: {
    token: token
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
