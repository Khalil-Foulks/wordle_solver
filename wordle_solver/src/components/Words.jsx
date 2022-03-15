import React from "react";

function Words(props){
    const { suggestedGuesses, possibleWords, isLoading } = props
    return(
        <div>
            {
                isLoading || possibleWords === [] ? 
                <div>
                    <div>
                        <h2>Possible Answers</h2>
                    </div>
                    <div>
                        <h2>Suggested Guesses</h2>
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
                        <h2>Suggested Guesses</h2>
                        {suggestedGuesses.map((guesses) => (
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