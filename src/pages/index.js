import React from 'react';
import Helmet from "react-helmet";
import "../styles.scss"

// markup
const IndexPage = () => {
  const [answers, setAnswers] = React.useState({});
  const [currentAnswer, setCurrentAnswer] = React.useState("");
  const [number, setNumber] = React.useState(1);
  const [unfilledAnswer, setUnfilledAnswer] = React.useState(false);
  const allQuestions = {1:{"question":"Will this be your first dog? If not, what experience do you have owning/training dogs?","header":"Introduction"},2:{"question":"Do you have a preference for rescuing a dog vs. going through a <a href='http://ownresponsibly.blogspot.com/2011/07/identifying-reputable-breeder.html'>reputable breeder?</a>","header":"Introduction"},3:{"question":"Describe your ideal dog.","header":"Introduction"},4:{"question":"What breeds or types of dogs are you interested in and why?","header":"Introduction"},5:{"question":"What sorts of things would you like to train your dog to do?","header":"Introduction"},6:{"question":"Do you want to compete with your dog in a sport (e.g. agility, obedience, rally) or use your dog for a form of work (e.g. hunting, herding, livestock guarding)? If so, how much experience do you have with this work/sport?","header":"Introduction"},7:{"question":"How long do you want to devote to training, playing with, or otherwise interacting with your dog each day?","header":"Care Commitments"},8:{"question":"How long can you exercise your dog each day, on average? What sorts of exercise are you planning to give your dog regularly and does that include using a dog park?","header":"Care Commitments"},9:{"question":"How much regular brushing are you willing to do? Are you open to trimming hair, cleaning ears, or doing other grooming at home? If not, would you be willing to pay a professional to do it regularly?","header":"Care Commitments"},10:{"question":"What size dog are you looking for?","header":"Personal Preferences"},11:{"question":"How much shedding, barking, and slobber can you handle?","header":"Personal Preferences"},12:{"question":"How important is being able to let your dog off-leash in an unfenced area?","header":"Personal Preferences"},13:{"question":"Do you want a snuggly dog or one that prefers some personal space?","header":"Dog Personality and Behavior"},14:{"question":"Would you prefer a dog that wants to do its own thing or one that’s more eager-to-please?","header":"Dog Personality and Behavior"},15:{"question":"How would you prefer your dog to respond to someone knocking on the door or entering your yard? How would you prefer your dog to greet strangers or visitors?","header":"Dog Personality and Behavior"},16:{"question":"Are you willing to manage a dog that is aggressive to other dogs?","header":"Dog Personality and Behavior"},17:{"question":"Are there any other behaviors you can’t deal with or want to avoid?","header":"Dog Personality and Behavior"},18:{"question":"How often and how long will the dog be left alone?","header":"Lifestyle"},19:{"question":"What are the dog-related preferences of other people in the house and what will be their involvement in caring for the dog?","header":"Lifestyle"},20:{"question":"Do you have other pets or are you planning on having other pets? What breed or type of animal are they?","header":"Lifestyle"},21:{"question":"Will the dog be interacting with children regularly?","header":"Lifestyle"},22:{"question":"Do you rent or plan to rent in the future? If applicable, what breed or weight restrictions are on your current lease?","header":"Lifestyle"},23:{"question":"What city or country do you live in and are you aware of any laws banning certain breeds?","header":"Lifestyle"},24:{"question":"What is the average temperature of a typical summer and winter day where you live?","header":"Lifestyle"},25:{"question":"Please provide any additional information you feel may be relevant.","header":"Additional Information and Questions"},26:{"question":"Feel free to ask any questions below.","header":"Additional Information and Questions"}}
  const allQuestionsLength = Object.keys(allQuestions).length
  const [copySucceeded, setCopySucceeded] = React.useState(true);
  const [postTitle, setPostTitle] = React.useState("Breed Survey");
  const [viewFullForm, setViewFullForm] = React.useState(true);
  const [emptyAnswers, setEmptyAnswers] = React.useState(false);
  const [finishedFullForm, setFinishedFullform] = React.useState(false);

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
  const isLeftPressed = useKeyPress("ArrowLeft");

  const goBackOne = () => {
    if (viewFullForm===false){
      storeAnswerAndStep(-1);
    }else{
      setFinishedFullform(false);
    }
  }

  React.useEffect(() => {
    if (isRightPressed === true&&viewFullForm===false){
      storeAnswerAndStep(1);
    }
  }, [isRightPressed])

  React.useEffect(() => {
    goBackOne();
  }, [isLeftPressed])

  React.useEffect(() => {
    if (answers.hasOwnProperty(number)){
      setCurrentAnswer(answers[number]);
    }
    if (document.getElementById("questionHere")){
      document.getElementById("questionHere").innerHTML = allQuestions[number].question;
    }
  }, [number])

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

  const storeAnswer = () => {
    let cloneJson = copyJSON(answers);
    cloneJson[number] = currentAnswer;
    setAnswers(cloneJson);
  }

  const storeAnswerAndStep = async (steps) => {
    //steps is how many to go backwards or forwards
    delay(100);
    if (currentAnswer!==""&&steps===1){
      storeAnswer();
      setNumber(number+steps);
      setCurrentAnswer("");
      setUnfilledAnswer(false);
      if (document.getElementById("Current Question")){
        document.getElementById("Current Question").focus();
      }
    }else if (steps===-1){
      if (number !== 1){
        if (number<=allQuestionsLength) {storeAnswer()};
        setNumber(number+steps);
        setUnfilledAnswer(false);
      }
      if (document.getElementById("Current Question")){
        document.getElementById("Current Question").focus();
      }
      //user trying to get to next page without filling out current one
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

  const getPrefilledLink = (postTitle, text) => {
    return "https://www.reddit.com/r/dogs/submit?selftext=true&title="+encodeURIComponent(postTitle)+"&text="+encodeURIComponent(text);
  }

  const getCopyPaste = () => {
    var newText = "";
    var currHeader = ""
    for (var questionNumber of Object.keys(allQuestions)){
      if (allQuestions[questionNumber].header!==currHeader){
        newText = newText.concat("**").concat(allQuestions[questionNumber].header).concat("** \n\n");
        currHeader = allQuestions[questionNumber].header;
      }
      var currQuestion = allQuestions[questionNumber].question.replace(/<[^>]*>/g, '');
      newText = newText.concat(questionNumber).concat(") ").concat(currQuestion).concat("\n\n - ").concat(answers[questionNumber]).concat("\n\n")

    }
    return (
      <div className="infoFullView">
        <form onSubmit={(e) => {e.preventDefault()}}>
          <label htmlFor="postTitle">Post Title</label>
          <input type="text" id="postTitle" value={postTitle} onChange={(e) => {setPostTitle(e.target.value)}} placeholdertext = {postTitle}></input>
        </form>
        <textarea
        cols = "100"
        rows = "30"
        value={newText}
        onChange={(e) => {newText=e.target.value}}
        placeholdertext = {newText}>
        </textarea><br />
        <button onClick={() => {getCopyPasteText(newText)}} className="styleButton">Copy Text?</button>
        <button className="styleButton"><a href={getPrefilledLink(postTitle, newText)} target="_blank" rel="noreferrer noopener">Post to /r/dogs?</a></button><br /><br />
        <button onClick={() => {console.log("go back"); goBackOne()}} className="styleButton">Go Back</button>
        {copySucceeded===false?<div>Copy failed in this browser</div>:<div></div>}

      </div>
    );
  }

  const singleViewForm = () => {
    if (allQuestions.hasOwnProperty(number)){
      var question = allQuestions[number].question;
      var header = allQuestions[number].header;
      return (
        <div className="info">
          <h1>What Breed is Right For Me?</h1>
          <h2>{header}</h2>
          {unfilledAnswerResponse()}
          <form>
            <label htmlFor={"Current Question"}>{number}. <span id="questionHere">{question}</span></label><br />
            <textarea id={"Current Question"}
                      cols = "70"
                      rows = "15"
                      placeholdertext={currentAnswer}
                      value={currentAnswer}
                      onBlur={(e) => {setCurrentAnswer(e.target.value)}}
                      onChange={(e) => {setCurrentAnswer(e.target.value)}}></textarea><br />
            {number!==1?<button onClick={(e) => {e.preventDefault(); storeAnswerAndStep(-1);}}  aria-label="Previous Question" className="styleButton">Previous Question</button>:<div></div>}
            <button onClick={(e) => {e.preventDefault(); storeAnswerAndStep(1);}}  aria-label="Next Question" className="styleButton">Next Question</button>
          </form>
        </div>
      )
    }else {
      return getCopyPaste()
    }
  }

  //start of full view form code
  //convert all the questions from plain text to HTML
  const addHTML = () => {
    //go through and add html
    if (viewFullForm===true&&finishedFullForm===false){
      Object.keys(allQuestions).forEach((key) => {document.getElementById("questionHere "+key).innerHTML=allQuestions[key].question})
      Object.keys(answers).forEach((key) => {document.getElementById("Current Question "+key).value=answers[key]})
    }else if (viewFullForm===false){
      if (document.getElementById("questionHere")){
        document.getElementById("questionHere").innerHTML = allQuestions[number].question;
      }
    }
    setUnfilledAnswer(false);
  }

  React.useEffect(()=>{
    addHTML()
  }, [finishedFullForm])

  React.useEffect(()=>{
    addHTML()
  }, [viewFullForm])

  //find first missing number in sequence so that user can switch back to the page by page view
  //source is user answer keys. this is binary search https://stackoverflow.com/questions/18853280/find-first-missing-number-in-a-sequence-of-numbers
  const findFirstMissing = (source, min = 0, max = source.length) => {
    if(min >= max){
        return min + 1;
    }
    let pivot = Math.floor((min + max)/2);
    if(source[pivot] === pivot + 1){
        return findFirstMissing(source, pivot + 1, max);
    } else {
        return findFirstMissing(source, min , pivot);
    }
  }

  const setAnswerInJson = (currNumber) => {
    var cloneJson = copyJSON(answers);
    cloneJson[currNumber] = currentAnswer;
    setAnswers(cloneJson);
  }

  const deleteAnswerInJson = (currNumber) => {
    var cloneJson = copyJSON(answers);
    delete cloneJson[currNumber]
    setAnswers(cloneJson);
  }

  const fullViewFormElement = (currNumber=1) => {
    return (
      <div>
      <form>
        <label htmlFor={"Current Question"} id={"Current Question Label "+currNumber}>{currNumber}. <span id={"questionHere "+currNumber}></span></label><br />
        <textarea id={"Current Question "+currNumber}
                  cols = "70"
                  rows = "15"
                  placeholdertext={number===currNumber?currentAnswer:answers[currNumber]}
                  onFocus={() => {setCurrentAnswer(answers[currNumber]); setNumber(currNumber)}}
                  onBlur={(e) => {if(e.target.value&&e.target.value!==""){setAnswerInJson( currNumber)}else if (answers.hasOwnProperty(currNumber)){deleteAnswerInJson(currNumber) }}}
                  onChange={(e) => {setNumber(parseInt(currNumber)); setCurrentAnswer(e.target.value)}}></textarea><br />
      </form>
      </div>
    )
  }

  const checkFinishedFullForm = () => {
    if (Object.keys(answers).length!==Object.keys(allQuestions).length){
      setEmptyAnswers(true);
      Object.keys(allQuestions).forEach(currNumber => {
        let intNumber = parseInt(currNumber);
        if (answers.hasOwnProperty(intNumber)===false){
          document.getElementById("Current Question Label "+intNumber).className += " unfilledQuestion"
        }else {
          document.getElementById("Current Question Label "+intNumber).className = ""
        }

      })
    }else{
      setEmptyAnswers(false);
      setFinishedFullform(true);
    }
  }

  const fullForm = () => {
    if (finishedFullForm===true){
      return getCopyPaste()
    }else{
      return (
        <div className="infoFullView">
          {Object.keys(allQuestions).map((key) => fullViewFormElement(parseInt(key)))}
          {emptyAnswers===true?<div className="reminder">Please fill in highlighted answers</div>:<div></div>}
          <button className="styleButton" onClick={() => {checkFinishedFullForm()}}>Finished?</button>
        </div>
      )
    }
  }

  const fixedArrowButton = () => {
    if (viewFullForm===false){
      return (
        <div className="fixedArrow">
          <button onClick={() => {setFinishedFullform(false); setViewFullForm(true); if (currentAnswer!==""){storeAnswer();}}} id="full-form" className="styleButton">View Full Form</button>Arrow Keys or Buttons to Navigate<i className="arrow right"></i><i className="arrow right"></i>
        </div>
      )
    }else{
      return (
        <div className="fixedArrow"><button onClick={() => {setNumber(findFirstMissing(Object.keys(answers).map((singleAnswer) => parseInt(singleAnswer)))); setCurrentAnswer(""); setViewFullForm(false);}} id="full-form" className="styleButton">View Single Page Form</button></div>
      )
    }
  }

  return (
    <div className="infoFullView">
    <h1>What Breed is Right For Me?</h1>
    <Helmet title="What Breed is Right For Me?" defer={false} />
      {viewFullForm===false?singleViewForm():fullForm()}
    </div>
  )
}


export default IndexPage
