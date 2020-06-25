import keys from '../../server/keys';
import Axios from 'axios';
const baseURI='https://api.twitter.com/1.1/search/tweets.json';

export default function(query){
  const data ={  
    query,
    maxResults: 4,  
}
const request={
  url: `${baseURI}?${JSON.stringify(
    data,
  )}`,
  method: 'GET',
  headers: {
    Authorization: `Bearer ${process.env.accessToken || keys.accessToken}`,
    'Content-Type': 'application/json',
  },
};
return Axios(request);  
}
