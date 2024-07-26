import React, { useState } from 'react'

const OptionContainer = (props) => {
    const[isSelected, setIsSelected]=useState({
        userClicked:true,
        searchClicked:false,
    });

    function handleClick(event)
    {
        const name= event.target.getAttribute("name");

        if(name==="user-weather"){
            setIsSelected({searchClicked:false, userClicked:true});
            props.showSearch(false);
        }
        else if(name==="search-weather")
        {
            setIsSelected({userClicked:false, searchClicked:true});
            props.showSearch(true);
        }
    }
  return (
    <div className="option-container">
      <p className='user-weather' 
      name="user-weather"
      style={{
        backgroundColor: isSelected.userClicked && "lightgreen",
        color: isSelected.userClicked &&  "#002b5b",
      }}
      onClick={handleClick}>
        Your Location
      </p>

      <p className='search-weather'
      name="search-weather"
      style={{
        backgroundColor:isSelected.searchClicked && "lightgreen",
        color:isSelected.searchClicked && "#002b5b",
      }}
      onClick={handleClick}>
           Search By City
      </p>
    </div>
  );
}

export default OptionContainer