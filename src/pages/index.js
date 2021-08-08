import React from 'react';
import Helmet from "react-helmet";
import "../styles.scss"

// markup
const IndexPage = () => {
  const [answers, setAnswers] = React.useState({});
  const [currentAnswer, setCurrentAnswer] = React.useState("");
  const [number, setNumber] = React.useState(1);
  const [unfilledAnswer, setUnfilledAnswer] = React.useState(false);
  const allQuestions = {"1":{"question":"Will this be your first dog? If not, what experience do you have owning/training dogs?","header":"Introduction"},"2":{"question":"Do you have a preference for rescuing a dog vs. going through a reputable breeder?","header":"Introduction"},"3":{"question":"Describe your ideal dog.","header":"Introduction"},"4":{"question":"What breeds or types of dogs are you interested in and why?","header":"Introduction"},"5":{"question":"What sorts of things would you like to train your dog to do?","header":"Introduction"},"6":{"question":"Do you want to compete with your dog in a sport (e.g. agility, obedience, rally) or use your dog for a form of work (e.g. hunting, herding, livestock guarding)? If so, how much experience do you have with this work/sport?","header":"Introduction"},"7":{"question":"How long do you want to devote to training, playing with, or otherwise interacting with your dog each day?","header":"Care Commitments"},"8":{"question":"How long can you exercise your dog each day, on average? What sorts of exercise are you planning to give your dog regularly and does that include using a dog park?","header":"Care Commitments"},"9":{"question":"How much regular brushing are you willing to do? Are you open to trimming hair, cleaning ears, or doing other grooming at home? If not, would you be willing to pay a professional to do it regularly?","header":"Care Commitments"},"10":{"question":"What size dog are you looking for?","header":"Personal Preferences"},"11":{"question":"How much shedding, barking, and slobber can you handle?","header":"Personal Preferences"},"12":{"question":"How important is being able to let your dog off-leash in an unfenced area?","header":"Personal Preferences"},"13":{"question":"Do you want a snuggly dog or one that prefers some personal space?","header":"Dog Personality and Behavior"},"14":{"question":"Would you prefer a dog that wants to do its own thing or one that’s more eager-to-please?","header":"Dog Personality and Behavior"},"15":{"question":"How would you prefer your dog to respond to someone knocking on the door or entering your yard? How would you prefer your dog to greet strangers or visitors?","header":"Dog Personality and Behavior"},"16":{"question":"Are you willing to manage a dog that is aggressive to other dogs?","header":"Dog Personality and Behavior"},"17":{"question":"Are there any other behaviors you can’t deal with or want to avoid?","header":"Dog Personality and Behavior"},"18":{"question":"How often and how long will the dog be left alone?","header":"Lifestyle"},"19":{"question":"What are the dog-related preferences of other people in the house and what will be their involvement in caring for the dog?","header":"Lifestyle"},"20":{"question":"Do you have other pets or are you planning on having other pets? What breed or type of animal are they?","header":"Lifestyle"},"21":{"question":"Will the dog be interacting with children regularly?","header":"Lifestyle"},"22":{"question":"Do you rent or plan to rent in the future? If applicable, what breed or weight restrictions are on your current lease?","header":"Lifestyle"},"23":{"question":"What city or country do you live in and are you aware of any laws banning certain breeds?","header":"Lifestyle"},"24":{"question":"What is the average temperature of a typical summer and winter day where you live?","header":"Lifestyle"},"25":{"question":"Please provide any additional information you feel may be relevant.","header":"Additional Information and Questions"},"26":{"question":"Feel free to ask any questions below.","header":"Additional Information and Questions"}}
  const [copySucceeded, setCopySucceeded] = React.useState(true);
  const [viewFullForm, setViewFullForm] = React.useState(true);
  const [finalScreen, setFinalScreen] = React.useState(false);

  const useKeyPress = (targetKey) => {
    const [keyPressed, setKeyPressed] = React.useState(false)
    const downHandler = ({ key }) => {
      if (key === targetKey) {
        setKeyPressed(true)
      }
    }
    const upHandler = ({ key }) => {
      if (key === targetKey) {
        setKeyPressed(false)
      }
    }
    React.useEffect(() => {
      window.addEventListener('keydown', downHandler)
      window.addEventListener('keyup', upHandler)
      return () => {
        window.removeEventListener('keydown', downHandler)
        window.removeEventListener('keyup', upHandler)
      }
    }, [])
    return keyPressed
  }

  const isRightPressed = useKeyPress('ArrowRight');

  React.useEffect(() => {
    if (isRightPressed === true){
      storeAnswer()
    }
  }, [isRightPressed])

  const copyJSON = (obj) => {
    return JSON.parse(JSON.stringify(obj))
  }

  const unfilledAnswerResponse = () => {
    if (unfilledAnswer === true){
      return (
        <p className="reminder">Please fill in answer</p>
      )
    }else{
      return (<div></div>)
    }
  }

  const delay = ms => new Promise(res => setTimeout(res, ms));

  const storeAnswer = async () => {
    await delay(150);
    if (currentAnswer!==""){
      let cloneJson = copyJSON(answers);
      cloneJson[number] = currentAnswer;
      setAnswers(cloneJson);
      setCurrentAnswer("");
      setNumber(number+1);
      setUnfilledAnswer(false);
      if (document.getElementById("Current Question")){
        document.getElementById("Current Question").focus();
      }

    }else {
      setUnfilledAnswer(true);
    }
  }

  const getCopyPasteText = (text) => {
    navigator.clipboard.writeText(text).then(function() {
    }, function(err) {
      console.error('Async: Could not copy text: ', err);
      setCopySucceeded(false);
    });
  }

  const getCopyPaste = () => {
    var newText = "";
    var currHeader = ""
    for (var questionNumber of Object.keys(allQuestions)){
      if (allQuestions[questionNumber].header!==currHeader){
        newText = newText.concat("**").concat(allQuestions[questionNumber].header).concat("** \n\n");
        currHeader = allQuestions[questionNumber].header;
      }
      newText = newText.concat(questionNumber).concat(") ").concat(allQuestions[questionNumber].question).concat("\n\n").concat(answers[questionNumber]).concat("\n\n")

    }
    return (
      <div className="info">
        <textarea
        cols = "100"
        rows = "30"
        value={newText}
        onChange={(e) => {newText=e.target.value}}
        placeholdertext = {newText}>
        </textarea>
        <button onClick={() => {getCopyPasteText(newText)}} className="styleButton">Copy Text?</button><br /><br />
        {copySucceeded===false?<div>Copy failed in this browser</div>:<div></div>}

      </div>
    );
  }


  const formElement = () => {
    if (allQuestions.hasOwnProperty(number)){
      var question = allQuestions[number].question;
      var header = allQuestions[number].header;
      return (
        <div className="info">
          <h2>{header}</h2>
          {unfilledAnswerResponse()}
          <form>
            <label htmlFor={"Current Question"}>{number}. {question}</label><br />
            <textarea id={"Current Question"}
                      cols = "70"
                      rows = "15"
                      placeholdertext={currentAnswer}
                      value={currentAnswer}
                      onChange={(e) => {setCurrentAnswer(e.target.value)}}></textarea><br />
            <button onClick={(e) => {e.preventDefault(); storeAnswer();}}  aria-label="Next Question" className="styleButton">Next Question</button>
          </form>
        </div>
      )
    }else {
      return getCopyPaste()
    }
  }

  return (

    <div >
    <Helmet title="Breed Survey" defer={false} />
      {formElement()}
      {finalScreen!==true?<div className="fixedArrow">Arrow or Button to Advance<i class="arrow right"></i><i class="arrow right"></i></div>:<div></div>}

    </div>
  )
}


export default IndexPage
