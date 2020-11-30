import React from "react";
import firebase from "./init-firebase";

class NewRequest extends React.Component {
  state = {
    projects: [],
    requests: [],
    userQuery: ""
  };
  componentDidUpdate = prevProps => {
    if (this.props.assignee && this.props.assignee !== prevProps.assignee) {
      firebase
        .firestore()
        .collection("requests")
        .where("requesteeId", "==", this.props.assignee.id)
        .where("clientId", "==", this.props.auth.uid)
        .onSnapshot(querySnapshot => {
          let all = [];
          if (querySnapshot.empty) {
            console.log("empty");
          } else {
            querySnapshot.docs.forEach(doc => {
              var foo = doc.data();
              foo.id = doc.id;
              all.push(foo);
              this.setState({ requests: all });
            });
          }
        });
      firebase
        .firestore()
        .collection("projects")
        .where("requesteeId", "==", this.props.assignee.id)
        .where("clientId", "==", this.props.auth.uid)
        .onSnapshot(querySnapshot => {
          let all = [];
          if (querySnapshot.empty) {
            console.log("empty");
          } else {
            querySnapshot.docs.forEach(doc => {
              var foo = doc.data();
              foo.id = doc.id;
              all.push(foo);
              this.setState({ projects: all });
            });
          }
        });
    }
  };
  render() {
    return (
      <div
        style={
          this.props.openNewQuote
            ? {
                display: "flex",
                position: "fixed",
                overflowY: "auto",
                overflowX: "hidden",
                width: "100%",
                maxHeight: "100vh",
                height: "350px",
                transform: "translateX(0%)",
                transition: ".3s ease-in",
                backgroundColor: "rgb(30,20,30)",
                color: "white",
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
        <form
          onSubmit={e => {
            e.preventDefault();
            firebase
              .firestore()
              .collection("requests")
              .add({
                requesteeId: this.props.assignee
                  ? this.props.assignee.id
                  : null,
                clientId: this.props.auth.uid,
                budget: this.state.budget,
                title: this.state.title,
                body: this.state.description,
                createdDate: new Date()
              });
            this.props.closeNewJob();
          }}
          style={{
            padding: "30px",
            display: "flex",
            position: "absolute",
            height: "min-content",
            flexDirection: "column",
            width: "50%",
            alignItems: "flex-start"
          }}
        >
          <br />
          <div style={{ marginBottom: "5px", fontSize: "8px" }}>
            REQUEST FOR PROPOSAL
          </div>
          <input
            value={this.state.title}
            onChange={e => this.setState({ title: e.target.value })}
            required
            placeholder="title"
          />
          <br />
          {!this.props.assignee && (
            <input
              value={this.state.userQuery}
              onChange={e => this.setState({ userQuery: e.target.value })}
              placeholder="tag users"
            />
          )}
          {this.state.userQuery === "" && this.props.assignee && (
            <div
              style={{
                display: "flex",
                padding: "10px",
                border: "1px dotted grey",
                alignItems: "center"
              }}
            >
              <img
                src={this.props.assignee.photoThumbnail}
                style={{
                  height: "35px",
                  width: "35px"
                }}
                alt="error"
              />
              {this.props.assignee.username}
              <div
                onClick={() => this.props.chooseAssignee(this.props.assignee)}
                style={{ display: "flex", paddingLeft: "10px" }}
              >
                &times;
              </div>
            </div>
          )}
          {this.state.userQuery !== "" &&
            this.props.users.map(x => {
              var goo = x.username.toLowerCase();
              if (goo.includes(this.state.userQuery.toLowerCase())) {
                return (
                  <div
                    style={
                      this.props.assignee && this.props.assignee.id === x.id
                        ? {
                            display: "flex",
                            padding: "10px",
                            border: "1px dotted grey"
                          }
                        : {
                            color: "grey",
                            display: "flex",
                            padding: "10px",
                            border: "1px dotted grey"
                          }
                    }
                    onClick={() => this.props.chooseAssignee(x)}
                  >
                    <div>{x.username}</div>
                    {this.props.assignee && this.props.assignee.id === x.id && (
                      <div style={{ display: "flex", paddingLeft: "10px" }}>
                        &times;
                      </div>
                    )}
                  </div>
                );
              } else return null;
            })}
          <br />
          <div style={{ display: "flex", fontSize: "10px" }}>
            $
            <input
              value={this.state.budget}
              onChange={e => this.setState({ budget: e.target.value })}
              required
              placeholder="budget"
            />
          </div>
          <br />
          <textarea
            required
            placeholder="description"
            value={this.state.description}
            onChange={e => this.setState({ description: e.target.value })}
          />
          <br />
          <button>save</button>
        </form>
      </div>
    );
  }
}
export default NewRequest;
