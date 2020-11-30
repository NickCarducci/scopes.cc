import React from "react";

class QueryIndustries extends React.Component {
  state = { industryQuery: "" };
  render() {
    return (
      <div>
        <input
          value={this.state.industryQuery}
          onChange={e => this.setState({ industryQuery: e.target.value })}
          placeholder="industry"
          style={{ marginBottom: "5px" }}
        />
        {this.props.industries.map(x => {
          if (
            this.state.industryQuery === "" ||
            x.includes(this.state.industryQuery)
          ) {
            return (
              <div
                style={
                  x !== this.props.industry && this.props.industry !== ""
                    ? { display: "none" }
                    : {}
                }
              >
                <div onClick={() => this.props.chooseIndustry(x)}>{x}</div>
                {this.props.industry !== "" && (
                  <div
                    style={{
                      display: "flex",
                      paddingLeft: "10px",
                      zIndex: "9999"
                    }}
                    onClick={this.props.clear}
                  >
                    &times;
                  </div>
                )}
              </div>
            );
          } else return null;
        })}
      </div>
    );
  }
}
export default QueryIndustries;
