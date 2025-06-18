import React from "react";
import "./App.scss";

function App() {
    let a = 10;


    function handleClick(){
        console.log('clicked')
    }
    return (
        // <div className="app">
        //     <h1>Welcome to React</h1>
        // </div>

        <>
        <button onClick={handleClick}>Click me</button>
            <div className="frag">{++a}</div>
            <div>
                <h1>Hello</h1>
            </div>
            <div className="long">{43 + 43}</div>
            <div>
                {(function () {
                    let sum = 10 + 20;
                    return sum;
                })()}
            </div>

            <p>lorem100j ksjdhfksdhksjdhf sdkhdsfk</p>




        </>
    );
}

export default App;
