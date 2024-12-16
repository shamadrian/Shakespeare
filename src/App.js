import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import Confetti from 'react-confetti';
import './App.css';

const App = () => {
    const [showConfetti, setShowConfetti] = useState(false);
    const [applauseAudio] = useState(new Audio('/Applause_Sound_Effect.m4a'));

    // Minigame states
    const [currentPage, setCurrentPage] = useState(1); // Start on the 2nd page

    //Song Page
    const [interactiveWords, setInteractiveWords] = useState([]); // Words pressed in State 1
    const [isSecondState, setIsSecondState] = useState(false); // Track state for Minigame
    const correctWords = ['Rough', 'time', 'date:']; // Correct words for State 2
    const [currentAudio, setCurrentAudio] = useState(null);
    const [currentAudioWord, setCurrentAudioWord] = useState(null);

    //Riddle Page
    const [riddlesVisibility, setRiddlesVisibility] = useState([false, false, false]);
    const [riddleInputValues, setRiddleInputValues] = useState(["", "", ""]);
    const [isRiddleCorrect, setIsRiddleCorrect] = useState(false);

    // Minigame Page Logic
    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };
    
    const handleNext = () => {
        if (currentPage < 4) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    //riddle Page
    const handleEnvelopeClick = (index) => {
        setRiddlesVisibility((prevVisibility) =>
            prevVisibility.map((visible, i) => (i === index ? !visible : visible))
        );
    };

    const handleRiddleInputChange = (index, value) => {
        setRiddleInputValues((prevValues) =>
            prevValues.map((val, i) => (i === index ? value : val))
        );
    };

    const correctAnswers = ["rough", "time", "date"];

    const handleRiddleSubmit = () => {
        // Check if all input values match the correct answers
        const isValid = riddleInputValues.every((value, index) => 
            value.trim().toLowerCase() === correctAnswers[index]
        );
    
        if (isValid) {
            setIsRiddleCorrect(true); // Unlock the Next button
            setShowConfetti(true); // Trigger confetti
            applauseAudio.play(); // Play applause sound
            setTimeout(() => setShowConfetti(false), 8000);
        } else {
            alert('At least one word is incorrect. Please try again!');
        }
    };

    //Song Page Logic
    const handleWordClick = (word) => {
      if (!isSecondState) {
          setInteractiveWords((prev) =>
              prev.includes(word) ? prev.filter((w) => w !== word) : [...prev, word]
          );
      }
    };

    const handleWordAudio = (word) => {
        const audioFiles = {
            Rough: '/Mine_all_mine_clip.m4a',
            time: '/Used_to_be_young_clip.m4a',
            'date:': '/Treasure_clip.m4a', // Updated 'date' to 'date:'
        };
    
        const audioSrc = audioFiles[word];
    
        if (!audioSrc) {
            console.error('No audio file found for', word);
            return;
        }
    
        if (currentAudioWord === word && currentAudio) {
            // If the same button is pressed, stop the current audio
            currentAudio.pause();
            currentAudio.currentTime = 0;
            setCurrentAudio(null);
            setCurrentAudioWord(null);
            return;
        }
    
        // Stop the previous audio if a different button is pressed
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }
    
        // Play the new audio
        const audio = new Audio(audioSrc);
        audio.play();
        setCurrentAudio(audio);
        setCurrentAudioWord(word);
    
        // Reset the state when the audio ends
        audio.onended = () => {
            setCurrentAudio(null);
            setCurrentAudioWord(null);
        };
    };

    //Eqaution Logic

    const [inputOne, setInputOne] = useState('');
    const [inputTwo, setInputTwo] = useState('');
    const [isThirdPageCorrect, setIsThirdPageCorrect] = useState(false);

    const currentSonnetNumber = 18; // Current sonnet number
    const secretNumber = 2; // Secret number to solve
    const nextSonnetNumber = currentSonnetNumber + secretNumber;

    const handleInputOneChange = (e) => {
        setInputOne(e.target.value);
    };
    
    const handleInputTwoChange = (e) => {
        setInputTwo(e.target.value);
    };
    
    const handleThirdPageSubmit = () => {
        const sum = parseInt(inputOne, 10) + parseInt(inputTwo, 10);
        if (sum === nextSonnetNumber) {
            setIsThirdPageCorrect(true);
            setShowConfetti(true); // Trigger confetti
            applauseAudio.play(); // Play applause sound
            setTimeout(() => setShowConfetti(false), 8000);
        } else {
            alert('Incorrect! Try again.');
        }
    };

    //Final Page Logic
    const sonnet20 = `    A woman's face with Nature's own hand painted
    Hast thou, the master-mistress of my passion;
    A woman's gentle heart, but not acquainted
    With shifting change, as is false women's fashion;
    An eye more bright than theirs, less false in rolling,
    Gilding the object whereupon it gazeth;
    A man in hue all hues in his controlling,
    Which steals men's eyes and women's souls amazeth.
    And for a woman wert thou first created;
    Till Nature as she wrought thee fell a-doting,
    And by addition me of thee defeated,
    By adding one thing to my purpose nothing.
    But since she pricked thee out for women's pleasure,
    Mine be thy love, and thy love's use their treasure.`;

    const [finalInput, setFinalInput] = useState('');
    const [isFinalCorrect, setIsFinalCorrect] = useState(false);
    
    const correctFinalLine = "Mine be thy love, and thy love's use their treasure.";

    const handleFinalInputChange = (e) => {
        setFinalInput(e.target.value);
    };
    
    const handleFinalSubmit = () => {
        if (finalInput.trim() === correctFinalLine) {
            setIsFinalCorrect(true); // Mark as correct
            applauseAudio.play(); // Play applause sound
        } else {
            alert('That is not the correct sentence. Try again!');
        }
    };


    const renderPageContent = () => {
        switch (currentPage) {
            case 1:
                return (
                  <div>
                      <p
                          style={{
                              color: '#fff',
                              fontStyle: 'italic',
                              marginBottom: '20px',
                          }}
                      >
                          Here are the rules...<br />
                          Below are three different riddles. <br />
                          Solve each riddle to uncover a word.<br />
                          All answers are in lower case!<br />
                      </p>
                      <div
                          style={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'flex-start',
                              gap: '100px',
                              marginTop: '50px',
                          }}
                      >
                          
                          {[1, 2, 3].map((_, index) => (
                            <div>
                              <input
                                  type="text"
                                  value={riddleInputValues[index]}
                                  onChange={(e) => handleRiddleInputChange(index, e.target.value)}
                                  placeholder="Your answer..."
                                  className="riddle-input-bar"
                              />
                              <div
                                  key={index}
                                  className="envelope"
                                  onClick={() => handleEnvelopeClick(index)} // Pass the index to the click handler
                              >
                                  <img
                                      src="/Envelope_Close.png"
                                      alt="Envelope Close"
                                      className="envelope-image"
                                  />
                                  {riddlesVisibility[index] && (
                                      <div
                                          className="riddle-popup"
                                          style={{
                                              position: 'absolute',
                                              top: '110%', // Place the riddle below the envelope
                                              left: '0',
                                              width: '100%', // Match the envelope's width
                                              backgroundColor: '#fff',
                                              color: '#4c2a4f',
                                              borderRadius: '10px',
                                              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                              textAlign: 'center',
                                              zIndex: 1,
                                              whiteSpace: 'pre-wrap', // Preserve line breaks in riddles
                                          }}
                                      >
                                          <p
                                              style={{
                                                  textAlign: 'left',
                                                  paddingLeft: '20px',
                                                  paddingRight: '10px',
                                              }}  
                                          >
                                              {[
                                                  "I'm not smooth, I have texture and grit.\nTouch me and you'll feel it, bit by bit.\nWhat am I?\n _ _ _ _ _",
                                                  "I keep moving forward, never stand still.\nYou can track me, but control me you never will.\nWhat am I?\n _ _ _ _",
                                                  "I'm a moment in time you might want to save,\nOr something sweet that palm trees gave.\nWhat am I?\n _ _ _ _",
                                              ][index]}
                                          </p>
                                      </div>
                                  )}
                              </div>
                            </div>
                          ))}
                      </div>
                      <div
                          style={{
                              position: 'relative',
                              marginTop: '340px',
                              display: 'flex',
                              justifyContent: 'center',
                          }}
                      >
                          <button
                              onClick={handleRiddleSubmit}
                              className="submit-button"
                          >
                              Submit
                          </button>
                      </div>
                      {showConfetti && <Confetti />}
                  </div>
                );
            case 2:
                return (
                    <div>
                        <div>
                            {!isSecondState && (
                                <p
                                    style={{
                                        color: '#fff',
                                        fontStyle: 'italic',
                                        marginBottom: '20px',
                                    }}
                                >
                                    Here are the rules...<br />
                                    Please locate the keywords.<br />
                                    In order to unlock the Sonnet,<br />
                                    You are required to select the correct combination of keywords<br />
                                </p>
                            )} 

                            {isSecondState && (
                                <p
                                    style={{
                                        color: '#fff',
                                        fontStyle: 'italic',
                                        marginBottom: '20px',
                                    }}
                                >
                                    Congratulations!! You've unlocked the Sonnet<br />
                                    If you press on each selected keywords,<br />
                                    A song will be played<br />
                                    Please pay attention to the lyrics!<br />
                                </p>
                            )} 

                            <div style={{ fontFamily: "'Lora', serif", lineHeight: '1.8', textAlign: 'left', paddingLeft: '40px' }}>
                                {/* First Quatrain*/}
                                <p>
                                    {['Shall', 'I', 'compare', 'thee', 'to', 'a', 'summer\'s', 'day?'].map(renderWord)}{' '}
                                    <br />
                                    {['Thou', 'art', 'more', 'lovely', 'and', 'more', 'temperate:'].map(renderWord)}{' '}
                                    <br />
                                    {['Rough', 'winds', 'do', 'shake', 'the', 'darling', 'buds', 'of', 'May,'].map(renderWord)}{' '}
                                    <br />
                                    {['And', 'summer\'s', 'lease', 'hath', 'all', 'too', 'short', 'a', 'date:'].map(renderWord)}{' '}
                                </p>
                                {/* Second Quatrain */}
                                <p>
                                    {['Sometime', 'too', 'hot', 'the', 'eye', 'of', 'heaven', 'shines,'].map(renderWord)}{' '}
                                    <br />
                                    {['And', 'often', 'is', 'his', 'gold', 'complexion', 'dimmed,'].map(renderWord)}{' '}
                                    <br />
                                    {['And', 'every', 'fair', 'from', 'fair', 'sometime', 'declines,'].map(renderWord)}{' '}
                                    <br />
                                    {['By', 'chance,', 'or', 'nature\'s', 'changing', 'course', 'untrimmed:'].map(renderWord)}{' '}
                                </p>
                                {/* Third Quatrain */}
                                <p>
                                    {['But', 'thy', 'eternal', 'summer', 'shall', 'not', 'fade,'].map(renderWord)}{' '}
                                    <br />
                                    {['Nor', 'lose', 'possession', 'of', 'that', 'fair', 'thou', 'ow\'st,'].map(renderWord)}{' '}
                                    <br />
                                    {['Nor', 'shall', 'death', 'brag', 'thou', 'wander\'st', 'in', 'his', 'shade,'].map(renderWord)}{' '}
                                    <br />
                                    {['When', 'in', 'eternal', 'lines', 'to', 'time', 'thou', 'grow\'st:'].map(renderWord)}{' '}
                                </p>
                                {/* Final Couplet */}
                                <p>
                                    {['So', 'long', 'as', 'men', 'can', 'breathe,', 'or', 'eyes', 'can', 'see,'].map(renderWord)}{' '}
                                    <br />
                                    {['So', 'long', 'lives', 'this,', 'and', 'this', 'gives', 'life', 'to', 'thee.'].map(renderWord)}{' '}
                                </p>
                              </div>
                        </div>
                            {!isSecondState && (
                                <button
                                    className="combination-button"
                                    style={{
                                        marginTop: '20px',
                                        padding: '10px 20px',
                                        borderRadius: '5px',
                                        border: 'none',
                                        cursor: 'pointer',
                                    }}
                                    onClick={handleSubmitCombination}
                                >
                                    Submit Combination
                                </button>
                            )}
                        </div>
                      );
            case 3:
                return (
                    <div>
                        <p
                          style={{
                            fontFamily: "'Lora', serif",
                            color: '#fff',
                            fontSize: '18px',
                            marginBottom: '20px',
                            fontStyle: 'italic',
                          }}
                        >
                            Quite impressive!<br />
                            In order to move on to the next Sonnet,<br />
                            You will have to solve the following math equation:<br />
                            The No. of the previous sonnet + the secret No. = The No. of the next sonnet.<br />
                            Solve the following riddle and you will find the secret No!
                        </p>
                        <p                       >
                            I'm a tiny word with a powerful role, < br />
                            Connecting places, intentions, or goal. < br />
                            What am I?
                        </p>
                        <input
                            type="text"
                            value={inputOne}
                            onChange={handleInputOneChange}
                            placeholder="Prev. Sonnet"
                            style={{
                                padding: '15px 25px',
                                borderRadius: '8px',
                                border: '1px solid #4c2a4f',
                                width: '80px',
                                textAlign: 'center',
                            }}
                        />
                        <span
                            style={{
                                margin: '0 10px',
                                color: '#fff',
                                fontSize: '25px',
                                fontWeight: 'bold',
                            }}
                        >
                            +
                        </span>
                        <input
                            type="text"
                            value={inputTwo}
                            onChange={handleInputTwoChange}
                            placeholder="Secret No."
                            style={{
                                padding: '15px 25px',
                                borderRadius: '8px',
                                border: '1px solid #4c2a4f',
                                width: '80px',
                                textAlign: 'center',
                            }}
                        />
                        <span
                            style={{
                                margin: '0 10px',
                                color: '#fff',
                                fontSize: '25px',
                                fontWeight: 'bold',
                            }}
                        >
                            =
                        </span>
                        <button
                            onClick={handleThirdPageSubmit}
                            className="submit-button"
                        >
                            Submit
                        </button>

                        {showConfetti && <Confetti />}
                    </div>
                );

            case 4:
                return (
                    <div>
                        <p
                            style={{
                                fontFamily: "'Lora', serif",
                                color: '#fff',
                                fontSize: '18px',
                                marginBottom: '20px',
                                fontStyle: 'italic',
                            }}
                        >
                            You have journeyed through riddles and challenges,<br />
                            overcome trials of wit and perseverance, and proven your mastery of Shakespeare's artful words.<br />
                            Hidden within the verses of Sonnet 20 lies a single line, <br />
                            a clue that unlocks the treasure long sought after. <br />
                            Search with care, for only the keenest of minds and the sharpest of eyes can unveil the mystery.
                        </p>
                        <p
                            style={{
                                fontSize: '18px',
                                lineHeight: '1.8',
                                whiteSpace: 'pre-wrap', // Preserve line breaks
                                marginBottom: '20px',
                                textAlign: 'left',
                                paddingLeft: '180px',
                            }}
                        >
                            {sonnet20}
                        </p>
                        <input
                            type="text"
                            value={finalInput}
                            onChange={handleFinalInputChange}
                            placeholder="Enter the secret line of the sonnet"
                            className="input-bar"
                        />
                        <button
                            onClick={handleFinalSubmit}
                            className="enter-button"
                        >
                            Submit
                        </button>
                        {isFinalCorrect && <Confetti />}
                    </div>         
                );
            default:
                return null;
        }
    };

    const handleSubmitCombination = () => {
        // Check if selected words match the correct words
            const isValidCombination =
            interactiveWords.length === correctWords.length &&
            correctWords.every((word) => interactiveWords.includes(word));

        if (!isValidCombination) {
            alert('Incorrect combination! Try again.');
            return;
        }

        setIsSecondState(true); // Transition to State 2
        setInteractiveWords(correctWords); // Keep only correct words interactive
    };

    const renderWord = (word, index) => {
        const isHighlighted = interactiveWords.includes(word);
        const isCorrect = correctWords.includes(word);
        const isClickable = !isSecondState || isCorrect;
    
        return isClickable ? (
            <span
                key={`${word}-${index}`}
                className="highlight-button"
                style={{
                    cursor: 'pointer',
                    backgroundColor: isHighlighted ? '#4c2a4f' : 'transparent',
                    color: isHighlighted ? '#fff' : '#ffe4b5',
                    fontWeight: isHighlighted ? 'bold' : 'normal',
                    padding: '2px 8px', // Add padding for spacing
                    margin: '0 4px', // Additional margin for even spacing
                    borderRadius: '4px',
                    transition: 'all 0.2s ease',
                }}
                onClick={() => {
                  handleWordClick(word);
                  if (isCorrect && isSecondState) handleWordAudio(word);
                }}

            >
                {word}
            </span>
        ) : (
            <span
                key={`${word}-${index}`}
                style={{
                    margin: '0 4px', // Add spacing for plain text words as well
                }}
            >
                {word}
            </span>
        );
    };

    return (
        <div>
            <Navbar />
            <Banner />
            <section
                id="home"
                style={{
                    backgroundColor: '#f5deb3', // Light brown
                    color: '#4c2a4f', // Deep burgundy text
                    minHeight: '80vh', // Full viewport height
                    display: 'flex', // Enable Flexbox
                    flexDirection: 'column', // Align items vertically
                    alignItems: 'center', // Center horizontally
                    textAlign: 'center', // Center-align text
                }}
            >
                <h1>Story</h1>
                <p>After Shakespeare's death, rumors spread of a hidden treasure left for the 3rd Earl of Southampton, his rumored muse and patron. < br />
                The treasure is locked in a mysterious box, sealed with riddles designed to test the Earl's connection to Shakespeare's deepest feelings. < br />
                To open the box, he must prove he is worthy of the Bard's immortal love by solving the puzzles. < br />
                The key to unlocking the treasure lies in a line from one of Shakespeare's sonnets. < br />
                But which one? Time is running out, and the Earl needs your help to uncover the truth and claim his rightful legacy!
                </p>
                <img
                    src="/Treasure.webp"
                    alt="Treasure Chest"
                    style={{
                        marginTop: '20px',
                        maxWidth: '50%',
                        height: 'auto',
                        borderRadius: '10px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    }}
                />
            </section>
            <section
            
                id="minigame"
                style={{
                    backgroundColor: '#4c2a4f',
                    color: '#f5deb3',
                    minHeight: '90vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    padding: '60px 100px',
                    position: 'relative',
                }}
            >
              <h1>Escape Room</h1>
                  <div style={{ fontFamily: "'Lora', serif", lineHeight: '1.8', marginTop: '20px', paddingBottom: '20px' }}>
                      {renderPageContent()}
                  </div>
                  <div
                      style={{
                          position: 'absolute',
                          bottom: '20px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          display: 'flex',
                          justifyContent: 'center',
                          gap: '10px',
                      }}
                  >
                      <button
                          className = "navigation-button"
                          onClick={handlePrevious}
                          disabled={currentPage === 1}
                          style={{
                              padding: '10px 20px',
                              borderRadius: '5px',
                              color: '#fff',
                              border: 'none',
                              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                              fontSize: '16px',
                          }}
                      >
                          Previous
                      </button>
                      <button
                          className = "navigation-button"
                          onClick={handleNext}
                          disabled={(currentPage === 1 && !isRiddleCorrect) || (currentPage === 2 && !isSecondState) || (currentPage === 3 && !isThirdPageCorrect) || currentPage === 4}
                          style={{
                              padding: '10px 20px',
                              borderRadius: '5px',
                              color: '#fff',
                              border: 'none',
                              cursor: currentPage === 4 ? 'not-allowed' : 'pointer',
                              fontSize: '16px',
                          }}
                      >
                          Next
                      </button>
                  </div>
            </section>
        </div>
    );
};

export default App;