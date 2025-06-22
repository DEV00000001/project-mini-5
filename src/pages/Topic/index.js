import { Link, Outlet } from "react-router-dom";
import "./Topic.scss";
import { useEffect, useState } from "react";
import { getTopic } from "../../services/TopicServices";
function Topic() {
  const [topic, setTopic] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const result = await getTopic();
      setTopic(result);
    };
    fetchApi();
  }, []);
  return (
    <>
      {topic.length > 0 ? (
        <>
          <table>
            <thead>
              <tr>
                <th>id</th>
                <th>Name Topic</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {topic.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>
                      {" "}
                      <button>
                        <Link
                          to={"/quiz/" + item.id}
                          className="button__lambai"
                        >
                          {" "}
                          Lam bai{" "}
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
export default Topic;
