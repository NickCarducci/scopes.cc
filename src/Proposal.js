import React from "react";
import Task from "./Task";
import firebase from "./init-firebase";
import pencil from "./pencil.png";

class PreProposal extends React.Component {
  state = {
    tasks: [],
    newSprint: ""
  };
  render() {
    return (
      <div>
        {this.props.totalTotal > 0 &&
          `Estimated deposit ${this.props.totalTotal}`}
        {!this.state.editing &&
          this.props.project.sprints &&
          this.props.project.sprints.map(x => {
            var thisis = `sprintItems${x}`.split("sprintItems")[1];
            return (
              <div
                style={{
                  borderRadius: "4px",
                  padding: "2px"
                }}
              >
                {!this.props.project.pendingPayment && (
                  <div
                    style={
                      !this.state.editing || x !== this.state.editing
                        ? {
                            display: "none"
                          }
                        : this.props.sprints[`sprintItems${x}`] &&
                          this.props.sprints[`sprintItems${x}`].items !==
                            this.state.tasks
                        ? {
                            border: "1px navy solid",
                            borderRadius: "2px",
                            display: "flex",
                            position: "absolute",
                            right: "0px",
                            width: "20px",
                            height: "20px"
                          }
                        : {
                            display: "flex",
                            position: "absolute",
                            right: "0px",
                            width: "20px",
                            height: "20px"
                          }
                    }
                  >
                    &times;
                  </div>
                )}
                {!this.props.project.pendingPayment && (
                  <img
                    onClick={
                      this.state.editing
                        ? () => {
                            if (
                              this.props.sprints[`sprintItems${x}`].items !==
                              this.state.tasks
                            ) {
                              var answer = window.confirm("discard changes?");
                              if (answer) {
                                this.setState({
                                  openNewSprint: false,
                                  editing: false
                                });
                              }
                            } else {
                              this.setState({
                                openNewSprint: false,
                                editing: false
                              });
                            }
                          }
                        : () =>
                            this.setState({
                              newSprint: x,
                              editing: x,
                              openNewSprint: true,
                              tasks: this.props.sprints[`sprintItems${x}`]
                                ? this.props.sprints[`sprintItems${x}`].items
                                : []
                            })
                    }
                    src={pencil}
                    style={
                      this.state.editing
                        ? {
                            display: "flex",
                            position: "absolute",
                            right: "0px",
                            width: "20px",
                            height: "20px",
                            opacity: "0"
                          }
                        : {
                            display: "flex",
                            position: "absolute",
                            right: "0px",
                            width: "20px",
                            height: "20px"
                          }
                    }
                    alt="error"
                  />
                )}
                <div style={{ display: "flex", position: "relative" }}>
                  <div
                    style={
                      this.state.editing && x === this.state.editing
                        ? {
                            borderRadius: "3px",
                            backgroundColor: "navy",
                            color: "white",
                            display: "flex",
                            position: "absolute",
                            right: "0px",
                            top: "40px",
                            fontSize: "10px",
                            padding: "2px"
                          }
                        : {
                            display: "none"
                          }
                    }
                    onClick={() => {
                      var answer = window.confirm(
                        "delete this entire sprint category?"
                      );
                      if (answer) {
                        firebase
                          .firestore()
                          .collection("projects")
                          .doc(this.props.project.id)
                          .update({
                            sprints: firebase.firestore.FieldValue.arrayRemove(
                              this.state.editing
                            )
                          });
                        this.state.tasks.map(x => {
                          return firebase
                            .firestore()
                            .collection("tasks")
                            .doc(x.id)
                            .delete();
                        });
                        this.setState({
                          openNewSprint: false,
                          tasks: [],
                          editing: false
                        });
                      }
                    }}
                  >
                    Delete
                  </div>
                </div>
                <div
                  style={
                    thisis === this.state.editing
                      ? {
                          color: "white",
                          backgroundColor: "navy",
                          borderRadius: "4px",
                          padding: "2px"
                        }
                      : {
                          borderRadius: "4px",
                          padding: "2px"
                        }
                  }
                >
                  {thisis}&nbsp;-&nbsp;$
                  {this.props.sprints[`sprintItems${x}`] &&
                  !isNaN(this.props.sprints[`sprintItems${x}`].total)
                    ? this.props.sprints[`sprintItems${x}`].total
                    : 0}
                </div>
                <div
                  style={{
                    margin: "10px 0px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                  }}
                >
                  {//!this.state.openNewSprint &&
                  this.props.sprints[`sprintItems${x}`] &&
                    this.props.sprints[`sprintItems${x}`].items.map(x => {
                      return (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            padding: "0px 10px",
                            width: "min-content",
                            border: "1px solid grey",
                            height: "26px",
                            fontSize: "12px"
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              padding: "0px 10px",
                              width: "max-content",
                              border: "1px solid grey",
                              height: "26px",
                              fontSize: "12px",
                              backgroundColor: "rgb(200,200,200)"
                            }}
                          >
                            {x.title}
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              padding: "0px 10px",
                              width: "min-content",
                              border: "1px solid grey",
                              height: "26px",
                              fontSize: "12px",
                              color: "grey"
                            }}
                          >
                            Material
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              padding: "0px 10px",
                              width: "min-content",
                              border: "1px solid grey",
                              height: "26px",
                              fontSize: "12px"
                            }}
                          >
                            &nbsp;$
                            {!isNaN(x.materialEstimate)
                              ? x.materialEstimate
                              : 0}
                          </div>

                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              padding: "0px 10px",
                              width: "min-content",
                              border: "1px solid grey",
                              height: "26px",
                              fontSize: "12px",
                              color: "grey"
                            }}
                          >
                            Labor
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              padding: "0px 10px",
                              width: "min-content",
                              border: "1px solid grey",
                              height: "26px",
                              fontSize: "12px"
                            }}
                          >
                            &nbsp;$
                            {!isNaN(x.laborEstimate) ? x.laborEstimate : 0}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            );
          })}
        {this.state.openNewSprint && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start"
            }}
          >
            <br />
            <input
              value={this.state.newSprint}
              placeholder="title"
              onChange={e => this.setState({ newSprint: e.target.value })}
            />
            <div
              style={{
                marginLeft: "110px",
                marginTop: "2px",
                borderRadius: "3px",
                padding: "2px",
                backgroundColor: "navy",
                color: "white",
                fontSize: "12px"
              }}
              onClick={() => {
                if (!this.state.editing) {
                  if (
                    this.state.tasks.length > 0 &&
                    this.state.newSprint !== ""
                  ) {
                    var answer1 = window.confirm(
                      "save this sprint? erase the items first to discard"
                    );
                    if (answer1) {
                      this.state.tasks.map(x => {
                        return firebase
                          .firestore()
                          .collection("tasks")
                          .add({
                            ...x,
                            projectId: this.props.project.id,
                            sprint: this.state.newSprint
                          });
                      });
                      firebase
                        .firestore()
                        .collection("projects")
                        .doc(this.props.project.id)
                        .update({
                          sprints: firebase.firestore.FieldValue.arrayUnion(
                            this.state.newSprint
                          )
                        });
                      this.setState({ openNewSprint: false, tasks: [] });
                    }
                  } else {
                    this.setState({ openNewSprint: false });
                  }
                } else {
                  if (
                    this.state.tasks.length > 0 &&
                    this.state.newSprint !== ""
                  ) {
                    if (
                      this.props.sprints[`sprintItems${this.state.editing}`] &&
                      this.props.sprints[`sprintItems${this.state.editing}`]
                        .items !== this.state.tasks
                    ) {
                      var answer2 = window.confirm(
                        "overwrite old sprint data?"
                      );
                      if (answer2) {
                        var result = this.props.sprints[
                          `sprintItems${this.state.editing}`
                        ].items.filter(x => {
                          return this.state.tasks.find(y => y.id === x.id);
                        });
                        var deleteThese = this.props.sprints[
                          `sprintItems${this.state.editing}`
                        ].items.filter(x => {
                          return result.find(y => y.id === x.id) ? false : true;
                        });
                        deleteThese &&
                          deleteThese.map(x => {
                            return (
                              x.id &&
                              firebase
                                .firestore()
                                .collection("tasks")
                                .doc(x.id)
                                .delete()
                                .then(x =>
                                  console.log(`deleted ${x.id ? x.id : ""}`)
                                )
                                .catch(e => console.log(e.message))
                            );
                          });
                        this.state.tasks.map(x => {
                          return result.find(y => y.id === x.id)
                            ? firebase
                                .firestore()
                                .collection("tasks")
                                .doc(x.id)
                                .update({
                                  ...x,
                                  projectId: this.props.project.id,
                                  sprint: this.state.newSprint
                                })
                            : firebase
                                .firestore()
                                .collection("tasks")
                                .add({
                                  ...x,
                                  projectId: this.props.project.id,
                                  sprint: this.state.newSprint
                                });
                        });
                        !this.props.project.sprints.includes(
                          this.state.editing
                        ) &&
                          firebase
                            .firestore()
                            .collection("projects")
                            .doc(this.props.project.id)
                            .update({
                              sprints: firebase.firestore.FieldValue.arrayUnion(
                                this.state.newSprint
                              )
                            });
                        this.setState({
                          openNewSprint: false,
                          tasks: [],
                          editing: false
                        });
                      }
                    } else {
                      this.setState({
                        openNewSprint: false,
                        tasks: [],
                        editing: false
                      });
                    }
                  } else {
                    firebase
                      .firestore()
                      .collection("projects")
                      .doc(this.props.project.id)
                      .update({
                        sprints: firebase.firestore.FieldValue.arrayRemove(
                          this.state.editing
                        )
                      });
                    this.state.tasks.map(x => {
                      return firebase
                        .firestore()
                        .collection("tasks")
                        .doc(x.id)
                        .delete();
                    });
                    this.setState({
                      openNewSprint: false,
                      tasks: [],
                      editing: false
                    });
                  }
                }
              }}
            >
              {this.state.tasks.length === 0 ? "Delete" : "Save"}
            </div>{" "}
            <br />
            <div
              style={{ color: "grey", fontSize: "14px", marginBottom: "5px" }}
            >
              {this.state.tasks.length} Item{this.state.tasks.length > 1 && "s"}
            </div>
            {this.state.tasks.map((x, i) => {
              return (
                <Task
                  x={x}
                  i={i}
                  projectId={this.props.project.id}
                  deleteTask={i => {
                    var copy = [...this.state.tasks];
                    copy.splice(i, 1);
                    this.setState({ tasks: copy });
                  }}
                  /*saveTask={i => {
                  var copy = [];
                  this.state.tasks.map((x, index) => {
                    if (i === index) {
                      x.exists = true;
                    }
                    return copy.push(x);
                  });
                  this.setState({ tasks: copy });
                }}
                editTask={i => {
                  var copy = [];
                  this.state.tasks.map((x, index) => {
                    if (i === index) {
                      x.exists = false;
                    }
                    return copy.push(x);
                  });
                  this.setState({ tasks: copy });
                }}*/
                  changeMaterial={(materialEstimate, i) => {
                    var copy = [];
                    this.state.tasks.map((x, index) => {
                      if (i === index) {
                        x.materialEstimate = materialEstimate;
                      }
                      return copy.push(x);
                    });
                    this.setState({ tasks: copy });
                  }}
                  changeLabor={(laborEstimate, i) => {
                    var copy = [];
                    this.state.tasks.map((x, index) => {
                      if (i === index) {
                        x.laborEstimate = laborEstimate;
                      }
                      return copy.push(x);
                    });
                    this.setState({ tasks: copy });
                  }}
                  changeTitle={(title, i) => {
                    var copy = [];
                    this.state.tasks.map((x, index) => {
                      if (i === index) {
                        x.title = title;
                      }
                      return copy.push(x);
                    });
                    this.setState({ tasks: copy });
                  }}
                />
              );
            })}
          </div>
        )}
        {this.state.openNewSprint && (
          <div
            onClick={() => this.setState({ tasks: [...this.state.tasks, {}] })}
            style={{
              marginLeft: "20px",
              marginBottom: "20px",
              display: "flex",
              backgroundColor: "navy",
              width: "20%",
              minWidth: "max-content",
              padding: "0px 20px",
              height: "33px",
              borderRadius: "10px",
              alignItems: "center",
              justifyContent: "center",
              color: "white"
            }}
          >
            Add item
          </div>
        )}
        {this.props.auth !== undefined &&
          !this.props.project.pendingPayment &&
          this.props.project.assigneeId === this.props.auth.uid &&
          !this.state.openNewSprint && (
            <div>
              <div
                onClick={() => this.setState({ openNewSprint: true })}
                style={{
                  display: "flex",
                  marginBottom: "20px",
                  backgroundColor: "white",
                  width: "100%",
                  height: "33px",
                  borderRadius: "10px",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "black"
                }}
              >
                Add
              </div>
            </div>
          )}
      </div>
    );
  }
}
export default PreProposal;
