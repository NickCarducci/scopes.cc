import React from "react";
import firebase from ".././init-firebase";
//import calicon from "./calicon.png";
import ReportsHeader from "./ReportsHeader";
class Reports extends React.Component {
  constructor(props) {
    super(props);
    this.state = { balance: 0 };
    this.stinker = React.createRef();
  }
  loadDwolla = async () => {
    //var DIALOG_DIMENSIONS = { width: "90%", height: "90%" };
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = "https://cdn.dwolla.com/1/dwolla.js";
    /*s.src =
      environment === 'prod'
        ? 'https://cdn.dwolla.com/1/dwolla.min.js'
        : 'https://cdn.dwolla.com/1/dwolla.js'

    s.addEventListener('load', (): void => {
      window.dwolla.configure(environment)
      resolve()
    }) */
    script.onload = async () => {
      const appKey = "OrFxbaqmtJzKhZVlWAM58yc4GZkXKYHFtLwpm5DG426IREJffi";
      const appSecret = "PutLuNs2sksYmOiSdwldnUcjCPlD2UgQX7PCzhALbBTrZOmgId";
      await fetch(`https://api-sandbox.dwolla.com/token`, {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "jwi5k.csb.app",
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${btoa({ [appKey]: appSecret })}`
        },
        body: { grant_type: "client_credentials" },
        maxAge: 3600
      })
        .then(async response => await response.json())
        .then(body => {
          console.log(body);
        })

        .catch(err => console.log(err.message));
      window.dwolla.configure("dev");
      console.log("ok");
      const dwolla = window.dwolla;
      //const appKey = "OrFxbaqmtJzKhZVlWAM58yc4GZkXKYHFtLwpm5DG426IREJffi";
      //const appSecret = "PutLuNs2sksYmOiSdwldnUcjCPlD2UgQX7PCzhALbBTrZOmgId";
      const client = new dwolla.Client({
        key: appKey,
        secret: appSecret,
        environment: "sandbox" // optional - defaults to production
      });
      // create a token
      client.auth
        .client()
        .then(appToken => {
          console.log(appToken);
          appToken.get("customers", { limit: 10 });
        })
        .then(res => console.log(res.body));
    };
    document.body.appendChild(script);
  };
  componentDidMount = () => {
    //this.loadDwolla();
  };
  render() {
    return (
      <div
        onScroll={e => {
          if (
            this.stinker.current.scrollTop <= 224 &&
            this.state.showtimeheader
          ) {
            this.setState({ showtimeheader: false });
          } else if (
            this.stinker.current.scrollTop > 224 &&
            !this.state.showtimeheader
          ) {
            this.setState({ showtimeheader: true });
          }
        }}
        style={
          this.props.reportsOpen && this.state.showThisRef
            ? {
                display: "flex",
                position: "fixed",
                backgroundColor: "white",
                bottom: "61px",
                width: "100%",
                top: "0",
                left: "0",
                color: "teal",
                zIndex: "3",
                transition: ".3s ease-in",
                flexDirection: "column"
              }
            : this.props.reportsOpen
            ? {
                display: "flex",
                position: "fixed",
                backgroundColor: "white",
                bottom: "5px",
                width: "100%",
                top: "0",
                left: "0",
                color: "teal",
                zIndex: "3",
                transition: ".3s ease-in",
                flexDirection: "column"
              }
            : {
                display: "flex",
                position: "fixed",
                backgroundColor: "white",
                bottom: "5px",
                width: "0%",
                top: "0",
                left: "0",
                color: "white",
                opacity: "0",
                zIndex: "-1",
                transition: ".3s ease-out",
                flexDirection: "column"
              }
        }
      >
        <div
          style={{
            display: "flex",
            position: "fixed",
            backgroundColor: "rgb(20,20,40)",
            borderBottom: "1px white solid",
            height: "56px",
            width: "100%",
            top: "0px",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            zIndex: "1",
            transform: "translateY(0%)"
          }}
        >
          <div
            onClick={async () => {
              var answer = window.confirm("Are you sure you want to log out?");
              if (answer) {
                await firebase
                  .auth()
                  .setPersistence(firebase.auth.Auth.Persistence.SESSION);
                firebase
                  .auth()
                  .signOut()
                  .then(() => {
                    console.log("logged out");
                  })
                  .catch(err => {
                    console.log(err);
                  });
                this.props.close();
                window.location.reload();
              }
            }}
            style={{
              display: "flex",
              position: "absolute",
              backgroundColor: "rgb(20,20,40)",
              borderBottom: "1px white solid",
              height: "56px",
              width: "56px",
              top: "0px",
              left: "10px",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              zIndex: "1",
              transform: "translateY(0%)"
            }}
          >
            Log out
          </div>
          <div
            style={{
              display: "flex",
              position: "absolute",
              backgroundColor: "rgb(20,20,40)",
              borderBottom: "1px white solid",
              height: "56px",
              width: "56px",
              top: "0px",
              right: "0px",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              zIndex: "1",
              transform: "translateY(0%)"
            }}
            onClick={
              this.state.revenueShow || this.state.expenseShow
                ? () =>
                    this.setState({ revenueShow: false, expenseShow: false })
                : this.props.close
            }
          >
            {">"}
          </div>
          <h1>Reports</h1>
          {/*<img
            src={calicon}
            style={{
              display: "flex",
              position: "absolute",
              right: "0px",
              margin: "10px",
              width: "36px",
              top: "0px",
              height: "36px",
              backgroundColor: "teal",
              alignItems: "center",
              justifyContent: "center",
              zIndex: "1",
              color: "white"
            }}
            alt="error"
          />*/}
        </div>
        <div
          ref={this.stinker}
          style={
            !this.props.reportsOpen
              ? {
                  display: "flex",
                  position: "fixed",
                  backgroundColor: "white",
                  bottom: "112px",
                  width: "0%",
                  top: "56px",
                  left: "0",
                  color: "white",
                  opacity: "0",
                  zIndex: "-1",
                  transition: ".3s ease-out",
                  flexDirection: "column",
                  overflowY: "auto",
                  overflowX: "hidden"
                }
              : (this.stinker.current && this.stinker.current.scrollTop) >
                  224 ||
                this.state.expenseShow ||
                this.state.revenueShow
              ? {
                  display: "flex",
                  position: "fixed",
                  backgroundColor: "white",
                  bottom: "112px",
                  width: "100%",
                  top: "0",
                  left: "0",
                  color: "teal",
                  zIndex: "1",
                  transition: ".3s ease-in",
                  flexDirection: "column",
                  overflowY: "auto",
                  overflowX: "hidden"
                }
              : {
                  display: "flex",
                  position: "fixed",
                  backgroundColor: "white",
                  bottom: "112px",
                  width: "100%",
                  top: "56px",
                  left: "0",
                  color: "teal",
                  zIndex: "1",
                  transition: ".3s ease-in",
                  flexDirection: "column",
                  overflowY: "auto",
                  overflowX: "hidden"
                }
          }
        >
          <div
            style={{
              display: "flex",
              position: "absolute",
              backgroundColor: "white",
              height: "min-content",
              width: "100%",
              top: "0",
              left: "0",
              color: "teal",
              zIndex: "1",
              transition: ".3s ease-in",
              flexDirection: "column"
            }}
          >
            <ReportsHeader
              user={this.props.user}
              myCompanies={this.props.myCompanies}
              revenueShow={this.state.revenueShow}
              expenseShow={this.state.expenseShow}
              balance={this.state.balance}
            />
          </div>
        </div>
        <div
          style={
            this.state.showThisRef && !this.state.scrollingDown
              ? {
                  display: "flex",
                  position: "fixed",
                  color: "teal",
                  borderBottom: "1px white solid",
                  bottom: "0px",
                  width: "100%",
                  alignItems: "center",
                  flexDirection: "column",
                  backgroundColor: "white",
                  zIndex: "9999",
                  height: "56px",
                  justifyContent: "center"
                }
              : { display: "none" }
          }
        >
          {this.state.showThisRef}
        </div>
      </div>
    );
  }
}
export default Reports;
