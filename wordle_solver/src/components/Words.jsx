import React from "react";
import './styling/Words.css'

function Words(props){
    const { suggestedGuesses, possibleWords, isLoading, tooManyAnswers } = props
    return(
        <div className="words-container">
            {
                isLoading || possibleWords === [] ? 
                <div className="">
                    <div className="answers">
                        <hr/>
                        <h2>Possible Answers</h2>
                    </div>
                    <div className="suggested-guesses">
                        <hr/>
                        <h2>Suggested Guesses</h2>
                    </div>
                </div> :
                <div>
                    <div className="container answers-containter">
                        <hr/>
                        <h2>Possible Answers</h2>
                        {
                            tooManyAnswers ? <div className="too-many-guesses">There are too many possible answers, please limit further</div> : <></> 
                        }
                        <div className="answers">
                            {possibleWords.map((answers, idx) => (
                                <div key={idx} className="words">
                                    {answers}
                                </div>
                            ))}
                        </div>       
                    </div>
                    <div className="container guesses-containter">
                        <hr/>
                        <h2>Suggested Guesses</h2>
                        <div className="suggested-guesses">
                            {suggestedGuesses.map((guesses, idx) => (
                                <div key={idx} className="words">
                                    {guesses}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Words