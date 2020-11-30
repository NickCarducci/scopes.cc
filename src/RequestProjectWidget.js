import React from "react";
import { Link } from "react-router-dom";
import photo from "./photo.jpeg";

class RequestProjectWidget extends React.Component {
  render() {
    const { x, thisone, client } = this.props;
    return (
      <div
        style={
          this.props.display
            ? {
                backgroundColor: "white",
                position: "relative",
                flexDirection: "column",
                alignItems: "flex-end",
                breakInside: "avoid",
                width: "200px"
              }
            : {
                backgroundColor: "rgb(25,25,30)",
                display: "block",
                breakInside: "avoid"
              }
        }
      >
        <div
          style={
            this.props.highh
              ? { backgroundColor: "rgb(20,20,20)", color: "grey" }
              : { backgroundColor: "rgb(20,20,20)", color: "white" }
          }
        >
          {new Date(
            x.createdDate && x.createdDate.seconds * 1000
          ).toLocaleDateString()}
        </div>
        <Link
          to={this.props.isProject ? `/project/${x.id}` : `/request/${x.id}`}
          style={{
            width: "100%",
            display: "block",
            textDecoration: "none",
            color: "white" //rgb(150,170,185)
          }}
        >
          <div
            style={
              this.props.isRequest
                ? {
                    color: "grey",
                    display: "block",
                    position: "absolute"
                  }
                : {
                    display: "block",
                    position: "absolute"
                  }
            }
          >
            <div
              style={{ padding: "10px", backgroundColor: "rgba(0,0,0,0.7)" }}
            >
              {x.title}
              <br />
              {x.body}
              <br />
              <div
                style={
                  x.pendingPayment
                    ? { color: "grey" }
                    : x.paid
                    ? { color: "grey" }
                    : { color: "grey" }
                }
              >
                ${x.budget}
              </div>
            </div>
            <div
              style={{
                width: isNaN(x.pendingPayment - x.paid + 10)
                  ? 10
                  : x.pendingPayment - x.paid + 10,
                padding: "10px",
                display: "flex",
                position: "relative",
                backgroundColor: "rgba(120,0,0,0.7)"
              }}
            />
          </div>
          <img
            style={{
              width: "100%"
            }}
            src={photo}
            alt="error"
          />
          {(this.props.person || thisone) && !this.props.display && (
            <div style={{ position: "relative" }}>
              <div
                style={
                  !x.pendingPayment && !x.paid
                    ? {
                        flexDirection: "column",
                        display: "flex",
                        bottom: "0px",
                        right: "0px",
                        position: "absolute",
                        alignItems: "flex-end",
                        backgroundColor: "rgba(0,0,0,0.7)"
                      }
                    : {
                        opacity: ".5",
                        flexDirection: "column",
                        display: "flex",
                        bottom: "0px",
                        right: "0px",
                        position: "absolute",
                        alignItems: "flex-end",
                        backgroundColor: "rgba(0,0,0,0.7)"
                      }
                }
              >
                {!x.pendingPayment && !x.paid && <div className="loading" />}
                <div
                  style={{
                    display: "flex",
                    bottom: "0px",
                    right: "0px",
                    position: "relative",
                    alignItems: "center",
                    backgroundColor: "rgba(0,0,0,0.7)"
                  }}
                >
                  <img
                    style={{ width: "20px", height: "20px" }}
                    alt="error"
                    src={
                      thisone
                        ? thisone.photoThumbnail
                        : this.props.person.photoThumbnail
                    }
                  />
                  {thisone ? thisone.businessName : this.props.person.username}
                  {this.props.auth !== undefined &&
                    this.props.person.id === this.props.auth.uid &&
                    " (you)"}
                </div>
              </div>
            </div>
          )}
          <div
            style={
              x.pendingPayment && !x.paid
                ? {
                    display: "flex",
                    bottom: "0px",
                    right: "0px",
                    position: "relative",
                    backgroundColor: "rgba(0,0,0,0.7)",
                    alignItems: "center"
                  }
                : {
                    opacity: ".5",
                    display: "flex",
                    bottom: "0px",
                    right: "0px",
                    position: "relative",
                    backgroundColor: "rgba(0,0,0,0.7)",
                    alignItems: "center"
                  }
            }
          >
            {client && (
              <img
                style={{ width: "50px", height: "50px" }}
                alt="error"
                src={client.photoThumbnail}
              />
            )}
            {client && client.username}
            {x.pendingPayment && !x.paid && <div className="loading" />}
          </div>
        </Link>
      </div>
    );
  }
}
export default RequestProjectWidget;
