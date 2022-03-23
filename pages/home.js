import React from 'react';
import Router from 'next/router';

const handleClick = () => {
    Router.push("/")
}
export default function SecondPage(){
    return(
        
        <div className="wrapperStyles">
                <button onClick={handleClick} className="buttonStyles">
                    Home Page
                </button>
                <p>text test</p>
            </div>
    )
}