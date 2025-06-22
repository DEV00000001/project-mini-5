import { Link } from "react-router-dom";
import "./Answer.scss"
import { useEffect, useState } from "react";
import {  getTopic } from "../../services/TopicServices";
import { useSelector } from "react-redux";
import { getListAnswer } from "../../services/AnswerServices";
function Answer() {
  const isLogin = useSelector(state => state.UserReducer);
  const [listAnswer, setListAnswer] = useState([]);
  const [topics, setTopics] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const result = await getListAnswer(isLogin.id);
      setListAnswer(result.reverse());
    };
    fetchApi();
  }, [isLogin]);

  useEffect(() => {
    const fetchTopics = async () => {
      const result = await getTopic();
      setTopics(result);
    };
    fetchTopics();
  }, []);
  const getTopicName = (topicId) => {
    const topic = topics.find( (item) => item.id === topicId);
    return topic ? topic.name : "Unknown";
  }

  return (
    <>
      {listAnswer.length > 0 ? (
        <>
          <table>
            <thead>
              <tr>
                <th>id</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {listAnswer.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{getTopicName(item.topicId)}</td>
                    <td>
                      {" "}
                      <button>
                        <Link
                          to={"/result/" + item.id}
                          className="button__xemchitiet"
                        >
                          {" "}
                          Xem chi tiet{" "}
                        </Link>
                      </button>
                    </td>
                  </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <h3>Khong co topic nao </h3>
      )}
    </>
  );
}
export default Answer;
