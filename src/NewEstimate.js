import React from "react";
import firebase from "./init-firebase";

class NewProject extends React.Component {
  state = {
    estimates: [],
    userQuery: ""
  };
  componentDidUpdate = prevProps => {
    if (this.props.client !== prevProps.client) {
      firebase
        .firestore()
        .collection("projects")
        .where("clientId", "==", this.props.client.id)
        .where("pendingPayment", "==", false)
        .where("paid", "==", false)
        .onSnapshot(querySnapshot => {
          let all = [];
          if (querySnapshot.empty) {
            console.log("empty");
          } else {
            querySnapshot.docs.forEach(doc => {
              var foo = doc.data();
              foo.id = doc.id;
              all.push(foo);
              this.setState({ estimates: all });
            });
          }
        });
    }
  };
  render() {
    return (
      <div
        style={
          this.props.openNewEstimate
            ? {
                display: "flex",
                position: "fixed",
                overflowY: "auto",
                overflowX: "hidden",
                width: "100%",
                maxHeight: "100vh",
                height: "450px",
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
              .collection("projects")
              .add({
                pendingPayment: true,
                clientId: this.props.client.id,
                assigneeId: this.props.auth.uid,
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
            width: "50%"
          }}
        >
          {this.state.estimates.length > 0
            ? "Attach existing estimates"
            : "Create a project"}
          {this.state.estimates.map(x => {
            return <div>{x.title}</div>;
          })}
          <br />
          <br />
          <input
            value={this.state.title}
            onChange={e => this.setState({ title: e.target.value })}
            required
            placeholder="title"
          />
          <br />
          {!this.props.client && (
            <input
              value={this.state.userQuery}
              onChange={e => this.setState({ userQuery: e.target.value })}
              required
              placeholder="tag users"
            />
          )}
          {this.state.userQuery === "" && this.props.client && (
            <div
              style={{
                display: "flex",
                padding: "10px",
                border: "1px dotted grey"
              }}
            >
              {this.props.client.username}
              <div
                onClick={() => this.props.chooseAssignee(this.props.client)}
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
                      this.props.client.id === x.id
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
                    {this.props.client.id === x.id && (
                      <div style={{ display: "flex", paddingLeft: "10px" }}>
                        &times;
                      </div>
                    )}
                  </div>
                );
              } else return null;
            })}
          <br />
          <br />
          Photo or upload
          <br />
          <br />
          <div style={{ display: "flex" }}>
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
          Location
          <br />
          <br />
          <button>save</button>
        </form>
      </div>
    );
  }
}
export default NewProject;
