import React from "react";

function Words(props){
    const { goodLetterGuesses, possibleWords } = props
    return(
        <div>
            <div>
                <h2>Possible Answers</h2>
            </div>
            <div>
                <h2>Possible Guesses</h2>
            </div>
        </div>
    )
}

export default Words