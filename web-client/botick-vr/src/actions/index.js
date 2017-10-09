import axios from 'axios'
import firebase from '../components/firebase.js'
import Home from '../components/Home.js'

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

export const getToken = data => ({
  type: 'SAVE_USER_TOKEN',
  payload: {
    dataUser: data
  }
})

export const getSeats = counterUser => ({
  type: 'SAVE_SEATS_FIRE',
  payload: {
    userFire: counterUser
  }
})

export const statusEmail = status => ( {
  type: 'SET_STATUS_EMAIL',
    payload : {
      status: status
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
    localStorage.setItem('username',data.username)
    localStorage.setItem('email',data.email)
    dispatch(getToken(data))
  })
}

export const logOut = dataUser => dispatch =>{
  localStorage.removeItem('token')
  var newDataUser = {
    token: dataUser,
    username: dataUser,
    email: dataUser
  }
  dispatch(getToken(newDataUser))
}

export const getUserFirebase = studio => dispatch => {
  db.ref(studio).on('value',snapshot => {
    dispatch(getSeats(snapshot.val()))
  })
}

export const register = newUser => dispatch=> {
  axios.post(api + '/user/signup', {
    ...newUser
  })
  .then(({data}) => {
  })
}

export const sendEmail = dataEmail => dispatch => {
  axios.post( `https://botick-vr.appspot.com/sendmail`,{}, {
    headers : dataEmail
  })
  .then(({data}) => {
    dispatch(statusEmail(true))
  })
  .catch( err => {
    alert('hayoooo salah')
  })
}
