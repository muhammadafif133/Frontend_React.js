import React from 'react';

const DogList = ({dogList=[]}) => {
  return (
    <>
    { dogList.map((data,index) => {
        if (data) {
          return (
            <div key={data.breeds}>
              <h1>{data.breeds}</h1>
	    </div>	
    	   )	
    	 }
    	 return null
    }) }
    </>
  );
}

export default DogList