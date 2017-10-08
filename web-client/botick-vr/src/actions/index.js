import axios from 'axios'
import firebase from '../components/firebase.js'

const api = 'https://botick-vr.appspot.com/api'
const db = firebase.database()

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

export const getSeats = counterUser => ({
  type: 'SAVE_SEATS_FIRE',
  payload: {
    userFire: counterUser
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

export const getUserFirebase = studio => dispatch => {
  console.log('ini studio', studio);
  db.ref(studio).on('value',snapshot => {
    console.log('ini snapshot',snapshot.val());
    dispatch(getSeats(snapshot.val()))
  })
}

export const register = newUser => dispatch=> {
  axios.post(api + '/user/signup', {
    ...newUser
  })
  .then(({data}) => {
    console.log('data masuk dengan', data);
  })
}
