import React from "react";

export default class TestGet extends React.Component{
    state = {
        title: null,
        id: null
    };

    async testGet(){
        const response = await fetch("http://localhost:8080/softfactor/");
        const data = await response.json();
        // this.setState({title: data})
        console.log(data[0].title)
    }

    render(){
        return(
            <div>
                <h1>{this.testGet()}</h1>
            </div>
        )
    }
}