import React, { useEffect } from "react";

function Words(props){
    const { goodLetterGuesses, possibleWords, isLoading } = props

    // useEffect(() => {

    //     console.log(goodLetterGuesses)
    //     console.log(possibleWords)
    // },[])
    return(
        <div>
            {
                isLoading ? 
                <div>
                    <div>
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
                    </div>
                </div> :
                <div>
                    <div>
                        <h2>Possible Answers</h2>
                    </div>
                    <div>
                        <h2>Possible Guesses</h2>
                    </div>
                </div>
            }
        </div>
    )
}

export default Words