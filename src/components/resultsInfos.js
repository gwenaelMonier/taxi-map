import React from "react";
import "./resultsInfos.css";

class ResultsInfos extends React.Component {
  render() {
    const size = this.props.taxis.length;
    const infoSpan = size > 0 ? (
      <span>
        <b>{`${size} results found`}</b>
      </span>
    ) : (
      <span>
        <b>{"There is no result for your search"}</b>
      </span>
    );

    return (
      <div className="results-size">{infoSpan}</div>
    );
  }
}

export default ResultsInfos;
