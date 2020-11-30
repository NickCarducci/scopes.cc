import React from "react";

class StartWork extends React.Component {
  render() {
    return (
      <div
        style={
          this.props.openMatLab
            ? {
                display: "flex",
                position: "fixed",
                overflowY: "auto",
                overflowX: "hidden",
                width: "100%",
                maxHeight: "100vh",
                height: "400px",
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
        <div
          style={{
            padding: "30px",
            display: "flex",
            position: "absolute",
            width: "50%",
            height: "min-content",
            flexDirection: "column"
          }}
        >
          Clock-in
          {this.props.assignments.map(x => {
            return <div>{x}</div>;
          })}
          <br />
          <br />
          or
          <br />
          <br />
          <div style={{ color: "grey", fontSize: "14px", marginBottom: "5px" }}>
            New Material Purchased
          </div>
          <input placeholder="project" />
          {this.props.myProjects.map(x => {
            return <div>{x}</div>;
          })}
          <br />
          <input placeholder="vendor" />
          <input placeholder="title" />
          <input placeholder="category" />
          <input placeholder="date" />
          <div
            style={{
              display: "flex",
              fontSize: "14px",
              marginTop: "25px",
              border: "1px navy solid",
              height: "56px",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            Take photo or upload
          </div>
        </div>
      </div>
    );
  }
}
export default StartWork;
