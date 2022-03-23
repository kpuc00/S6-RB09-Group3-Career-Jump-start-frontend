import React from 'react';
import Router from 'next/router';

const handleClick = () => {
  Router.push("/home")
}
export default function Home() {
  return (
    <div>
    <h1>Landing page bruv</h1>
    <button onClick={handleClick} className="nextButton">
                home
            </button>
    </div>
  )
}
