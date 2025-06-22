import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { getQuestion } from "../../services/TopicServices";
import { useSelector } from "react-redux";
import { submitAnswer } from "../../services/AnswerServices";

function Quiz() {
  const [isSubmit, setSubmit] = useState({
    ok:false,
    id: 0
  });
  const isLogin = useSelector(state => state.UserReducer);
  const params = useParams();
  const [question , setQuestion] = useState([]);
  const [answer, setAnswer] = useState([]);
  useEffect( () => {
    const fetchApi =  async () => {
        const result = await getQuestion(params.id);
        setQuestion(result);
    }
    fetchApi();
  },[params.id])
  const handleChangeAnswer = (questionid, answerindex) => {
        // CACH 1 : TU NGHI RA 
    let check = true;
      const newanswer = answer.map( item => {
        if(item.questionId === questionid) {
          check = false;
          item.answer = answerindex;
        }
        return item;
      })
      if(check) {
        setAnswer([
          ...newanswer,
          {
              "questionId" : questionid,
              "answer": answerindex
          }
        ]);
      } else setAnswer(newanswer);
  }
  const handleSubmit = async () => {
    const data = {
      "userId":isLogin.id,
      "topicId":Number(params.id),
      "answers": answer
    }
    const result = await submitAnswer(data);
    if(result) {
      setSubmit({
        ok: true,
        id: result.id
      });
    }
  }
  return (
    <>
    QuizQuestion
      {isSubmit?.id ? (<>
      <Navigate to={"/result/" + isSubmit.id}/>
      </>) : (<>
        {question.map( (q,i) => (<>
        <div key={q.id}>Câu {i+1} : {q.question}</div>
        {q.answers.map( (item,index) => (<>
          <div key={q.id - index}>
            <input type="radio" 
            name={`question-${q.id}`}
            value={index}
            id={`quiz-${q.id}-${index}`}
            onChange={() => handleChangeAnswer(q.id, index)}
            />
            <label htmlFor={`quiz-${q.id}-${index}`}>{item}</label>
            {/* FIXME: them htmlFor , id cho lable de khi click vao text cua label , input type radio se duoc chon */}
          </div>
        </>))}
      </>))}
      <button onClick={handleSubmit}>Nộp bài</button>
      </>)}
    </>
  )
}
export default Quiz;