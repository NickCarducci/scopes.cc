import React from "react";
import firebase from ".././init-firebase";
import QueryIndustries from "./QueryIndustires";

class AddCompany extends React.Component {
  state = { industry: "" };
  render() {
    return (
      <div
        style={
          this.props.openAddCompany
            ? {
                display: "flex",
                position: "fixed",
                overflowY: "auto",
                overflowX: "hidden",
                width: "100%",
                height: "100%",
                transform: "translateX(0%)",
                transition: ".3s ease-in",
                backgroundColor: "white"
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
            var allcompanies = [];
            this.props.companies.map(x => {
              return allcompanies.push(x.name.toLowerCase());
            });
            if (allcompanies.includes(this.state.businessName.toLowerCase())) {
              this.setState({ pleaseChooseAnother: true });
            } else {
              if (this.state.industry === "") {
                window.alert(
                  "please select the industry you operate in, or just chose miscellaneous"
                );
              } else {
                firebase
                  .firestore()
                  .collection("companies")
                  .add({
                    businessName: this.state.businessName,
                    authorId: this.props.auth.uid,
                    dateFounded: this.state.dateFounded,
                    industry: this.state.industry
                  });
              }
            }
          }}
          style={{
            padding: "30px",
            display: "flex",
            position: "absolute",
            width: "50%",
            height: "min-content",
            flexDirection: "column"
          }}
        >
          {this.state.pleaseChooseAnother && "please choose another name"}
          <input
            value={this.state.businessName}
            onChange={e => {
              this.state.pleaseChooseAnother &&
                this.setState({ pleaseChooseAnother: false });
              this.setState({ businessName: e.target.value });
            }}
            placeholder="business name"
          />
          <br />
          Take photo or upload
          <br />
          <br />
          <QueryIndustries
            industries={this.props.industries}
            industry={this.state.industry}
            chooseIndustry={x => this.setState({ industry: x })}
            clear={() => {
              this.setState({ industry: "" });
            }}
          />
          <br />
          <input
            value={this.state.dateFounded}
            onChange={e => {
              this.setState({ dateFounded: e.target.value });
            }}
            placeholder="date founded"
          />
          <br />
          <br />
          <button>save</button>
        </form>
      </div>
    );
  }
}
export default AddCompany;
