import React from "react";
import AddCompany from "./Account/AddCompany";

class Companies extends React.Component {
  state = {
    companyQuery: "",
    industries: [
      "software",
      "hardware",
      "law",
      "bookkeeping",
      "communications",
      "live production",
      "animation",
      "gaming",
      "appliance",
      "car",
      "electric",
      "plumbing",
      "framing",
      "masonry",
      "demolition",
      "miscellaneous"
    ],
    filteredIndustry: ""
  };
  render() {
    return (
      <div
        style={
          this.props.openCompanies
            ? {
                display: "flex",
                position: "fixed",
                overflowY: "auto",
                overflowX: "hidden",
                width: "100%",
                height: "100%",
                transform: "translateX(0%)",
                transition: ".3s ease-in",
                backgroundColor: "white",
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
          <div onClick={this.props.open}>
            <b>+ company</b>
          </div>
          <br />
          <br />
          <div style={{ flexWrap: "wrap", display: "flex" }}>
            {this.state.industries.map(x => {
              if (
                this.state.filteredIndustry === "" ||
                x === this.state.filteredIndustry
              ) {
                return (
                  <div
                    onMouseEnter={() => this.setState({ hoverIndustry: x })}
                    onMouseLeave={() => this.setState({ hoverIndustry: false })}
                    style={{ padding: "10px" }}
                  >
                    <div
                      style={
                        this.state.hoverIndustry === x
                          ? { border: "1px solid black" }
                          : { color: "grey" }
                      }
                      onClick={() => this.setState({ filteredIndustry: x })}
                    >
                      {x}
                    </div>
                    {this.state.filteredIndustry !== "" && (
                      <div
                        style={{
                          display: "flex",
                          paddingLeft: "10px",
                          zIndex: "9999"
                        }}
                        onClick={() => this.setState({ filteredIndustry: "" })}
                      >
                        &times;
                      </div>
                    )}
                  </div>
                );
              } else return null;
            })}
          </div>
          <br />
          <div style={{ border: "1px solid black" }} />
          <br />
          <input
            style={{ height: "36px" }}
            placeholder="find company"
            value={this.state.companyQuery}
            onChange={e => this.setState({ companyQuery: e.target.value })}
          />
          {this.props.companies.map(x => {
            if (
              (this.state.filteredIndustry === x.industry ||
                this.state.filteredIndustry === "") &&
              x.businessName.includes(this.state.companyQuery)
            ) {
              return (
                <div
                  style={{
                    display: "flex",
                    position: "relative",
                    height: "36px",
                    border: "1px solid navy",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  {x.businessName}
                  {(this.props.auth.uid === x.authorId ||
                    (x.admin && x.admin.includes(this.props.auth.uid))) && (
                    <div
                      onClick={() =>
                        this.props.chooseAssignee(this.props.assignee)
                      }
                      style={{ display: "flex", paddingLeft: "10px" }}
                    >
                      &times;
                    </div>
                  )}
                </div>
              );
            } else return null;
          })}
        </div>
        {this.props.auth !== undefined && (
          <AddCompany
            users={this.props.users}
            auth={this.props.auth}
            companies={this.props.companies}
            industries={this.state.industries}
            openAddCompany={this.props.openAddCompany}
          />
        )}
      </div>
    );
  }
}
export default Companies;
