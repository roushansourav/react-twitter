import React,{useState} from 'react';
import {Grid} from '@material-ui/core';
import SearchBar from './search';
import _ from 'lodash';
import axios from 'axios';

function Home() {
  const [search, setSearch] = useState("");
  const [suggestion, setSuggestion] = useState(null);
  const debounceSearch = React.useRef(
    _.debounce((search) => {
      // if (search.startsWith("#")) {
      //   console.log(search);
      //   search.length >= 2 &&
      //     axios
      //       .get(`http://localhost:4000/tweets?q=${encodeURIComponent(search)}`)
      //       .then((res) => {
      //         //setSuggestion(res.data);
      //         console.log(res.data);
      //       })
      //       .catch((err) => console.error(err));
      // } else {
        if(!search.startsWith("#")){
        axios
          .get(`http://localhost:4000/users?q=${search}`)
          .then((res) => {
            setSuggestion(res.data);
            console.log(res.data);
          })
          .catch((err) => console.error(err));
        }
      // }
    }, 500)
  
  );

  const onChangeHandler = (e) => {
    e.persist();
    let searchString = e.target.value;
    setSearch(searchString);
    if (!!searchString) debounceSearch.current(searchString);
  };
  return (
    <Grid container justify='center' alignItems='center' style={{minHeight:'100vh'}}>
      <SearchBar home {...{suggestion,search,onChangeHandler}}/>
    </Grid>
  );
}

export default Home;
