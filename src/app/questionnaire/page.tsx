"use client";

import { useState } from "react";
import { QuestionnaireBreadcrumbs } from "../components/QuestionnaireBreadcrumbs";
import { LabeledInput } from "../components/LabeledInput";
import { AffinityInput } from "../components/AffinityInput";
import { getQuestions } from "../utils/getQuestions";

enum QuestionOptions {
  music = "music",
  movies = "movies",
  interests = "interests",
  phobias = "phobias",
  personality = "personality",
  habits = "habits"
}

interface Question {
  index: number,
  message: string,
  options: {left: string, right: string},
}

export default function Home() {
  const [pageStep, setPageStep] = useState(1);
  const [questionnaireStep, setQuestionnaireStep] = useState<number>(1);
  const [internalStep, setInternalStep] = useState<number>(1);
  const [dataPermissions, setDataPermissions] = useState<boolean>(false);

  const [age, setAge] = useState<number | undefined>(undefined);
  const [height, setHeight] = useState<number | undefined>(undefined);
  const [weight, setWeight] = useState<number | undefined>(undefined);
  const [siblingCount, setSiblingCount] = useState<number | undefined>(undefined);
  const [gender, setGender] = useState<string | undefined>(undefined);
  const [handedness, setHandedness] = useState<string | undefined>(undefined);
  const [educationLevel, setEducationLevel] = useState<number | undefined>(undefined);
  const [citification, setCitification] = useState<boolean | undefined>(undefined);

  const [answerList, setAnswerList] = useState({    
    "music": {},
    "movies": {},
    "interests": {},
    "phobias": {},
    "personality": {},
    "habits": {}
  });

  const [currentQuestionState, setCurrentQuestionState] = useState([false, false, false, false]);

  const answerQuestion = (questionType: QuestionOptions, questionIndex: number, answer: number) => {
    let newList: any = answerList;
    newList[questionType][questionIndex] = answer;
    setAnswerList(newList);

    let newQuestionState = currentQuestionState;
    newQuestionState[questionIndex-((internalStep-1)*questionsPerPage)] = true;
    setCurrentQuestionState(newQuestionState)
  }

  const getOptions = (options: string) => {
    const agreeDisagreeOptions = {left: 'Strongly disagree', right: 'Strongly agree'}
    const musicPaceOptions = {left: 'Slow paced music', right: 'Fast paced music'}
    const defaultOptions = {left: "Don't enjoy at all", right: "Enjoy very much"}

    switch(options) {
      default: return defaultOptions;
      case "agree-disagree": return agreeDisagreeOptions;
      case "music-pace": return musicPaceOptions;
    }
  }

  const getQuestionsByType = (questionType: QuestionOptions) => {
    const questions = getQuestions();

    let filteredQuestions: any = questions[questionType];
    const questionCount = Object.keys(filteredQuestions).length;
    let questionArray = []
    for(let i = 0; i < questionCount; i++) {
      let question: Question = {
        index: i,
        message: '',
        options: {left: '', right: ''},
      }
      question.message = filteredQuestions[i].message;
      question.options = getOptions(filteredQuestions[i].options);
      questionArray.push(question);
    }
    return questionArray;
  }

  const musicQuestions = getQuestionsByType("music" as QuestionOptions);
  // const moviesQuestions = getQuestionsByType("movies" as QuestionOptions);
  // const interestsQuestions = getQuestionsByType("interests" as QuestionOptions);
  // const phobiasQuestions = getQuestionsByType("phobias" as QuestionOptions);
  // const personalityQuestions = getQuestionsByType("personality" as QuestionOptions);
  // const habitsQuestions = getQuestionsByType("habits" as QuestionOptions);

  const questionsPerPage = 4;

  const handleNextStep = () => {
    setQuestionnaireStep(questionnaireStep + 1);
    setInternalStep(1);
  }

  const handleNextStepQuestions = (questionsInPage: number) => {
    let questionState = [true, true, true, true]
    for(let i = 0; i < questionsInPage; i++) {
      questionState[i] = currentQuestionState[i]
    }

    if(JSON.stringify(questionState) == JSON.stringify([true, true, true, true])) {
      setQuestionnaireStep(questionnaireStep + 1);
      setInternalStep(1);
      setCurrentQuestionState([false, false, false, false]);
      console.log(answerList);
    }  
  }  

  const handleNextPage = () => {
    if(JSON.stringify(currentQuestionState) == JSON.stringify([true, true, true, true])) {
      setInternalStep(internalStep + 1)
      setCurrentQuestionState([false, false, false, false]);
    }
  }

  const introPrompt = () => {
    return (
      <>    
        <div className="border border-solid border-slate-700 rounded-lg">
          <div className="px-2 py-2">
            <p className="py-2">
              Queremos asegurarnos de que tengas la mejor experiencia posible al encontrar compañeros de viaje que se adapten a tus preferencias y personalidad.
            </p>
            <p className="py-2">
              Para lograrlo, te animamos a responder las siguientes preguntas. 
            </p>    
          </div>
        </div>
        <button onClick={() => {setPageStep(pageStep + 1)}} className="btn btn-secondary my-6">Next</button>
      </>
    )
  }
  
  const confirmationPrompt = () => {
    return (
      <>
        <div className="border border-solid border-slate-700 rounded-lg">
          <div className="px-2 py-2">
            <p className="py-2">
              Queremos ser transparentes contigo: para ofrecerte los mejores resultados posibles, nuestra aplicación utiliza un modelo inteligente que toma en cuenta la información que proporcionas.
            </p>
            <p className="py-2">
              Si estás de acuerdo en permitir que utilicemos los datos que proporciones para ofrecerte la mejor experiencia, te damos las gracias por tu confianza.
            </p>
            <p className="py-2">
              ¡Estamos emocionados de acompañarte en tus próximas aventuras!
            </p>
          </div>
        </div>
        <div onClick={() => {setDataPermissions(!dataPermissions)}} className="flex pt-8">
          <input readOnly type="checkbox" checked={dataPermissions} className="checkbox" />
            <p className="px-4">
              Acepto compartir mi información
            </p>
        </div>
        <button disabled={!dataPermissions} onClick={() => {setPageStep(pageStep + 1)}} className="btn btn-secondary my-6">Next</button>
      </>
    )
  }

  const renderQuestionnaire = () => {
    switch(questionnaireStep) {
      default:
        return (
          <>
          </>
        )
        case 1:
          switch(internalStep) {
            default:
              return (
                <>
                </>
              )
            case 1:
              return (
                <>
                  <h1 className="text-3xl font-bold pb-6">
                    Acerca de ti (1/2)
                  </h1>
                  <LabeledInput label="Age" updateValue={setAge}></LabeledInput>
                  <LabeledInput label="Height" updateValue={setHeight}></LabeledInput>
                  <LabeledInput label="Weight" updateValue={setWeight}></LabeledInput>
                  <LabeledInput label="Gender" updateValue={setGender}></LabeledInput>
                  <button onClick={() => {setInternalStep(internalStep + 1)}} className="btn btn-secondary my-6">Next</button>
                </>     
              )
            case 2:
              return (
                <>
                  <h1 className="text-3xl font-bold pb-6">
                    Acerca de ti (2/2)
                  </h1>
                  <LabeledInput label="Number of siblings" updateValue={setSiblingCount}></LabeledInput>
                  <LabeledInput label="Handedness" updateValue={setHandedness}></LabeledInput>
                  <LabeledInput label="Education" updateValue={setEducationLevel}></LabeledInput>
                  <LabeledInput label="Growing up" updateValue={setCitification}></LabeledInput>          
                  <button onClick={handleNextStep} className="btn btn-secondary my-6">Next</button>
                </>
              )
          }
        case 2:
          const questionsInPage = musicQuestions.slice((internalStep - 1)*questionsPerPage, internalStep*questionsPerPage)
          return (
            <>
              <h1 className="text-3xl font-bold pb-6">
                Musica ({internalStep}/{Math.trunc(musicQuestions.length / questionsPerPage) + 1})
              </h1>
              {questionsInPage.map((question, index) => {
                return (
                  <AffinityInput key={index} question={question} questionType={"music" as QuestionOptions} answerQuestion={answerQuestion}></AffinityInput>
                )
              })}
              <button onClick={() => {questionsInPage.length == questionsPerPage ? handleNextPage() : handleNextStepQuestions(questionsInPage.length)}} className="btn btn-secondary mt-10">Next</button>
            </>     
          )   
    }  
  }

  const renderHeader = () => {
    switch(pageStep) {
      default:
        return (
          <h1 className="text-4xl font-bold pt-2 pb-8">
            Conociéndote
          </h1>
        )
      case 3:
        return (
          <>
          </>
        )   
    }
  }

  const renderContent = () => {
    switch(pageStep) {
      default:
        return (
          <>
          </>
        )
      case 1:
        return (
          introPrompt()
        )
      case 2:
        return (
          confirmationPrompt()
        )
      case 3:
        return (
          renderQuestionnaire()
        )
    }
  }

  return (
    <>
      {
        pageStep == 3 && 
          <QuestionnaireBreadcrumbs questionnaireStep={questionnaireStep} setQuestionnaireStep={setQuestionnaireStep}></QuestionnaireBreadcrumbs>
      }
      <div className="flex-grow flex flex-col items-center pt-10">
        <div className="w-1280 flex flex-col items-center">
          <div className="w-1/2 flex flex-col items-center text-center py-4">
            { renderHeader()}
            { renderContent() }
          </div>
        </div>
      </div>
    </>
  )
}