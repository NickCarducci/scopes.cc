import React from "react";
import "./styles.css";
import Reports from "./Account/Reports";
import scopes from "./scopes.png";
import Login from "./Account/Login";
import StartWork from "./StartWork";
import SentRequests from "./SentRequests";
import NewRequest from "./NewRequest";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import OpenRequest from "./OpenRequest";
import ViewProfile from "./Account/ViewProfile";
import ViewProfileWidget from "./Account/ViewProfileWidget";
import NewEstimate from "./NewEstimate";
import Companies from "./Companies";
import MainHeader from "./MainHeader";
import OpenProject from "./OpenProject";
import RequestProjectWidget from "./RequestProjectWidget";
import UnofficialProjects from "./UnofficialProjects";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unassigned: true,
      userQuery: "",
      requestForProposals: [],
      myProjects: [],
      assignments: []
    };
  }
  componentDidMount = () => {
    if (this.props.projects.length > 0) {
      var these = this.props.projects.find(
        (x) => x.assigneeId === this.props.auth.uid
      );
      if (these) {
      }
    }
  };
  render() {
    if (this.state.reportsOpen && !this.props.auth.uid) {
      this.setState({ reportsOpen: false });
    }
    var columnCount =
      this.props.width < 300
        ? "1"
        : this.props.width < 600
        ? "2"
        : this.props.width < 900
        ? "3"
        : this.props.width < 1200
        ? "4"
        : "5";
    var these = this.props.projects.filter(
      (x) => x.assigneeId === this.props.auth.uid && x.pendingPayment && !x.paid
    );

    const PrivateRoute = ({ component: Component, ...rest }, props) => {
      return (
        <Route
          {...rest}
          render={(props) =>
            this.props.auth !== undefined && this.props.user !== undefined ? (
              <Component {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: props.location }
                }}
              />
            )
          }
        />
      );
    };
    /*const BumpRoute = ({ component: Component, ...rest }, props) => {
      let { from } = {
        from: { pathname: "/" }
      };
      return (
        <Route
          {...rest}
          render={(props) =>
            this.props.auth !== undefined && this.props.user !== undefined ? (
              <Redirect to={from} />
            ) : (
              <Component {...props} />
            )
          }
        />
      );
    };*/
    return (
      <div
        style={{
          display: "flex",
          position: "fixed",
          fontFamily: "sans-serif",
          textAlign: "center",
          height: "100%",
          width: "100%",
          flexDirection: "column"
        }}
      >
        <MainHeader
          these={these}
          openUnofficials={() => this.setState({ openUnofficials: true })}
          projects={this.props.projects}
          openJob={() => this.setState({ openNewQuote: true })}
          openLogin={() => this.setState({ pleaseLogin: true })}
          openReports={() => this.setState({ reportsOpen: true })}
          auth={this.props.auth}
          user={this.props.user}
          companies={this.props.companies}
          myCompanies={this.props.myCompanies}
        />

        <div
          style={{
            display: "flex",
            position: "relative",
            background: "linear-gradient(rgb(30,20,30) 0%, rgb(20,40,40) 100%)",
            height: "112px",
            top: "0",
            left: "0",
            alignItems: "center",
            justifyContent: "space-between",
            color: "white",
            flexDirection: "column"
          }}
        >
          <input
            value={this.state.userQuery}
            onChange={(e) => this.setState({ userQuery: e.target.value })}
            className="input"
            placeholder={`search for users`}
            style={{
              border: "0px solid rgb(140,180,180)",
              width: "calc(100% - 10px)",
              textIndent: "10px",
              margin: "5px 10px",
              height: "40px",
              borderRadius: "10px",
              left: "0px",
              fontSize: "15px"
            }}
          />
          {this.props.auth !== undefined && (
            <div
              style={{
                display: "flex",
                width: "100%",
                position: "relative", //rgb(150,170,185)
                height: "56px",
                top: "0",
                left: "0",
                alignItems: "center",
                justifyContent: "space-evenly",
                color: "white",
                borderBottom: "1px solid silver"
              }}
            >
              <div
                onClick={() =>
                  (!this.state.unassigned || this.state.openProjects) &&
                  this.setState({
                    unassigned: true,
                    userQuery: "",
                    openProjects: false
                  })
                }
                style={
                  !this.state.openProjects && this.state.unassigned
                    ? {
                        padding: "0px 4.5px",
                        color: "white",
                        display: "flex",
                        borderRadius: "50px",
                        transition: ".3s ease-in"
                      }
                    : {
                        padding: "0px 4.5px",
                        color: "grey",
                        display: "flex",
                        borderRadius: "50px",
                        transition: ".3s ease-out"
                      }
                }
              >
                unassigned
              </div>
              <div
                onClick={() =>
                  (this.state.unassigned || this.state.openProjects) &&
                  this.setState({
                    unassigned: false,
                    userQuery: "",
                    openProjects: false
                  })
                }
                style={
                  !this.state.openProjects && !this.state.unassigned
                    ? {
                        padding: "0px 4.5px",
                        color: "white",
                        display: "flex",
                        borderRadius: "50px",
                        transition: ".3s ease-in"
                      }
                    : {
                        padding: "0px 4.5px",
                        color: "grey",
                        display: "flex",
                        borderRadius: "50px",
                        transition: ".3s ease-out"
                      }
                }
              >
                requests <br />
                for <br />
                proposals
              </div>
              <div
                onClick={() =>
                  !this.state.openProjects &&
                  this.setState({ openProjects: true, userQuery: "" })
                }
                style={
                  this.state.openProjects
                    ? {
                        padding: "0px 4.5px",
                        color: "white",
                        display: "flex",
                        borderRadius: "50px",
                        transition: ".3s ease-in"
                      }
                    : {
                        padding: "0px 4.5px",
                        color: "grey",
                        display: "flex",
                        borderRadius: "50px",
                        transition: ".3s ease-out"
                      }
                }
              >
                current
                <br />
                projects&nbsp;
                {this.props.projects.length > 0 && (
                  <div
                    style={
                      !this.state.openProjects
                        ? {
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "white",
                            color: "black",
                            height: "16px",
                            width: "16px",
                            borderRadius: "50px",
                            fontSize: "10px"
                          }
                        : {
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "white",
                            color: "black",
                            borderRadius: "50px",
                            height: "16px",
                            width: "16px",
                            fontSize: "10px"
                          }
                    }
                  >
                    {this.props.projects.length}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <div
          style={{
            //middle area
            display: "flex",
            position: "relative",
            overflowY: "auto",
            overflowX: "hidden",
            width: "100%",
            height: "calc(100% - 224px)",
            transform: "translateX(0%)",
            transition: ".3s ease-in",
            backgroundColor: "rgb(20,40,40)",
            zIndex: "1",
            justifyContent: "center"
          }}
        >
          <div
            style={
              this.state.userQuery !== ""
                ? {
                    position: "absolute", //rgb(170,190,205)
                    height: "min-content",
                    width: "100%",
                    columnGap: "0",
                    columnCount: columnCount
                  }
                : {
                    position: "absolute", //rgb(170,190,205)
                    height: "min-content",
                    width: "100%",
                    color: "white",
                    columnGap: "0",
                    columnCount: columnCount
                  }
            }
          >
            <div
              style={{
                width: "100%",
                backgroundColor: "rgb(20,20,20)",
                color: "grey"
              }}
            >
              {this.state.userQuery === "" &&
                !this.state.openProjects &&
                !this.state.unassigned &&
                "requests are public"}
            </div>
            {this.state.userQuery !== "" && this.props.users
              ? this.props.users.map((x) => {
                  if (
                    x.username.includes(this.state.userQuery.toLowerCase()) &&
                    (this.props.user === undefined ||
                      x.username !== this.props.user.username)
                  ) {
                    return (
                      <ViewProfileWidget
                        projects={this.props.projects}
                        set={() =>
                          this.setState({ viewProfile: x, userQuery: "" })
                        }
                        profile={x}
                        auth={this.props.auth}
                      />
                    );
                  } else return null;
                })
              : this.state.openProjects
              ? this.props.projects.map((x) => {
                  var thisone = this.props.myCompanies.find(
                    (y) => y.id === x.assigneeCompanyId
                  );
                  var thisalso = this.props.users.find(
                    (y) => y.id === x.clientId
                  );
                  var thisassignee = this.props.users.find(
                    (y) => y.id === x.assigneeId
                  );
                  return (
                    <RequestProjectWidget
                      isProject={true}
                      x={x}
                      thisone={thisone}
                      person={thisassignee}
                      client={thisalso}
                      auth={this.props.auth}
                    />
                  );
                })
              : this.props.requests.map((x, i) => {
                  if (
                    (x.requesteeId === null &&
                      this.state.unassigned &&
                      (this.props.auth === undefined ||
                        x.clientId !== this.props.auth.uid)) ||
                    (x.requesteeId &&
                      !this.state.unassigned &&
                      x.requesteeId === this.props.auth.uid) ||
                    (x.assigneeCompanyId &&
                      !this.state.unassigned &&
                      this.props.myCompanies.find(
                        (y) => y.id === x.assigneeCompanyId
                      ))
                  ) {
                    var thisone = this.props.myCompanies.find(
                      (y) => y.id === x.assigneeCompanyId
                    );
                    var thisalso = this.props.users.find(
                      (y) => y.id === x.clientId
                    );
                    var thisassignee = this.props.users.find(
                      (y) => y.id === x.requesteeId
                    );
                    return (
                      <RequestProjectWidget
                        key={i}
                        x={x}
                        thisone={thisone}
                        person={thisassignee}
                        client={thisalso}
                        isRequest={true}
                        auth={this.props.auth}
                      />
                    );
                  } else return null;
                })}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            position: "fixed",
            backgroundColor: "rgb(60,80,100)",
            width: "100%",
            height: "56px",
            bottom: "0",
            left: "0",
            alignItems: "center",
            justifyContent: "center",
            color: "white"
          }}
        >
          <img
            onClick={() => this.setState({ openCompanies: true })}
            src={scopes}
            style={{
              left: "7px",
              display: "flex",
              position: "fixed",
              width: "36px",
              borderRadius: "50px",
              height: "36px",
              border: "1px white solid",
              backgroundColor: "teal",
              alignItems: "center",
              justifyContent: "center",
              color: "white"
            }}
            alt="error"
          />
          <div
            onClick={() => this.setState({ openRequests: true })}
            style={{
              display: "flex",
              position: "fixed",
              width: "calc(100% - 168px)",

              height: "56px",
              bottom: "0",
              left: "82px",
              alignItems: "center",
              justifyContent: "center",
              color: "white"
            }}
          >
            Sent requests
          </div>
          <span
            style={
              this.state.assignments.length > 0
                ? {
                    display: "flex",
                    position: "fixed",
                    fontSize: "30px",
                    right: "10px"
                  }
                : {
                    display: "flex",
                    position: "fixed",
                    fontSize: "30px",
                    right: "10px",
                    color: "rgb(150,200,200)"
                  }
            }
            role="img"
            aria-label="clock-in"
            onClick={() => this.setState({ openMatLab: true })}
          >
            {this.state.assignments.length}&nbsp;&#128337;
          </span>
        </div>
        {this.props.user !== undefined && (
          <Reports
            user={this.props.user}
            myCompanies={this.props.myCompanies}
            reportsOpen={this.state.reportsOpen}
            close={() => this.setState({ reportsOpen: false })}
          />
        )}
        <ViewProfile
          projects={this.props.projects}
          width={this.props.width}
          quotePlease={(x) =>
            this.setState({
              assignee: x,
              viewProfile: false,
              openNewQuote: true
            })
          }
          sendEstimate={(x) =>
            this.setState({
              client: x,
              viewProfile: false,
              openNewEstimate: true
            })
          }
          profile={this.state.viewProfile}
        />
        {this.props.auth !== undefined && (
          <Companies
            open={() => this.setState({ openAddCompany: true })}
            openCompanies={this.state.openCompanies}
            users={this.props.users}
            auth={this.props.auth}
            companies={this.props.companies}
            industries={this.state.industries}
            openAddCompany={this.state.openAddCompany}
          />
        )}
        {this.props.auth !== undefined && (
          <SentRequests
            projects={this.props.projects}
            myCompanies={this.props.myCompanies}
            openRequests={this.state.openRequests}
            requests={this.props.requests}
            auth={this.props.auth}
            users={this.props.users}
            user={this.props.user}
          />
        )}
        {this.props.auth !== undefined && (
          <NewRequest
            assignee={this.state.assignee}
            chooseAssignee={(x) => {
              if (this.state.assignee && this.state.assignee.id === x.id) {
                this.setState({ assignee: "" });
              } else {
                this.setState({
                  assignee: x
                });
              }
            }}
            closeNewJob={() => this.setState({ openNewQuote: false })}
            openNewQuote={this.state.openNewQuote}
            auth={this.props.auth}
            users={this.props.users}
          />
        )}
        {this.props.auth !== undefined && (
          <NewEstimate
            client={this.state.client}
            chooseClient={(x) => {
              if (this.state.client.id === x.id) {
                this.setState({ client: "" });
              } else {
                this.setState({
                  client: x
                });
              }
            }}
            closeNewJob={() => this.setState({ openNewEstimate: false })}
            openNewEstimate={this.state.openNewEstimate}
            auth={this.props.auth}
            users={this.props.users}
          />
        )}
        {this.props.auth !== undefined && (
          <UnofficialProjects
            myCompanies={this.props.myCompanies}
            these={these}
            show={this.state.openUnofficials}
            auth={this.props.auth}
            users={this.props.users}
          />
        )}
        {this.props.auth !== undefined && (
          <StartWork
            assignments={this.state.assignments}
            myProjects={this.state.myProjects}
            openMatLab={this.state.openMatLab}
          />
        )}
        <div
          onClick={() => {
            if (window.location.pathname.startsWith("/request/")) {
              this.props.history.push("/");
              this.setState({ openRequests: true });
            } else if (this.state.openAddCompany) {
              this.setState({ openAddCompany: false });
            } else {
              this.setState({
                openRequests: false,
                openCompanies: false,
                openNewEstimate: false,
                openNewQuote: false,
                openMatLab: false,
                viewProfile: false,
                openUnofficials: false
              });
            }
          }}
          style={
            window.location.pathname.startsWith("/project") ||
            (!this.state.openCompanies &&
              !this.state.openNewEstimate &&
              !this.state.openNewQuote &&
              !this.state.openMatLab &&
              !this.state.openAddCompany &&
              !this.state.viewProfile &&
              !this.state.openRequests &&
              !this.state.openUnofficials)
              ? { display: "none" }
              : {
                  backgroundColor: "rgba(250,250,250,0.8)",
                  display: "flex",
                  position: "fixed",
                  right: "10px",
                  top: "10px",
                  height: "56px",
                  width: "56px",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "30px",
                  zIndex: "9999",
                  border: "2px solid navy"
                }
          }
        >
          &times;
        </div>
        <div
          onClick={() => {
            if (window.location.pathname.startsWith("/request/")) {
              this.props.history.push("/");
              this.setState({ openRequests: true });
            } else if (this.state.openAddCompany) {
              this.setState({ openAddCompany: false });
            } else {
              this.setState({
                openRequests: false,
                openCompanies: false,
                openNewEstimate: false,
                openNewQuote: false,
                openMatLab: false,
                viewProfile: false,
                openUnofficials: false
              });
            }
          }}
          style={
            window.location.pathname.startsWith("/project") ||
            (!this.state.openCompanies &&
              !this.state.openNewEstimate &&
              !this.state.openNewQuote &&
              !this.state.openMatLab &&
              !this.state.openAddCompany &&
              !this.state.viewProfile &&
              !this.state.openRequests &&
              !this.state.openUnofficials)
              ? { display: "none" }
              : {
                  backgroundColor: "rgba(0,0,0,0.8)",
                  display: "flex",
                  position: "fixed",
                  height: "100%",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "30px",
                  zIndex: "1"
                }
          }
        />
        <div style={{ position: "fixed", zIndex: 2 }}>
          <Switch>
            <Route exact path="/" component={(props) => <div />} />
            <Route
              exact
              path="/login"
              component={(props) => (
                <Login
                  {...props}
                  auth={this.props.auth}
                  user={this.props.user}
                  users={this.props.users}
                  pleaseClose={() =>
                    this.setState({
                      pleaseLogin: false
                    })
                  }
                />
              )}
            />

            <PrivateRoute
              exact
              path="/request/:id"
              component={(props) => (
                <OpenRequest
                  {...props}
                  myCompanies={this.props.myCompanies}
                  requests={this.props.requests}
                  users={this.props.users}
                  user={this.props.user}
                  auth={this.props.auth}
                />
              )}
            />

            <PrivateRoute
              exact
              path="/project/:id"
              component={(props) => (
                <OpenProject
                  {...props}
                  myCompanies={this.props.myCompanies}
                  projects={this.props.projects}
                  users={this.props.users}
                  user={this.props.user}
                  auth={this.props.auth}
                />
              )}
            />
          </Switch>
        </div>
        {this.props.auth === undefined && this.state.pleaseLogin && (
          <Login
            auth={this.props.auth}
            user={this.props.user}
            users={this.props.users}
            pleaseClose={() =>
              this.setState({
                pleaseLogin: false
              })
            }
          />
        )}
      </div>
    );
  }
}
export default withRouter(App);
