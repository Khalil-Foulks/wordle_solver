import React from "react";

function Words(props){
    const { suggestedGuesses, possibleWords, isLoading, tooManyAnswers } = props
    return(
        <div className="words-container">
            {
                isLoading || possibleWords === [] ? 
                <div className="">
                    <div className="answers">
                        <h2>Possible Answers</h2>
                    </div>
                    <div className="suggested-guesses">
                        <h2>Suggested Guesses</h2>
                    </div>
                </div> :
                <div>
                    <div className="answers">
                        <h2>Possible Answers</h2>
                        {
                            tooManyAnswers ? <div className="too-many-guesses">There are too many possible answers, please limit further</div> : <></> 
                        }       
                        {possibleWords.map((answers, idx) => (
                            <div key={idx} className="answers-containter">
                                {answers}
                            </div>
                        ))}
                    </div>
                    <div className="suggested-guesses">
                        <h2>Suggested Guesses</h2>
                        {suggestedGuesses.map((guesses, idx) => (
                            <div key={idx} className='guesses-containter'>
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