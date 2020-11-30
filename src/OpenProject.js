import React from "react";
import { Link } from "react-router-dom";
import firebase from "./init-firebase";
import RequestProjectWidget from "./RequestProjectWidget";
import Proposal from "./Proposal";
import SendReqPayment from "./SendReqPayment";

class OpenProject extends React.Component {
  state = {
    subtotal: 0,
    project: {},
    sprints: []
  };

  componentDidMount = () => {
    if (this.props.projects.length > 0) {
      const pathname = window.location.pathname;
      const f = pathname.split("/project/")[1];
      var answer = this.props.projects.find(x => x.id === f);
      if (answer) {
        this.setState({ project: answer });
        var totalTotal = 0;
        var q = 0;
        answer.sprints &&
          answer.sprints.map(x => {
            q++;
            if (x) {
              return firebase
                .firestore()
                .collection("tasks")
                .where("projectId", "==", answer.id)
                .where("sprint", "==", x)
                .onSnapshot(querySnapshot => {
                  let all = [];
                  let p = 0;
                  var total = 0;
                  if (querySnapshot.empty) {
                    console.log("no sprints");
                  } else {
                    querySnapshot.docs &&
                      querySnapshot.docs.forEach(doc => {
                        p++;
                        if (doc.exists) {
                          var foo = doc.data();
                          foo.id = doc.id;
                          total =
                            total +
                            Number(foo.materialEstimate) +
                            Number(foo.laborEstimate);
                          all.push(foo);
                          if (p === querySnapshot.docs.length) {
                            totalTotal = totalTotal + total;
                            var copy = { ...this.state.sprints };
                            copy["sprintItems" + x] = { items: all, total };

                            this.setState({
                              sprints: copy
                            });
                            if (q === answer.sprints.length) {
                              var totalTotal1 = !isNaN(this.props.totalTotal)
                                ? this.props.totalTotal
                                : 0;
                              this.setState({ totalTotal: totalTotal1 });
                            }
                          }
                        }
                      });
                  }
                });
            } else return null;
          });
      }
    }
  };
  render() {
    var thisone = this.props.myCompanies.find(
      y => y.id === this.state.project.assigneeCompanyId
    );
    var thisclient =
      this.props.users &&
      this.props.users.find(y => y.id === this.state.project.clientId);
    var thisassignee =
      this.props.users &&
      this.props.users.find(y => y.id === this.state.project.assigneeId);
    return (
      <div>
        {this.props.auth !== undefined &&
        thisclient &&
        thisclient.id === this.props.auth.uid ? (
          //client
          !this.state.project.pendingPayment && !this.state.project.paid ? (
            <div
              onMouseEnter={() => this.setState({ highlight: true })}
              onMouseLeave={() => this.setState({ highlight: false })}
              style={
                this.state.highlight
                  ? {
                      display: "flex",
                      position: "fixed",
                      backgroundColor: "navy",
                      width: "calc(100% - 38px)",
                      height: "44px",
                      borderRadius: "10px",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      top: "0px",
                      right: "0px",
                      zIndex: "9"
                    }
                  : {
                      display: "flex",
                      position: "fixed",
                      backgroundColor: "rgb(100,150,200)",
                      width: "calc(100% - 38px)",
                      height: "44px",
                      borderRadius: "10px",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      top: "0px",
                      right: "0px",
                      zIndex: "9"
                    }
              }
            >
              {thisassignee.username} is writing this estimate... please wait
            </div>
          ) : (
            <div
              onClick={() => {
                var answer = window.confirm(
                  `pay ${this.state.totalTotal} now?`
                );
                if (answer) {
                  firebase
                    .firestore()
                    .collection("projects")
                    .doc(this.state.project.id)
                    .update({
                      pendingPayment: false,
                      paid: true
                    });
                }
              }}
              onMouseEnter={() => this.setState({ highlight: true })}
              onMouseLeave={() => this.setState({ highlight: false })}
              style={
                this.state.highlight
                  ? {
                      display: "flex",
                      position: "fixed",
                      backgroundColor: "rgb(20,20,20)",
                      width: "calc(100% - 38px)",
                      height: "41px",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      top: "0px",
                      right: "0px",
                      zIndex: "9"
                    }
                  : {
                      display: "flex",
                      position: "fixed",
                      backgroundColor: "rgb(100,150,200)",
                      width: "calc(100% - 38px)",
                      height: "41px",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      top: "0px",
                      right: "0px",
                      zIndex: "9"
                    }
              }
            >
              pay {this.state.subtotal}
            </div>
          )
        ) : (
          //assignee
          <SendReqPayment
            thisclient={thisclient}
            project={this.state.project}
          />
        )}
        <div
          style={{
            display: "flex",
            position: "fixed",
            overflowY: "auto",
            overflowX: "hidden",
            width: "100%",
            height: "100%",
            transform: "translateX(0%)",
            transition: ".3s ease-in",
            backgroundColor: "white",
            zIndex: "-10",
            justifyContent: "center"
          }}
        >
          <div
            style={{
              display: "flex",
              top: "40px",
              position: "absolute",
              height: "min-content",
              flexDirection: "column",
              width: "calc(100% - 60px)"
            }}
          >
            <div style={{ maxWidth: "200px" }}>
              {this.state.project.createdDate && this.props.user && (
                <RequestProjectWidget
                  inside={true}
                  isProject={true}
                  x={this.state.project}
                  thisone={thisone}
                  person={thisassignee}
                />
              )}
            </div>
            <br />
            {this.props.auth !== undefined &&
            this.state.project.assigneeId === this.props.auth.uid ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start"
                }}
              >
                <div
                  onClick={() => {
                    var answer = window.confirm(
                      "are you sure you want to undo this acceptance? Category items will be lost"
                    );
                    if (answer) {
                      var copy = { ...this.state.project };
                      copy.requesteeId = copy.assigneeId;
                      firebase
                        .firestore()
                        .collection("requests")
                        .add(copy)
                        .then(x => {
                          firebase
                            .firestore()
                            .collection("projects")
                            .doc(this.state.project.id)
                            .delete()
                            .then(y => {
                              console.log(
                                `successfully moved ${
                                  this.state.project.title
                                } to your requests`
                              );
                              this.props.history.push(`/`);
                            });
                        });
                    }
                  }}
                  style={{
                    display: "flex",
                    backgroundColor: "navy",
                    width: "max-content",
                    padding: "0px 20px",
                    height: "33px",
                    borderRadius: "10px",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white"
                  }}
                >
                  Undo Acceptance
                </div>
                <div style={{ color: "grey" }}>
                  &nbsp;&nbsp;make this a request
                </div>
              </div>
            ) : null}
            <br />
            <Proposal
              subtotal={this.state.subtotal}
              addemup={x => this.setState({ subtotal: x })}
              sprints={this.state.sprints}
              users={this.props.users}
              totalTotal={this.state.totalTotal}
              project={this.state.project}
              auth={this.props.auth}
            />
            <br />
          </div>
        </div>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            backgroundColor: "rgb(230,230,230)",
            display: "flex",
            position: "fixed",
            left: "0px",
            top: "0px",
            height: "36px",
            width: "36px",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "30px",
            zIndex: "9999",
            color: "rgb(20,20,20)",
            border: "2px solid rgb(20,20,20)"
          }}
        >
          &times;
        </Link>
      </div>
    );
  }
}

export default OpenProject;
