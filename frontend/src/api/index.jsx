import axios from 'axios';
import https from 'https';
// import Cookies from 'universal-cookie';

// 


// const url_backend = "https://live-raccoon-probably.ngrok-free.app"
const url_backend = "http://localhost:8000"
const url_event = '';
const headers_ngrok = {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true'
}

const headers_pdf = {
    headers: {
        'Content-Type': 'application/pdf',
      },
}

const headers_json = {
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    }
}



// ** Sources **
export const fetchSources = () => axios.get(`${url_backend}${'/sources'}`, 
{
  method: 'GET',
  withCredentials: false,
  headers: headers_ngrok,
  }, )

export const fetchOneSource = (id) => axios.get(`${url_backend}${'/sources/'}${id}`) 
export const PostSourceFile = (postData) => axios.post(`${url_backend}${'/sources/upload'}`,postData, headers_form_data)
export const PostSourceUrl = (postData) => axios.post(`${url_backend}${'/source/add'}`,postData, {
  method: 'POST',
  withCredentials: false,
headers: {
  'Content-Type': 'multipart/form-data',
    'ngrok-skip-browser-warning': 'true',
},
})
export const PutSource = (postData) => axios.put(`${url_backend}${'/sources/update'}`,postData, headers_form_data)
export const DeleteSource = (postData) => axios.delete(`${url_backend}${'/sources/delete'}`,postData, headers_form_data)


export const fetchWorkers = () => axios.get(`${url_backend}${'/workers/'}`,{
  method: 'GET',
  withCredentials: false,
  headers: headers_ngrok,
})

export const fetchOneWorker = (id) => axios.get(`${url_backend}${'/workers/'}${id}`,{
  method: 'GET',
    withCredentials: false,
    headers: headers_ngrok,
})
export const EventsWorker = () => axios.get(`${url_event}${'/workers/events'}`)
export const PostWorker = (postData) => axios.post(`${url_backend}${'/worker/create'}`,postData, {
    method: 'POST',
    withCredentials: false,
    headers: headers_ngrok,
 })

export const PutRelation = (postData) => axios.put(`${url_backend}${'/relation/update'}`,postData, {
    method: 'PUT',
    withCredentials: false,
    headers: headers_ngrok,
})

