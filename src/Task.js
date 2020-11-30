import React from "react";
import firebase from "./init-firebase";

class Task extends React.Component {
  state = {};
  render() {
    const { x, i, projectId } = this.props;
    //if (!x.exists) {
    return (
      <form
        style={{
          height: "min-content",
          display: "flex",
          borderRadius: "3px",
          padding: "5px",
          width: "calc(100% - 40px)",
          fontSize: "12px"
        }}
        onSubmit={() => {
          firebase
            .firestore()
            .collection("sprints")
            .add({
              projectId
            });
        }}
      >
        {i + 1}.&nbsp;
        <div
          style={{
            height: "min-content",
            display: "flex",
            position: "absolute",
            borderRadius: "3px",
            padding: "5px",
            width: "min-content",
            backgroundColor: "navy",
            color: "white",
            fontSize: "10px",
            marginBottom: "3px",
            right: "10px"
          }}
          onClick={() => {
            if (!x.materialEstimate && !x.laborEstimate && !x.title) {
              this.props.deleteTask(i);
            } else {
              var answer = window.confirm("delete estimate item?");
              if (answer) {
                this.props.deleteTask(i);
              }
            }
          }}
        >
          delete
        </div>
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            padding: "0px 10px",
            fontSize: "12px",
            width: "100%",
            flexWrap: "wrap"
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "0px 10px",
              width: "min-content",
              border: "1px solid grey",
              height: "26px",
              fontSize: "12px",
              backgroundColor: "rgb(200,200,200)"
            }}
          >
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
              Title
            </div>
            &nbsp;@
            <input
              value={x.title}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "0px 10px",
                width: "min-content",
                border: "1px solid grey",
                height: "26px",
                fontSize: "12px"
              }}
              placeholder="name"
              onChange={e => this.props.changeTitle(e.target.value, i)}
            />
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
            &nbsp;$
            <input
              value={x.materialEstimate}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "0px 10px",
                width: "min-content",
                border: "1px solid grey",
                height: "26px",
                fontSize: "12px"
              }}
              placeholder="cost"
              onChange={e => this.props.changeMaterial(e.target.value, i)}
            />
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
            &nbsp;$
            <input
              value={x.laborEstimate}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "0px 10px",
                width: "min-content",
                border: "1px solid grey",
                height: "26px",
                fontSize: "12px"
              }}
              placeholder="cost"
              onChange={e => this.props.changeLabor(e.target.value, i)}
            />
          </div>
        </div>
        {/*<div
            onMouseEnter={() => this.setState({ highlight: true })}
            onMouseLeave={() => this.setState({ highlight: false })}
            onClick={() => {
              if (x.materialEstimate && x.laborEstimate && x.title) {
                this.props.saveTask(i);
              } else {
                window.alert("please fill this item out or delete it");
              }
            }}
            style={
              this.state.highlight
                ? {
                    display: "flex",
                    position: "absolute",
                    borderRadius: "3px",
                    padding: "5px",
                    width: "min-content",
                    backgroundColor: "navy",
                    color: "white",
                    fontSize: "10px",
                    right: "60px"
                  }
                : {
                    display: "flex",
                    position: "absolute",
                    borderRadius: "3px",
                    padding: "5px",
                    width: "min-content",
                    backgroundColor: "rgb(100,150,200)",
                    color: "white",
                    fontSize: "10px",
                    right: "60px"
                  }
            }
          >
            &times;
          </div>*/}
      </form>
    );
    /*} else
      return (
        <div
          style={{
            borderRadius: "4px",
            padding: "2px",
            fontSize: "12px"
          }}
        >
          {i + 1}.&nbsp;{x.title}
          <div
            onClick={() => this.props.editTask(i)}
            style={{
              borderRadius: "3px",
              padding: "2px",
              backgroundColor: "navy",
              color: "white",
              fontSize: "10px"
            }}
          >
            EDIT
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexWrap: "wrap"
            }}
          >
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
                  width: "min-content",
                  border: "1px solid grey",
                  height: "26px",
                  fontSize: "12px"
                }}
              >
                Material
              </div>
              &nbsp;$
              {x.materialEstimate}
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
                Labor
              </div>
              &nbsp;$
              {x.laborEstimate}
            </div>
            <div
              style={{ margin: "5px" }}
              onClick={() => {
                var answer = window.confirm("delete estimate item?");
                if (answer) {
                  this.props.deleteTask(i);
                }
              }}
            >
              &times;
            </div>
          </div>
        </div>
      );*/
  }
}
export default Task;
