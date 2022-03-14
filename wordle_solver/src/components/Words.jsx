import React, { useEffect } from "react";

function Words(props){
    const { goodLetterGuesses, possibleWords } = props

    // useEffect(() => {

    //     console.log(goodLetterGuesses)
    //     console.log(possibleWords)
    // },[])
    return(
        <div>
            {/* <div>
                <h2>Possible Answers</h2>
                {possibleWords.map((answers) => (
                    {answers}
                ))}
            </div>
            <div>
                <h2>Possible Guesses</h2>
                {goodLetterGuesses.map((guesses) => (
                    {guesses}
                ))}
            </div> */}
        </div>
    )
}

export default Words