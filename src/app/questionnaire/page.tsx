"use client";

import { useState } from "react";
import { QuestionnaireBreadcrumbs } from "../components/QuestionnaireBreadcrumbs";
import { LabeledInput } from "../components/LabeledInput";
import { AffinityInput } from "../components/AffinityInput";
import { getQuestions } from "../utils/getQuestions";
import { getQuestionsShort } from "../utils/getQuestionsShort";

enum QuestionOptions {
  music = "music",
  movies = "movies",
  interests = "interests",
  phobias = "phobias",
  spending_habits = "spending_habits",
  habits = "habits",
  personality = "personality"
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

  const [questionType, setQuestionType] = useState(1);

  const [loading, setLoading] = useState(true);

  const [answerList, setAnswerList] = useState({
    "about": {},
    "music": {},
    "movies": {},
    "interests": {},
    "phobias": {},
    "habits": {},
    "spending_habits": {},
    "personality": {}
  });

  const [currentQuestionState, setCurrentQuestionState] = useState([false, false, false, false]);

  const navigate = (newQuestionnaireStep: number) => {
    setCurrentQuestionState([false, false, false, false]);
    setInternalStep(1);
    setQuestionnaireStep(newQuestionnaireStep);
  }

  const answerQuestion = (questionCategory: QuestionOptions, questionIndex: number, answer: number|string) => {
    let newList: any = answerList;
    newList[questionCategory][questionIndex] = answer;
    setAnswerList(newList);

    if(questionType == 2) return;
    if(questionCategory == "about" as QuestionOptions) return;
    
    let newQuestionState = currentQuestionState;
    if (questionIndex > 30 && questionCategory == "personality" as QuestionOptions) questionIndex = questionIndex - 2;
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
    const questions = getQuestionsShort();
    // const questions = getQuestions();

    let filteredQuestions: any = questions[questionType];
    const questionCount = Object.keys(filteredQuestions).length;
    let questionArray = []
    for(let i = 0; i < questionCount; i++) {
      if(questionType == "personality" && (i == 31 || i == 32)) continue;
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
  const moviesQuestions = getQuestionsByType("movies" as QuestionOptions);
  const interestsQuestions = getQuestionsByType("interests" as QuestionOptions);
  const phobiasQuestions = getQuestionsByType("phobias" as QuestionOptions);
  const habitsQuestions = getQuestionsByType("spending_habits" as QuestionOptions);
  const personalityQuestions = getQuestionsByType("personality" as QuestionOptions);

  const questionsPerPage = 4;

  const extraQuestions: any = {
    2: {index: 2, message: 'I live a very healthy lifestyle', options: getOptions('agree-disagree')}
  }

  const handleSubmission = () => {
    console.log(answerList);
    // let newList: any = answerList;
    // newList["about"][0] = age;
    // newList["about"][1] = height;
    // newList["about"][2] = weight;
    // newList["about"][3] = siblingCount ? siblingCount : 0;
    // newList["about"][7] = siblingCount ? 'no' : 'yes';

    // let response = new Array(150);
    // for(let i = 0; i < Object.entries(newList["music"]).length; i++) {
    //   response.splice(i, 0, newList["music"][i]);
    // }
    // for(let i = 0; i < Object.entries(newList["movies"]).length; i++) {
    //   response.splice(i, 19, newList["movies"][i]);
    // }    
    // for(let i = 0; i < Object.entries(newList["interests"]).length; i++) {
    //   response.splice(i + 31, 0, newList["interests"][i]);
    // }
  }

  const handleNextStep = () => {
    const setLoadingFalse = () => {
      setLoading(false);
    }
    if((questionnaireStep + 1) == 8) {
      setTimeout(setLoadingFalse, 5000)
    }
    setQuestionnaireStep(questionnaireStep + 1);
    setInternalStep(1);
    setQuestionType(1);
  }

  const handleNextStepQuestions = (questionsInPage: number, additionalQuestions = false) => {
    let questionState = [true, true, true, true]
    for(let i = 0; i < questionsInPage; i++) {
      questionState[i] = currentQuestionState[i]
    }

    if(JSON.stringify(questionState) == JSON.stringify([true, true, true, true])) {
      setInternalStep(1);
      setCurrentQuestionState([false, false, false, false]);
      if(additionalQuestions) {
        setQuestionType(2)
        return;
      };
      setQuestionnaireStep(questionnaireStep + 1);
    }
  }  

  const handleNextPage = () => {
    if(JSON.stringify(currentQuestionState) == JSON.stringify([true, true, true, true])) {
      setInternalStep(internalStep + 1)
      setCurrentQuestionState([false, false, false, false]);
    }
  }

  const setSelectAnswers = (selectList: [[number, string, string]]|[[number, string, string], [number, string, string], [number, string, string], [number, string, string]]) => {
    selectList.forEach((select: any) => {
      let element = document.getElementById(select[2]) as HTMLInputElement;
      answerQuestion(select[1] as QuestionOptions, select[0], element.value)
    })
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
                  <div className="w-full">
                    <LabeledInput label="Age (years)" updateValue={setAge}></LabeledInput>
                    <LabeledInput label="Height (cm)" updateValue={setHeight}></LabeledInput>
                    <LabeledInput label="Weight (kg)" updateValue={setWeight}></LabeledInput>
                    <div className="input-group input-group-sm w-full pb-2">
                      <span className="w-1/3">Gender</span>
                      <select id="gender" defaultValue="Select an option" className="select select-bordered w-2/3">
                        <option key="prompt" disabled>Select an option</option>
                        <option key="male" value="male">Male</option>
                        <option key="female" value="female">Female</option>
                      </select>
                    </div>
                  </div>
                  <button onClick={() => {setSelectAnswers([[4, "about", "gender"]]); setInternalStep(internalStep + 1)}} className="btn btn-secondary my-6">Next</button>
                </>     
              )
            case 2:
              return (
                <>
                  <h1 className="text-3xl font-bold pb-6">
                    Acerca de ti (2/2)
                  </h1>
                  <div className="w-full">
                    <LabeledInput label="Number of siblings" updateValue={setSiblingCount}></LabeledInput>
                    <div className="input-group input-group-sm w-full pb-2">
                      <span className="w-1/3">Handedness</span>
                      <select id="handedness" defaultValue="Select an option" className="select select-bordered w-2/3">
                        <option key="prompt" disabled>Select an option</option>
                        <option key="right" value="right handed">Right-handed</option>
                        <option key="left" value="left handed">Left-handed</option>
                      </select>
                    </div>
                    <div className="input-group input-group-sm w-full pb-2">
                      <span className="w-1/3">Education</span>
                      <select id="education" defaultValue="Select an option" className="select select-bordered w-2/3">
                        <option key="prompt" disabled>Select an option</option> 
                        <option key="primary" value="primary school">Primary school</option>
                        <option key="secondary" value="secondary school">Secondary school</option>
                        <option key="bachelor" value="college/bachelor degree">College / bachelor degree</option>
                        <option key="graduate" value="graduate degree">Graduate degree</option>
                      </select>
                    </div>                    
                    <div className="input-group input-group-sm w-full pb-2">
                      <span className="w-1/3">Childhood town</span>
                      <select id="hometown" defaultValue="Select an option" className="select select-bordered w-2/3">
                        <option key="prompt" disabled>Select an option</option>
                        <option key="city" value="city">City</option>
                        <option key="village" value="village">Village</option>
                      </select>
                    </div>
                    <div className="input-group input-group-sm w-full pb-2">
                      <span className="w-1/3">Childhood housing</span>
                      <select id="housing" defaultValue="Select an option" className="select select-bordered w-2/3">
                        <option key="prompt" disabled>Select an option</option>
                        <option key="house" value="house/bungalow">House / bungalow</option>
                        <option key="flat" value="block of flats">Block of flats</option>
                      </select>
                    </div>
                    <button onClick={() => {setSelectAnswers([[5, "about", "handedness"], [6, "about", "education"], [8, "about", "hometown"], [9, "about", "housing"]]); handleNextStep()}} className="btn btn-secondary my-6">Next</button>
                  </div>
                </>
              )
          }
        case 2: {
          const questionsInPage = musicQuestions.slice((internalStep - 1)*questionsPerPage, internalStep*questionsPerPage)
          return (
            <>
              <h1 className="text-3xl font-bold pb-6">
                Musica ({internalStep}/{musicQuestions.length % questionsPerPage == 0 ? Math.trunc(musicQuestions.length / questionsPerPage) : Math.trunc(musicQuestions.length / questionsPerPage) + 1})
              </h1>
              {questionsInPage.map((question, index) => {
                return (
                  <div key={index} className="w-full pb-2">
                    <AffinityInput key={index} question={question} questionType={"music" as QuestionOptions} answerQuestion={answerQuestion}></AffinityInput>
                  </div>
                )
              })}
              <button onClick={() => {(questionsInPage.length == questionsPerPage && internalStep*questionsPerPage < musicQuestions.length) ? handleNextPage() : handleNextStepQuestions(questionsInPage.length)}} className="btn btn-secondary mt-6">Next</button>
            </>     
          )
        }
        case 3: {
          const questionsInPage = moviesQuestions.slice((internalStep - 1)*questionsPerPage, internalStep*questionsPerPage)
          return (
            <>
              <h1 className="text-3xl font-bold pb-6">
                Peliculas ({internalStep}/{moviesQuestions.length % questionsPerPage == 0 ? Math.trunc(moviesQuestions.length / questionsPerPage) : Math.trunc(moviesQuestions.length / questionsPerPage) + 1})
              </h1>
              {questionsInPage.map((question, index) => {
                return (
                  <div key={index} className="w-full pb-2">
                    <AffinityInput key={index} question={question} questionType={"movies" as QuestionOptions} answerQuestion={answerQuestion}></AffinityInput>
                  </div>
                )
              })}
              <button onClick={() => {(questionsInPage.length == questionsPerPage && internalStep*questionsPerPage < moviesQuestions.length) ? handleNextPage() : handleNextStepQuestions(questionsInPage.length)}} className="btn btn-secondary mt-6">Next</button>
            </>     
          )   
        }
        case 4: {
          const questionsInPage = interestsQuestions.slice((internalStep - 1)*questionsPerPage, internalStep*questionsPerPage)
          return (
            <>
              <h1 className="text-3xl font-bold pb-6">
                Intereses ({internalStep}/{interestsQuestions.length % questionsPerPage == 0 ? Math.trunc(interestsQuestions.length / questionsPerPage) : Math.trunc(interestsQuestions.length / questionsPerPage) + 1})
              </h1>
              {questionsInPage.map((question, index) => {
                return (
                  <div key={index} className="w-full pb-2">
                    <AffinityInput key={index} question={question} questionType={"interests" as QuestionOptions} answerQuestion={answerQuestion}></AffinityInput>
                  </div>
                )
              })}
              <button onClick={() => {(questionsInPage.length == questionsPerPage && internalStep*questionsPerPage < interestsQuestions.length) ? handleNextPage() : handleNextStepQuestions(questionsInPage.length)}} className="btn btn-secondary mt-6">Next</button>
            </>     
          )   
        }
        case 5: {
          const questionsInPage = phobiasQuestions.slice((internalStep - 1)*questionsPerPage, internalStep*questionsPerPage)
          return (
            <>
              <h1 className="text-3xl font-bold pb-6">
                Fobias ({internalStep}/{phobiasQuestions.length % questionsPerPage == 0 ? Math.trunc(phobiasQuestions.length / questionsPerPage) : Math.trunc(phobiasQuestions.length / questionsPerPage) + 1})
              </h1>
              {questionsInPage.map((question, index) => {
                return (
                  <div key={index} className="w-full pb-2">
                    <AffinityInput key={index} question={question} questionType={"phobias" as QuestionOptions} answerQuestion={answerQuestion}></AffinityInput>
                  </div>
                )
              })}
              <button onClick={() => {(questionsInPage.length == questionsPerPage && internalStep*questionsPerPage < phobiasQuestions.length) ? handleNextPage() : handleNextStepQuestions(questionsInPage.length)}} className="btn btn-secondary mt-6">Next</button>
            </>     
          )   
        }     
        case 6: {
          const questionsInPage = habitsQuestions.slice((internalStep - 1)*questionsPerPage, internalStep*questionsPerPage)
          return (
            <>
              { questionType == 1 ?
                <>
                  <h1 className="text-3xl font-bold pb-6">
                    Habitos ({internalStep}/{habitsQuestions.length % questionsPerPage == 0 ? Math.trunc(habitsQuestions.length / questionsPerPage) + 1 : Math.trunc(habitsQuestions.length / questionsPerPage) + 2})
                  </h1>
                  {questionsInPage.map((question, index) => {
                    return (
                      <div key={index} className="w-full pb-2">
                        <AffinityInput key={index} question={question} questionType={"spending_habits" as QuestionOptions} answerQuestion={answerQuestion}></AffinityInput>
                      </div>
                    )
                  })}
                  <button onClick={() => {(questionsInPage.length == questionsPerPage && internalStep*questionsPerPage < habitsQuestions.length) ? handleNextPage() : handleNextStepQuestions(questionsInPage.length, true)}} className="btn btn-secondary mt-6">Next</button>
                </>
                : questionType == 2 &&
                  <>
                    <h1 className="text-3xl font-bold pb-6">
                      Habitos ({Math.trunc(habitsQuestions.length / questionsPerPage) + 2}/{habitsQuestions.length % questionsPerPage == 0 ? Math.trunc(habitsQuestions.length / questionsPerPage) + 1 : Math.trunc(habitsQuestions.length / questionsPerPage) + 2})
                    </h1>
                    <div className="w-full py-4 mb-2">
                      <h3 className="text-xl">
                        Smoking habits
                      </h3>
                      <div className="flex justify-center w-full btn-group mt-4 border border-solid border-slate-700 rounded-lg">
                        <input onClick={() => {answerQuestion("habits" as QuestionOptions, 0, 'never smoked')}} type="radio" name="smokingOptions" data-title="Never smoked" className="btn flex-auto w-1/4" />
                        <input onClick={() => {answerQuestion("habits" as QuestionOptions, 0, 'tried smoking')}} type="radio" name="smokingOptions" data-title="Tried smoking" className="btn flex-auto w-1/4" />
                        <input onClick={() => {answerQuestion("habits" as QuestionOptions, 0, 'former smoker')}} type="radio" name="smokingOptions" data-title="Former smoker" className="btn flex-auto w-1/4"/>
                        <input onClick={() => {answerQuestion("habits" as QuestionOptions, 0, 'current smoker')}} type="radio" name="smokingOptions" data-title="Current smoker" className="btn flex-auto w-1/4" />
                      </div>
                    </div>
                    <div className="w-full py-4 mb-2">
                      <h3 className="text-xl">
                        Smoking habits
                      </h3>
                      <div className="flex justify-center w-full btn-group mt-4 border border-solid border-slate-700 rounded-lg">
                        <input onClick={() => {answerQuestion("habits" as QuestionOptions, 1, 'never')}} type="radio" name="drinkingOptions" data-title="Never" className="btn flex-auto w-1/3" />
                        <input onClick={() => {answerQuestion("habits" as QuestionOptions, 1, 'social drinker')}} type="radio" name="drinkingOptions" data-title="Social drinker" className="btn flex-auto w-1/3" />
                        <input onClick={() => {answerQuestion("habits" as QuestionOptions, 1, 'drink a lot')}} type="radio" name="drinkingOptions" data-title="Drink a lot" className="btn flex-auto w-1/3"/>
                      </div>                      
                    </div>                                      
                    <AffinityInput question={extraQuestions[2]} questionType={"habits" as QuestionOptions} answerQuestion={answerQuestion}></AffinityInput>
                    <button onClick={() => {handleNextStep()}} className="btn btn-secondary my-6">Next</button>
                  </>
              }
            </>     
          )   
        }            
        case 7: {
          const questionsInPage = personalityQuestions.slice((internalStep - 1)*questionsPerPage, internalStep*questionsPerPage)
          return (
            <>
              { questionType == 1 ?
                <>
                  <h1 className="text-3xl font-bold pb-6">
                    Personalidad ({internalStep}/{personalityQuestions.length % questionsPerPage == 0 ? Math.trunc(personalityQuestions.length / questionsPerPage) + 1 : Math.trunc(personalityQuestions.length / questionsPerPage) + 2})
                  </h1>
                  {questionsInPage.map((question, index) => {
                    return (
                      <div key={index} className="w-full pb-2">
                        <AffinityInput key={index} question={question} questionType={"personality" as QuestionOptions} answerQuestion={answerQuestion}></AffinityInput>
                      </div>
                    )
                  })}
                  <button onClick={() => {(questionsInPage.length == questionsPerPage && internalStep*questionsPerPage < personalityQuestions.length) ? handleNextPage() : handleNextStepQuestions(questionsInPage.length, true)}} className="btn btn-secondary mt-6">Next</button>
                </>
                : questionType == 2 &&
                  <>
                    <h1 className="text-3xl font-bold pb-6">
                      Personalidad ({Math.trunc(personalityQuestions.length / questionsPerPage) + 2}/{Math.trunc(personalityQuestions.length / questionsPerPage) + 2})
                    </h1>
                    <div className="w-full py-4 mb-2">
                      <h3 className="text-xl">
                        Timekeeping
                      </h3>
                      <div className="flex justify-center w-full btn-group mt-4 border border-solid border-slate-700 rounded-lg">
                        <input onClick={() => {answerQuestion("personality" as QuestionOptions, 31, 'i am often early')}} type="radio" name="timeSelect" data-title="I am often early" className="btn flex-auto w-1/3" />
                        <input onClick={() => {answerQuestion("personality" as QuestionOptions, 31, 'i am always on time')}} type="radio" name="timeSelect" data-title="I am always on time" className="btn flex-auto w-1/3" />
                        <input onClick={() => {answerQuestion("personality" as QuestionOptions, 31, 'i am often running late')}} type="radio" name="timeSelect" data-title="I am often running late" className="btn flex-auto w-1/3"/>
                      </div>
                    </div>
                    <div className="w-full py-4 mb-2">
                      <h3 className="text-xl">
                        Do you lie to others?
                      </h3>
                      <div className="flex justify-center w-full btn-group mt-4 border border-solid border-slate-700 rounded-lg">
                        <input onClick={() => {answerQuestion("personality" as QuestionOptions, 32, 'never')}} type="radio" name="lieSelect" data-title="Never" className="btn flex-auto w-1/4" />
                        <input onClick={() => {answerQuestion("personality" as QuestionOptions, 32, 'only to avoid hurting someone')}} type="radio" name="lieSelect" data-title="Only to avoid hurting" className="btn flex-auto w-1/4" />
                        <input onClick={() => {answerQuestion("personality" as QuestionOptions, 32, 'sometimes')}} type="radio" name="lieSelect" data-title="Sometimes" className="btn flex-auto w-1/4"/>
                        <input onClick={() => {answerQuestion("personality" as QuestionOptions, 32, 'everytime it suits me')}} type="radio" name="lieSelect" data-title="Everytime it suits me" className="btn flex-auto w-1/4" />
                      </div>                      
                    </div> 
                    <div className="w-full py-4 mb-2">
                      <h3 className="text-xl">
                        How much time do you spend online each day?
                      </h3>
                      <div className="flex justify-center w-full btn-group mt-4 border border-solid border-slate-700 rounded-lg">
                        <input onClick={() => {answerQuestion("personality" as QuestionOptions, 56, 'no time at all')}} type="radio" name="internetSelect" data-title="No time at all" className="btn flex-auto w-1/4" />
                        <input onClick={() => {answerQuestion("personality" as QuestionOptions, 56, 'less than an hour')}} type="radio" name="internetSelect" data-title="Less than an hour" className="btn flex-auto w-1/4" />
                        <input onClick={() => {answerQuestion("personality" as QuestionOptions, 56, 'a few hours')}} type="radio" name="internetSelect" data-title="A few hours" className="btn flex-auto w-1/4"/>
                        <input onClick={() => {answerQuestion("personality" as QuestionOptions, 56, 'most of the day')}} type="radio" name="internetSelect" data-title="Most of the day" className="btn flex-auto w-1/4" />
                      </div>                      
                    </div>                                                         
                    <button onClick={() => {handleSubmission(); handleNextStep()}} className="btn btn-secondary my-6">Submit</button>
                  </>
              }
            </>     
          )   
        }
        case 8: 
          return (
            <>
              {
                loading ?
                <>
                  <h1 className="text-3xl font-bold pb-8">
                    Finding matches
                  </h1>
                  <div>
                    <span className="loading loading-bars loading-lg"></span>
                  </div>
                </>
                :
                <>
                  <h1 className="text-4xl font-bold pb-8">
                    Your matches
                  </h1>
                  <div className="flex flex-col w-full">
                    <div className="card card-side bg-base-100 shadow-xl mb-2">
                      <img width="150px" height="225px" src="/user/image_1.jpg" alt="Movie" className="rounded-lg"/>
                      <div className="card-body">
                        <h2 className="card-title">#1</h2>
                        <div className="text-start">
                          <p>Alisha Jones</p>
                        </div>
                        <div className="text-start">
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse auctor ex magna, eget feugiat risus.</p>
                        </div>
                      </div>
                    </div>
                    <div className="card card-side bg-base-100 shadow-xl mb-2">
                      <img width="150px" height="225px" src="/user/image_2.jpg" alt="Movie" className="rounded-lg"/>
                      <div className="card-body">
                        <h2 className="card-title">#2</h2>
                        <div className="text-start">
                          <p>Alex Ferguson</p>
                        </div>
                        <div className="text-start">
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse auctor ex magna, eget feugiat risus.</p>
                        </div>
                      </div>
                    </div>
                    <div className="card card-side bg-base-100 shadow-xl mb-2">
                      <img width="150px" height="225px" src="/user/image_3.jpg" alt="Movie" className="rounded-lg"/>
                      <div className="card-body">
                        <h2 className="card-title">#3</h2>
                        <div className="text-start">
                          <p>Romanya Chelsea</p>
                        </div>
                        <div className="text-start">
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse auctor ex magna, eget feugiat risus.</p>
                        </div>
                      </div>
                    </div>                                        
                  </div>
                </>
              }            
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
          <QuestionnaireBreadcrumbs questionnaireStep={questionnaireStep} navigate={navigate}></QuestionnaireBreadcrumbs>
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