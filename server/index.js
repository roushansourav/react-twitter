//Dependencies
const express =require('express');
const bodyParser = require('body-parser');
const morgan = require ('morgan');
const cors =require('cors');

//Local imports
const { call, SEARCH_TWEETS_URL,SEARCH_USER_URL, BASE_URL } = require('./helper');
require('dotenv').config();


const app=express();
const PORT=process.env.PORT || 4000;
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());

app.get('/tweets',(req,res)=>{
  const query=req.query.q;
  console.log('tweet',query)
  call(BASE_URL,SEARCH_TWEETS_URL.replace('{search}',encodeURIComponent(query)),(error, data, response)=>{
    if(error){ res.status(500).json({err : error, payload: null});return }
    if(data ) res.json({err: null, payload: JSON.parse(data)});
  })
})

app.get('/users',(req,res)=>{
  const query=req.query.q;
  console.log(query)
  call(BASE_URL,SEARCH_USER_URL.replace('{search}',encodeURIComponent(query)),(error, data, response)=>{
    console.log('Erorr',error)
    console.log('data',data)
    if(error) {res.status(500).json({err : error, payload: null}); return}
    if(data) res.json({err: null, payload: JSON.parse(data)});
  })
})

app.post('/',(req,res)=>{
   res.json({err: null, payload:'Server is running'});
})

app.listen(PORT,()=>{
  console.log(`Server is running at ${PORT}`)
});