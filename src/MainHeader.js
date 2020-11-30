import React from "react";

class MainHeader extends React.Component {
  state = {};
  render() {
    const { these } = this.props;
    return (
      <div>
        <div
          style={{
            padding: "0px 15px",
            display: "flex",
            position: "relative",
            backgroundColor: "rgb(30,20,30)", //rgb(140,180,180)
            borderBottom: "1px white solid",
            height: "56px",
            alignItems: "center",
            justifyContent: "space-between",
            color: "black",
            zIndex: "1"
          }}
        >
          <div
            onMouseEnter={() =>
              this.props.auth !== undefined &&
              this.setState({ hoverSeeCompanies: true })
            }
            onMouseLeave={() =>
              this.props.auth !== undefined &&
              this.setState({ hoverSeeCompanies: false })
            }
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start"
            }}
            onClick={
              this.props.auth !== undefined
                ? this.props.openReports
                : this.props.openLogin
            }
          >
            <h1
              style={
                this.props.auth === undefined
                  ? {
                      color: "rgb(200,250,250)"
                    }
                  : this.state.hoverSeeCompanies
                  ? {
                      fontSize: "12px",
                      color: "rgb(200,250,250)",
                      backgroundColor: "rgb(200,250,250)"
                    }
                  : { fontSize: "12px", color: "rgb(200,250,250)" }
              }
            >
              {this.props.auth !== undefined ? "Scopebook" : "Login"}
            </h1>
            {this.props.auth !== undefined && (
              <h1
                style={
                  this.state.hoverSeeCompanies
                    ? { fontSize: "22px", color: "rgb(200,250,250)" }
                    : { color: "rgb(200,250,250)", fontSize: "22px" }
                }
              >
                {this.props.user.username}
              </h1>
            )}
          </div>
          <div
            onClick={this.props.openUnofficials}
            style={{
              position: "relative",
              display: "flex",
              height: "56px",
              width: "56px",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <img
              style={{ height: "30px", width: "30px" }}
              src="https://www.dl.dropboxusercontent.com/s/t7e6agonr29qzso/INVITES%20BUTTON_large%20%284%29.png?dl=0"
              alt="error"
            />
            {these.length > 0 && (
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  borderRadius: "40px",
                  backgroundColor: "rgb(230,230,230)",
                  width: "30px",
                  height: "27px",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                {these.length}
              </div>
            )}
          </div>
          <div
            onMouseEnter={() => this.setState({ hoverNewJob: true })}
            onMouseLeave={() => this.setState({ hoverNewJob: false })}
            style={
              !this.state.hoverNewJob
                ? {
                    backgroundColor: "rgb(30,20,30)",
                    display: "flex",
                    position: "relative",
                    height: "56px",
                    fontSize: "30px",
                    color: "rgb(150,200,200)",
                    alignItems: "center"
                  }
                : {
                    backgroundColor: "rgb(140,180,180)",
                    borderRadius: "45px",
                    display: "flex",
                    position: "relative",
                    height: "56px",
                    fontSize: "30px",
                    color: "white",
                    alignItems: "center"
                  }
            }
            onClick={this.props.openJob}
          >
            + job
          </div>
        </div>
        <div
          style={
            this.state.hoverSeeCompanies
              ? {
                  display: "flex",
                  position: "fixed",
                  transform: "translateY(0%)",
                  transition: ".3s ease-in",
                  top: "56px",
                  zIndex: "1",
                  opacity: "1",
                  backgroundColor: "white"
                }
              : {
                  display: "flex",
                  position: "fixed",
                  transform: "translateY(-100%)",
                  transition: ".3s ease-out",
                  top: "56px",
                  zIndex: "-2",
                  opacity: "0"
                }
          }
        >
          {this.props.myCompanies.length > 0 ? (
            this.props.myCompanies.map(x => {
              return <div style={{ padding: "10px" }}>{x.businessName}</div>;
            })
          ) : (
            <div style={{ padding: "10px" }}>
              you have no other companies registered
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default MainHeader;
