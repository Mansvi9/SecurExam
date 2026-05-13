import {
  useLocation
} from "react-router-dom";

import "../styles/pages/result.css";

function Result() {

  const location =
    useLocation();

  const { score, total } =
    location.state;

  return (

    <div className="result-page">

      <div className="result-card">

        <h1>

          Exam Result

        </h1>

        <h2>

          {score}
          {" / "}
          {total}

        </h2>

      </div>

    </div>

  );

}

export default Result;