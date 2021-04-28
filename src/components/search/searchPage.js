import React, { useState, useEffect } from 'react';
import SearchBar from './searchBar';
import BlogGrid from '../main/bloggrid';

import { PageHeader } from 'antd';

const SearchPage = (props) => {
  const [input, setInput] = useState(''); //input: user input
  const [dogListDefault, setDogListDefault] = useState(); 
  const [dogList, setDogList] = useState();

  const fetchData = async () => {
    return await fetch('https://pilot-energy-3000.codio-box.uk/canine_shelter/v1/listings')
      .then(response => response.json())
      .then(data => {
         setDogList(data) 
         setDogListDefault(data)
       });}

  const updateInput = async (input) => {
     console.log("Show input: ", input);
     const filtered = dogListDefault.filter(listings => {
     return listings.breeds.toLowerCase().includes(input.toLowerCase())
     })
     console.log("Show filtered: ", filtered);
     setInput(input);
     setDogList(filtered);
  }

  useEffect( () => {fetchData()}, []);
	
  return (
    <>
      <SearchBar 
       input = {input} 
       setKeyword = {updateInput}
      />
          
           <PageHeader className="site-page-header"
            title="Canine Dogs Shelter"
            subTitle="Where dogs are preserved"/>
      
      <BlogGrid dogList = {dogList?dogList:[]} />    
    </>
   );
}

export default SearchPage