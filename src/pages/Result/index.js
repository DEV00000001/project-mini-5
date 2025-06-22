import { useEffect, useState } from "react";
import { getQuestion } from "../../services/TopicServices";
import { Navigate, useParams } from "react-router-dom";
import "./Result.scss";
import { getAnswer } from "../../services/AnswerServices";

function Result() {

  const params = useParams();
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [check , setCheck] = useState({
    ok: false,
  });

  useEffect(() => {
    const fetchApi = async () => {
      const resultAnswer = await getAnswer(params.id);
      const resultQuestion = await getQuestion(resultAnswer.topicId);
      setCheck({
        ok: false,
        topicId : resultAnswer.topicId
      })

      resultAnswer.answers.sort((a, b) => a.questionId - b.questionId);
      resultQuestion.sort((a, b) => a.id - b.id);
      const countCorrect = resultQuestion.reduce( (sum,item,index) => {
            return item.correctAnswer === resultAnswer.answers[index].answer ? sum+1 : sum;
      },0)
      setCorrectAnswer(countCorrect);
      setUserAnswers(resultAnswer.answers);
      setQuestions(resultQuestion);
    };
    fetchApi();
  }, [params.id]);


  const handleCorrect = (correctAnswer,index,userAnswer) => {
      if(correctAnswer === index) return "answer__true";
      if(userAnswer === index ) return "answer__false"
  };
  console.log(check);

  // console.log("cau hoi :",questions);
  // console.log("ket qua nguoi dung :",userAnswers);
  const handleClick = () => {
      setCheck({
        ...check,
        ok: true
      });
  }



  return (
    <>
      { check?.ok ? (<>
      <Navigate to={"/quiz/" + check.topicId }/>
      </>) : (<>
        <div className="Quiz-Summary">
        <div className="Quiz-Summary__correctAnswers">Correct: {correctAnswer} </div>
        <div className="Quiz-Summary__incorrectAnswers">Incorrect : {questions.length - correctAnswer} </div>
        <div className="Quiz-Summary__totalQuestions">Total: {questions.length} </div>
        <div className="Quiz-Summary__correctRate">CorrectRate: { (correctAnswer * 100 /questions.length).toFixed(2)}% </div>
        
      </div>
      {questions.map((q, i) => (
        <>
          <div key={q.id} className={() => {}}>
            Câu {i + 1} : {q.question}
            {q.answers.map((item, index) => (
              <>
                <div
                  key={`${q.id}-${index}`}
                  className={handleCorrect(q.correctAnswer, index , userAnswers[i].answer)}
                >
                  <input
                    type="radio"
                    name={`question-${q.id}`}
                    value={index}
                    disabled={true}
                    checked={index===userAnswers[i].answer}
                  />
                  {item}
                </div>
              </>
            ))}
          </div>
        </>
      ))}
      <button onClick={handleClick}> Lam lai </button>
      </>)}
    </>
  );
}
export default Result;
