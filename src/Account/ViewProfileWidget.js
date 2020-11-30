import React from "react";

class ViewProfileWidget extends React.Component {
  state = { projects: [] };
  render() {
    const { profile } = this.props;
    var projects =
      this.props.auth !== undefined &&
      this.props.projects.filter(
        x =>
          x.assigneeId === this.props.auth.uid ||
          x.clientId === this.props.auth.uid
      );
    return (
      <div
        onClick={this.props.set}
        onMouseEnter={() => this.setState({ hoveredUser: profile.id })}
        onMouseLeave={() => this.setState({ hoveredUser: "" })}
        style={{
          position: "relative",
          display: "flex",
          width: "max-content",
          height: "min-content",
          alignItems: "center"
        }}
      >
        <div
          style={{
            display: "flex",
            width: "56px",
            height: "56px",
            borderRadius: "50px"
          }}
        >
          <img
            style={
              this.state.hoveredUser === profile.id
                ? { width: "56px" }
                : { width: "56px", opacity: ".5" }
            }
            src={profile.photoThumbnail}
            alt="error"
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              position: "relative",
              color: "grey",
              width: "max-content",
              transform: "translate(2px,2px)",
              marginBottom: "2px"
            }}
          >
            {projects.length} projects with
          </div>
          <div
            style={
              this.state.hoveredUser === profile.id
                ? {
                    width: "min-content",
                    display: "flex",
                    position: "relative",
                    height: "min-content",
                    alignItems: "center",
                    border: "1px dotted white",
                    padding: "2px 5px",
                    color: "black",
                    backgroundColor: "white",
                    borderRadius: "10px",
                    justifyContent: "flex-start"
                  }
                : {
                    width: "min-content",
                    display: "flex",
                    position: "relative",
                    height: "min-content",
                    alignItems: "center",
                    border: "1px dotted white",
                    padding: "2px 5px",
                    color: "grey",
                    backgroundColor: "rgb(200,200,200)",
                    borderRadius: "10px",
                    justifyContent: "flex-start"
                  }
            }
          >
            {profile.username}
          </div>
        </div>
      </div>
    );
  }
}
export default ViewProfileWidget;
