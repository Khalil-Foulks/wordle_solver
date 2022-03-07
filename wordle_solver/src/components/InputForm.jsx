import React, { useState } from 'react';
import PossibleWords from './PossibleWords';


function InputForm (){
    const [correctLetters, setCorrectLetters] = useState('');
    const [knownLetters, setKnownLetters] = useState('');
    const [incorrectLetters, setIncorrectLetters] = useState('');
    const [possibleWords, setPossibleWords] = useState([]);
    const [possibleGuesses, setPossibleGuesses] = useState([]);
    const [tooManyGuesses, setTooManyGuesses] = useState(false);
    const [goodLetterGuesses, setGoodLetterGuesses] = useState([]);

    const onChangehandler = (e) => {
        if(e.target.name === 'correctLetters'){
            setCorrectLetters(e.target.value) 
        } else if (e.target.name === 'knownLetters') {
            setKnownLetters(e.target.value)
        } else {
            setIncorrectLetters(e.target.value)
        }
    };
    // checks if a character is in the correct word and returns a boolean
    const includesCharacters = (charactersToInclude, targetWord) => {
        let tempNeededCharacters = charactersToInclude.split('')
        let hasCharacters = true
        tempNeededCharacters.forEach((character) => {
            if(targetWord.indexOf(character) < 0) {
                hasCharacters = false
            }
        })
        return hasCharacters
    }
    // checks if a character is NOT in the correct word and returns a boolean
    const doNotIncludesCharacters = (charactersToInclude, targetWord) => {
        let tempNeededCharacters = charactersToInclude.split('')
        let hasCharacters = true
        tempNeededCharacters.forEach((character) => {
            if(targetWord.indexOf(character) >= 0) {
                hasCharacters = false
            }
        })
        return hasCharacters
    }

    return(
        <div>
            <div className='form-container'>
                <label>Correct Letter Placement (Use ? for unknown):</label>
                <br/>
                <input
                    type='text'
                    name='correctLetters'
                    value={correctLetters}
                    onChange={onChangehandler}
                    placeholder='?????'
                    className='correct-letters-input'
                />
                <br/>
                <label>Known Letters:</label>
                <br/>
                <input
                    type='text'
                    name='knownLetters'
                    value={knownLetters}
                    onChange={onChangehandler}
                    placeholder='a-z'
                    className='known-letters-input'
                />
                <br/>
                <label>Incorrect Letters:</label>
                <br/>
                <input
                    type='text'
                    name='incorrectLetters'
                    value={incorrectLetters}
                    onChange={onChangehandler}
                    placeholder='a-z'
                    className='incorrect-letters-input'
                />
            </div>
            <PossibleWords/>
        </div>
    )
}

export default InputForm;