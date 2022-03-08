import React, { useState } from 'react';
import Words from './Words';
import PossibleWrongWords from '../words/possibleWords.json';
import possibleAnswers from '../words/possibleAnswers.json';


function InputForm (){
    const [correctLetters, setCorrectLetters] = useState('');
    const [knownLetters, setKnownLetters] = useState('');
    const [incorrectLetters, setIncorrectLetters] = useState('');
    const [possibleWords, setPossibleWords] = useState([]);
    const [possibleGuesses, setPossibleGuesses] = useState([]);
    const [tooManyGuesses, setTooManyGuesses] = useState(false);
    const [goodLetterGuesses, setGoodLetterGuesses] = useState([]);
    const guessLimit = 210

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
    // finds possible words using known correct letters & incorrect letters
    const processOptions = () => {
        setTooManyGuesses(false)
        let regularExpressionString = '^' + [...correctLetters].toLowerCase().replaceAll('?', '.');
        regularExpressionString += '.*'

        let regularExpression = new RegExp(regularExpressionString)
        let processedPossibleAnswerWords = possibleAnswers.filter((value) => {
            if(regularExpression.test(value)) {  
                setKnownLetters(convertToLowercase(knownLetters))
                if(includesCharacters(knownLetters, value)) {
                    setIncorrectLetters(convertToLowercase(incorrectLetters))
                    return incorrectLetters.length === 0 || doNotIncludesCharacters(incorrectLetters, value)
                };
            };
            return false
        })
        if(processedPossibleAnswerWords.length > guessLimit) {
            setTooManyGuesses(true)
        };
        setPossibleWords(processedPossibleAnswerWords.slice(0, guessLimit))
        // track('result-count', possibleWords.length)
    };

    const created = () => {
        setPossibleGuesses([...possibleGuesses, ...PossibleWrongWords, ...possibleAnswers])
    }
    // filters out words using known and unknown letters for proposing new potential word guesses
    const filterOutWordsWithKnownAndUnknownLetters = (words) => {
        return Words.filter((value) => {
            setKnownLetters(convertToLowercase(knownLetters))
            setIncorrectLetters(convertToLowercase(incorrectLetters))
            setIncorrectLetters(convertToLowercase(correctLetters))

            return doNotIncludesCharacters(knownLetters, value) && doNotIncludesCharacters(incorrectLetters, value) && doNotIncludesCharacters(correctLetters, value)
        })
    }
    // orders the words by a score
    const calculateGoodLetterWords = () => {
        // remove words from the available answer words that include letters we know about
        let wordsWithoutCharactersWeKnow = filterOutWordsWithKnownAndUnknownLetters(possibleAnswers)

        // Gather a count of each character in available answer words
        let characterMap = {}
        wordsWithoutCharactersWeKnow.forEach((value) => {
          value.split('').forEach((character) => {
            characterMap[character] = (characterMap[character] | 0) + 1
          })
        })

        // Sort the characters in order of use
        let characterMapArray = []
        for (const character in characterMap) {
          characterMapArray.push({character: character, value: characterMap[character]})
        }
        let sortedCharacterMapArray = characterMapArray.sort((a, b) => {
          return b.value - a.value
        })
        // Assign score to each character based on how many times it appears in the available word list
        let currentScore = 26
        let scoredCharacterMap = {}
        for (let index in sortedCharacterMapArray) {
          scoredCharacterMap[sortedCharacterMapArray[index].character] = currentScore
          currentScore--
        }
        // Remove words from possible guess list that includes letters we know about
        let guessesWithoutCharactersWeKnow = filterOutWordsWithKnownAndUnknownLetters(possibleGuesses)
        // Score each available word based on its character usage.
        let scoredWordList = guessesWithoutCharactersWeKnow.map((value) => {
            let score = 0
            let seenLetters = ''
            value.split('').forEach((character) => {
                // Don't double count scores for duplicate letters.
                if (seenLetters.indexOf(character) < 0) {
                    seenLetters += character
                    score += scoredCharacterMap[character]
                }
            })
            return {word: value, score: score}
        })
        // Order words by score and return the top 10.
        let orderedScoredWordList = scoredWordList.sort((a, b) => {
            return b.score - a.score
        }).map((value) => value.word).slice(0, 10)   
        setGoodLetterGuesses(orderedScoredWordList)     
    }

    const convertToLowercase = (string) => {
        return string.slice().toLowerCase()
    }

    // const track = (type, value) => {
    //     if(typeof umami != 'undefined') {
    //         umami.trackEvent(`${value}`, type)
    //     }
    // }

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
            <Words possibleWords={possibleWords} goodLetterGuesses={goodLetterGuesses}/>
        </div>
    )
}

export default InputForm;