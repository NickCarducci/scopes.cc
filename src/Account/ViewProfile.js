import React from "react";
import ViewProfileWidget from "./ViewProfileWidget";

class ViewProfile extends React.Component {
  state = {};
  render() {
    const { profile } = this.props;
    if (profile) {
      return (
        <div
          style={
            profile
              ? {
                  display: "flex",
                  position: "fixed",
                  overflowY: "auto",
                  overflowX: "hidden",
                  width: "100%",
                  height: "100%",
                  transform: "translateX(0%)",
                  transition: ".3s ease-in",
                  backgroundColor: "rgb(20,30,50)",
                  zIndex: "2"
                }
              : {
                  display: "flex",
                  position: "fixed",
                  overflowY: "auto",
                  overflowX: "hidden",
                  width: "100%",
                  height: "100%",
                  transform: "translateX(100%)",
                  transition: ".3s ease-out",
                  opacity: "0"
                }
          }
        >
          <div
            style={{
              display: "flex",
              position: "absolute",
              right: "65px",
              padding: "30px",
              height: "min-content",
              flexDirection: "column",
              justifyContent: "center",
              width: "150px"
            }}
          >
            <div
              onClick={() => this.props.quotePlease(profile)}
              onMouseEnter={() => this.setState({ hoveredOption: "quote" })}
              onMouseLeave={() => this.setState({ hoveredOption: "" })}
              style={
                this.state.hoveredOption === "quote"
                  ? {
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid grey",
                      color: "grey",
                      height: "30px",
                      padding: "10px",
                      margin: "3px"
                    }
                  : {
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px dotted grey",
                      height: "30px",
                      padding: "10px",
                      margin: "3px",
                      color: "grey"
                    }
              }
            >
              + request quote
            </div>
            <div
              onClick={() => this.props.sendEstimate(profile)}
              onMouseEnter={() => this.setState({ hoveredOption: "estimate" })}
              onMouseLeave={() => this.setState({ hoveredOption: "" })}
              style={
                this.state.hoveredOption === "estimate"
                  ? {
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid grey",
                      color: "grey",
                      height: "30px",
                      padding: "10px",
                      margin: "3px"
                    }
                  : {
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px dotted grey",
                      height: "30px",
                      padding: "10px",
                      margin: "3px",
                      color: "grey"
                    }
              }
            >
              + give estimate
            </div>
          </div>
          <div
            style={
              this.props.width < 600
                ? {
                    top: "130px",
                    padding: "30px",
                    display: "flex",
                    position: "absolute",
                    height: "min-content",
                    flexDirection: "column",
                    width: "50%"
                  }
                : {
                    padding: "30px",
                    display: "flex",
                    position: "absolute",
                    height: "min-content",
                    flexDirection: "column",
                    width: "50%"
                  }
            }
          >
            <ViewProfileWidget
              projects={this.props.projects}
              set={() => console.log("yes hello")}
              profile={profile}
            />
          </div>
        </div>
      );
    } else return null;
  }
}
export default ViewProfile;
