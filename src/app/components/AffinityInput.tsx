interface Question {
  index: number,
  message: string,
  options: {left: string, right: string},
}

enum QuestionOptions {
  music = "music",
  movies = "movies",
  interests = "interests",
  phobias = "phobias",
  personality = "personality",
  habits = "habits"
}

export const AffinityInput = ({question, questionType, answerQuestion}: {question: Question, questionType: string, answerQuestion: Function}) => {
  return (
    <div key={question.index} className="w-full">
      <h3 className="text-xl py-6">
        {question.message}
      </h3>
      <div className="flex justify-center">
        <div className="w-1/3">
          <span>
            <label>
              {question.options.left}
            </label>
          </span>
        </div>
        <div className="w-1/3 flex">
          <div className="w-1/5">
            <input onClick={() => {answerQuestion(questionType as QuestionOptions, question.index, 1)}} type="radio" name={`radio-${question.index}`} className="radio radio-primary" />
          </div>
          <div className="w-1/5">
            <input onClick={() => {answerQuestion(questionType as QuestionOptions, question.index, 2)}} type="radio" name={`radio-${question.index}`} className="radio radio-primary" />
          </div>
          <div className="w-1/5">
            <input onClick={() => {answerQuestion(questionType as QuestionOptions, question.index, 3)}}  type="radio" name={`radio-${question.index}`} className="radio radio-primary" />
          </div>
          <div className="w-1/5">
            <input onClick={() => {answerQuestion(questionType as QuestionOptions, question.index, 4)}}  type="radio" name={`radio-${question.index}`} className="radio radio-primary" />
          </div>
          <div className="w-1/5">
            <input onClick={() => {answerQuestion(questionType as QuestionOptions, question.index, 5)}}  type="radio" name={`radio-${question.index}`} className="radio radio-primary" />
          </div>
        </div>
        <div className="w-1/3">
          <span>
            <label>
              {question.options.right}
            </label>
          </span>        
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex w-1/3">
          <div className="w-1/5">
            <label>
              1
            </label>
          </div>
          <div className="w-1/5">
            <label>
              2
            </label>
          </div>
          <div className="w-1/5">
            <label>
              3
            </label>
          </div>
          <div className="w-1/5">
            <label>
              4
            </label>
          </div>
          <div className="w-1/5">
            <label>
              5
            </label>
          </div>                                        
        </div>
      </div>
    </div>
  )
};