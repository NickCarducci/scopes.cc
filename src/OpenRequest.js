import React from "react";
import { Link } from "react-router-dom";
import firebase from "./init-firebase";
import RequestProjectWidget from "./RequestProjectWidget";

class OpenRequest extends React.Component {
  state = { request: {}, bids: [], bid: "" };

  componentDidMount = () => {
    if (this.props.requests.length > 0) {
      const pathname = window.location.pathname;
      const f = pathname.split("/request/")[1];
      var answer = this.props.requests.find(x => x.id === f);
      if (!answer) {
        firebase
          .firestore()
          .collection("requests")
          .doc(f)
          .onSnapshot(doc => {
            if (doc.exists) {
              var foo = doc.data();
              foo.id = doc.id;

              this.setState({ request: foo });

              firebase
                .firestore()
                .collection("bids")
                .where("requesteeId", "==", foo.id)
                .onSnapshot(querySnapshot => {
                  let bids = [];
                  if (querySnapshot.empty) {
                    console.log("empty");
                  } else {
                    querySnapshot.docs.forEach(doc => {
                      if (doc.exists) {
                        var foo = doc.data();
                        foo.id = doc.id;
                        bids.push(foo);
                        this.setState({ bids });
                      }
                    });
                  }
                });
            }
          });
      } else {
        firebase
          .firestore()
          .collection("bids")
          .where("requesteeId", "==", answer.id)
          .onSnapshot(querySnapshot => {
            let bids = [];
            if (querySnapshot.empty) {
              console.log("empty");
            } else {
              querySnapshot.docs.forEach(doc => {
                if (doc.exists) {
                  var foo = doc.data();
                  foo.id = doc.id;
                  bids.push(foo);
                  this.setState({ bids });
                }
              });
            }
          });
        this.setState({ request: answer });
      }
    }
  };
  render() {
    var thisone = this.props.myCompanies.find(
      y => y.id === this.state.request.assigneeCompanyId
    );
    var thisoneUser =
      this.props.users &&
      this.props.users.find(y => y.id === this.state.request.requesteeId);
    var thisbid =
      this.props.auth !== undefined &&
      this.state.bids.find(x => x.authorId === this.props.auth.uid);
    return (
      <div
        style={
          true
            ? {
                display: "flex",
                position: "fixed",
                overflowY: "auto",
                overflowX: "hidden",
                width: "100%",
                height: "100%",
                transform: "translateX(0%)",
                transition: ".3s ease-in",
                backgroundColor: "rgb(25,25,35)",
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
            padding: "30px",
            display: "flex",
            position: "absolute",
            height: "min-content",
            flexDirection: "column",
            width: "50%"
          }}
        >
          {this.state.request.createdDate && this.props.user && (
            <RequestProjectWidget
              inside={true}
              x={this.state.request}
              thisone={thisone}
              user={this.props.user}
            />
          )}
          <br />
          <br />
          {this.props.auth !== undefined ? (
            this.state.request.assigneeCompanyId &&
            this.state.request.assigneeCompanyId !== thisone.id ? (
              <div>
                {thisone.title} has yet to accept the request
                <div
                  style={{
                    marginTop: "10px",
                    backgroundColor: "navy",
                    color: "white",
                    borderRadius: "30px",
                    width: "min-content",
                    padding: "10px"
                  }}
                  onClick={() => {
                    var answer = window.confirm(
                      "are you sure you want to dispose of this request? nothing can be recovered afterwards"
                    );
                    if (answer) {
                      firebase
                        .firestore()
                        .collection("requests")
                        .doc(this.state.request.id)
                        .delete()
                        .then(y => {
                          console.log(
                            `successfully moved ${
                              this.state.request.title
                            } to your projects`
                          );
                          this.props.history.push(
                            `/project/${this.state.request.id}`
                          );
                        });
                    }
                  }}
                >
                  Cancel
                </div>
                {this.state.bids.map(x => {
                  var thisguy = this.props.users.find(y => y.id === x.authorId);
                  return (
                    <div>
                      {thisguy.name} @{thisguy.username}:{x.bid}
                    </div>
                  );
                })}
              </div>
            ) : thisoneUser &&
              this.state.request.requesteeId !== this.props.auth.uid ? (
              <div>
                {thisoneUser.username} has yet to accept the request
                <div
                  style={{
                    marginTop: "10px",
                    backgroundColor: "navy",
                    color: "white",
                    borderRadius: "30px",
                    width: "min-content",
                    padding: "10px"
                  }}
                  onClick={() => {
                    var answer = window.confirm(
                      "are you sure you want to dispose of this request? nothing can be recovered afterwards"
                    );
                    if (answer) {
                      firebase
                        .firestore()
                        .collection("requests")
                        .doc(this.state.request.id)
                        .delete()
                        .then(y => {
                          console.log(
                            `successfully moved ${
                              this.state.request.title
                            } to your projects`
                          );
                          this.props.history.push(
                            `/project/${this.state.request.id}`
                          );
                        });
                    }
                  }}
                >
                  Cancel
                </div>
              </div>
            ) : !this.state.request.requesteeId ? (
              <form
                onSubmit={e => {
                  e.preventDefault();
                  var answer = window.confirm(
                    `are you sure you'd like to bid this job for ${
                      this.state.bid
                    } dollars`
                  );
                  if (answer) {
                    firebase
                      .firestore()
                      .collection("bids")
                      .add({
                        requesteeId: this.state.request.id,
                        bid: this.state.bid,
                        authorId: this.props.auth.uid
                      });
                  }
                }}
              >
                {this.state.bids.map(x => {
                  var thisguy = this.props.users.find(y => y.id === x.authorId);
                  if (thisguy.id === this.props.auth.uid) {
                    return (
                      <div
                        style={{
                          color: "white",
                          zIndex: "9999",
                          flexDirection: "column",
                          display: "flex"
                        }}
                      >
                        {thisguy.name} @{thisguy.username}:&nbsp;${x.bid}
                        <div
                          onClick={() => {
                            firebase
                              .firestore()
                              .collection("bids")
                              .doc(x.id)
                              .delete();
                          }}
                        >
                          &times;
                        </div>
                        {thisbid && thisguy.id !== this.props.auth.uid && (
                          <div style={{ display: "flex" }}>
                            <input
                              placeholder="change bid amount"
                              value={this.state.bid}
                              onChange={e =>
                                this.setState({ bid: e.target.value })
                              }
                            />
                            {this.state.bid !== "" && (
                              <div
                                onClick={() => {
                                  firebase
                                    .firestore()
                                    .collection("bids")
                                    .doc(x.id)
                                    .update({
                                      requesteeId: this.state.request.id,
                                      bid: this.state.bid,
                                      authorId: this.props.auth.uid
                                    });
                                }}
                              >
                                Save
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  } else
                    return (
                      <div style={{ color: "white", zIndex: "9999" }}>
                        {this.state.request.authorId === this.props.auth.uid
                          ? `${thisguy.name} @${thisguy.username} :`
                          : null}
                        ${x.bid}
                      </div>
                    );
                })}
                <br />
                {!thisbid && (
                  <div
                    style={{
                      backgroundColor: "grey",
                      color: "white",
                      width: "min-content"
                    }}
                  >
                    ask
                    <div style={{ display: "flex" }}>
                      <input
                        type="number"
                        placeholder="dollars"
                        required
                        value={this.state.bid}
                        onChange={e => this.setState({ bid: e.target.value })}
                      />
                      {this.state.bid !== "" && (
                        <div
                          onClick={() => {
                            firebase
                              .firestore()
                              .collection("bids")
                              .add({
                                requesteeId: this.state.request.id,
                                bid: this.state.bid,
                                authorId: this.props.auth.uid
                              });
                          }}
                        >
                          Save
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {!thisbid && (
                  <div style={{ color: "grey", fontSize: "14px" }}>
                    the amount you require
                  </div>
                )}
                <br />
                <div
                  onClick={() => {
                    var thisone = this.state.bids.map(x => {
                      if (x.authorId === this.props.auth.uid) {
                        return firebase
                          .firestore()
                          .collection("bids")
                          .doc(thisone.id)
                          .update({
                            bid: this.state.bid,
                            requesteeId: this.state.request.id,
                            authorId: this.props.auth.uid
                          })
                          .then(x => {
                            console.log(
                              `updated bid for request ${this.state.request.id}`
                            );
                          });
                      } else
                        return firebase
                          .firestore()
                          .collection("bids")
                          .add({
                            bid: this.state.bid,
                            requesteeId: this.state.request.id,
                            authorId: this.props.auth.uid
                          })
                          .then(x => {
                            console.log(
                              `made bid for request ${this.state.request.id}`
                            );
                          });
                    });
                  }}
                  style={{
                    display: "flex",
                    backgroundColor: "navy",
                    width: "100%",
                    height: "33px",
                    borderRadius: "10px",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white"
                  }}
                >
                  Bid
                </div>
                <div style={{ color: "grey" }}>propose a price</div>
                <br />
              </form>
            ) : (
              <div>
                <div
                  onClick={() => {
                    var copy = { ...this.state.request };
                    copy.assigneeId = copy.requesteeId;
                    delete copy.requesteeId;
                    delete copy.id;
                    firebase
                      .firestore()
                      .collection("projects")
                      .add(copy)
                      .then(x => {
                        firebase
                          .firestore()
                          .collection("requests")
                          .doc(this.state.request.id)
                          .delete()
                          .then(y => {
                            console.log(
                              `successfully moved ${
                                this.state.request.title
                              } to your projects`
                            );
                            this.props.history.push(`/project/${x.id}`);
                          });
                      });
                  }}
                  style={{
                    display: "flex",
                    backgroundColor: "navy",
                    width: "100%",
                    height: "33px",
                    borderRadius: "10px",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white"
                  }}
                >
                  Accept
                </div>
                <div style={{ color: "grey" }}>this project</div>
              </div>
            )
          ) : null}
          {this.props.auth !== undefined &&
          this.state.request.requesteeId === this.props.auth.uid ? (
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
                    "are you sure you want to deny? This advisor will have to add you again if you change your mind after this"
                  );
                  if (answer) {
                    firebase
                      .firestore()
                      .collection("requests")
                      .doc(this.state.request.id)
                      .update({ requesteeId: null })
                      .then(x => {
                        console.log(
                          `updated ${this.state.request.id} assignment`
                        );
                      })
                      .catch(e => console.log(e.message));
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
                Deny
              </div>
              <div style={{ color: "grey" }}>&nbsp;&nbsp;this request</div>
            </div>
          ) : null}
          <br />
        </div>
        <Link
          to="/"
          style={{
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
            border: "2px solid navy",
            textDecoration: "none"
          }}
        >
          &times;
        </Link>
      </div>
    );
  }
}

export default OpenRequest;
