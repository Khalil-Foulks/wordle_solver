import React from "react";

function Words(props){
    const { goodLetterGuesses, possibleWords, isLoading } = props
    return(
        <div>
            {
                isLoading || possibleWords === [] ? 
                <div>
                    <div>
                        <h2>Possible Answers</h2>
                    </div>
                    <div>
                        <h2>Possible Guesses</h2>
                    </div>
                </div> :
                <div>
                    <div>
                        <h2>Possible Answers</h2>
                        {possibleWords.map((answers) => (
                            <div>
                                {answers}
                            </div>
                        ))}
                    </div>
                    <div>
                        <h2>Possible Guesses</h2>
                        {goodLetterGuesses.map((guesses) => (
                            <div>
                                {guesses}
                            </div>
                        ))}
                    </div>
                </div>
            }
        </div>
    )
}

export default Words