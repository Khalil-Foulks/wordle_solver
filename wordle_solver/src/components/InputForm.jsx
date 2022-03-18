import React, { useEffect, useState } from 'react';
import Words from './Words';
import PossibleWrongWords from '../words/possibleWords.json';
import PossibleAnswers from '../words/possibleAnswers.json';
import './styling/InputForm.css'


function InputForm (){
    const [inputs, setInputs] = useState({
        correctLetters: '',
        knownLetters: '',
        incorrectLetters: ''
    })
    const [correct, setCorrect] = useState('');
    const [known, setKnown] = useState('');
    const [incorrect, setIncorrect] = useState('');
    const [possibleGuesses, setPossibleGuesses] = useState([...PossibleWrongWords, ...PossibleAnswers]);
    const [possibleWords, setPossibleWords] = useState([]);
    const [tooManyAnswers, setTooManyAnswers] = useState(false);
    const [suggestedGuesses, setSuggestedGuesses] = useState(['arise','audio','adieu','equal','louie','ouija','roast','ratio','tears','samey']);
    const [isLoading, setIsLoading] = useState(false)
    const guessLimit = 210

    const onChangehandler = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
        if(e.target.name === 'correctLetters'){
            setCorrect(e.target.value.toLowerCase().replaceAll('?', '.'))
        } else if (e.target.name === 'knownLetters'){
            setKnown(e.target.value.toLowerCase())
        } else if (e.target.name === 'incorrectLetters'){
            setIncorrect(e.target.value.toLowerCase())
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
        setTooManyAnswers(false)
        let regularExpressionString = '^' + correct.slice();
        regularExpressionString += '.*'

        let regularExpression = new RegExp(regularExpressionString)
        let processedPossibleAnswerWords = PossibleAnswers.filter((value) => {
            if(regularExpression.test(value)) {  
                if(includesCharacters(known, value)) {
                    return incorrect.length === 0 || doNotIncludesCharacters(incorrect, value)
                };
            };
            return false
        })
        if(processedPossibleAnswerWords.length > guessLimit) {
            setTooManyAnswers(true)
        };
        setPossibleWords(processedPossibleAnswerWords.slice(0, guessLimit))
        // console.log(possibleWords)
    };

    // filters out words using known and unknown letters for proposing new potential word guesses
    const filterOutWordsWithKnownAndUnknownLetters = (words) => {
        return words.filter((value) => {
            return doNotIncludesCharacters(known, value) && doNotIncludesCharacters(incorrect, value) && doNotIncludesCharacters(correct, value)
        })
    }
    // orders the words by a score
    const calculateSuggestedWords = () => {
        // remove words from the available answer words that include letters we know about
        let wordsWithoutCharactersWeKnow = filterOutWordsWithKnownAndUnknownLetters(PossibleAnswers)

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
        setSuggestedGuesses(orderedScoredWordList)     
    }

    const convertToLowercase = (string) => {
        return string.slice().toLowerCase()
    }

    const runOnLoad = (callback) => {
        setIsLoading(true)
        setPossibleWords([])
        callback()
        calculateSuggestedWords()
        setIsLoading(false)
    }
    // updates answers and guesses on every input change 
    useEffect(() => {
        if(inputs.correctLetters !== '' || inputs.knownLetters !== '' || inputs.incorrectLetters !== ''){
            // console.log(`Useeffect:${inputs.knownLetters}`)
            runOnLoad(() => processOptions())
            // console.log(`input:${inputs.knownLetters} - clone:${known}`)
            // console.log(possibleWords)
            // console.log(suggestedGuesses)
        }
    }, [inputs])

    return(
        <div>
            <div className='form-container'>
                <label>Correct Letter Placement (Use ? for unknown):</label>
                <br/>
                <input
                    type='text'
                    name='correctLetters'
                    value={inputs.correctLetters}
                    onChange={onChangehandler}
                    placeholder='?????'
                    className='correct-letters-input border-gradient-green'
                    maxLength={5}
                />
                <br/>
                <label>Known Letters:</label>
                <br/>
                <input
                    type='text'
                    name='knownLetters'
                    value={inputs.knownLetters}
                    onChange={onChangehandler}
                    placeholder='a-z'
                    className='known-letters-input border-gradient-yellow'
                />
                <br/>
                <label>Incorrect Letters:</label>
                <br/>
                <input
                    type='text'
                    name='incorrectLetters'
                    value={inputs.incorrectLetters}
                    onChange={onChangehandler}
                    placeholder='a-z'
                    className='incorrect-letters-input border-gradient-red'
                    autoFocus
                />
            </div>
            <Words possibleWords={possibleWords} suggestedGuesses={suggestedGuesses} isLoading={isLoading} tooManyAnswers={tooManyAnswers}/>
        </div>
    )
}

export default InputForm;