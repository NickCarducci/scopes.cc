import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import firebase from "./init-firebase";

var CLIENT_ID =
  "782099731386-homnqho2840h3kdvarjsavsmnp9bqak4.apps.googleusercontent.com";
var API_KEY = "AIzaSyAs9BpsQZFolkkBn4ShDTzb1znu_7JM894";

var DISCOVERY_DOCS =
  "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest";

var SCOPES = "https://www.googleapis.com/auth/drive.file";

class ImportFireToBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      projects: [],
      requests: [],
      auth: undefined,
      lastauth: null,
      users: undefined,
      user: undefined,
      loaded: false,
      loggedOut: true,
      filesPreparedToSend: [],
      chats: [],
      myDocs: [],
      companies: [],
      myCompanies: []
    };
    this.signOut = this.signOut.bind(this);
  }
  logout = () => {
    document.location.href =
      "https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=https://wavepoint.la";
  };
  signOut = () => {
    if (this.gapi) {
      const auth2 = this.gapi.auth2.getAuthInstance();
      //console.log(auth2);
      auth2.signOut().then(() => {
        //if (auth2 !== null) {
        console.log("pl");
        auth2.disconnect();
      });
      auth2.disconnect();
      this.logout();
    }
  };
  switchAccount = () => {
    this.gapi.auth2.getAuthInstance().signIn({
      api_key: API_KEY,
      client_id: CLIENT_ID,
      scope: SCOPES,
      prompt: "select_account"
    }); //.then(this.afterSignIn);
  };
  pickerCallback = (data) => {
    if (data.action === window.google.picker.Action.PICKED) {
      var fileId = data.docs[0].id;
      //console.log(fileId);
      //console.log(window.gapi);
      //console.log(data.docs[0].name);
      this.s.setItemIds([fileId]);
      if (this.state.filesPreparedToSend !== data.docs) {
        //console.log(data.docs);
        this.setState({ filesPreparedToSend: data.docs });
      }
    }
  };
  pickerCallback2 = (data) => {
    if (data.action === window.google.picker.Action.PICKED) {
      var fileId = data.docs[0].id;
      //console.log(fileId);
      //console.log(window.gapi);
      //console.log(data.docs[0].name);
      this.s.setItemIds([fileId]);
      if (this.state.filesPreparedToSend !== data.docs) {
        //console.log(data.docs);
        this.setState({ filesPreparedToSend: data.docs });
      }
    }
  };
  loadGapiAuth = () => {
    //var DIALOG_DIMENSIONS = { width: "90%", height: "90%" };
    this.gapi.load(
      "client:auth2",
      () => {
        this.gapi.client.load("drive", "v3", () => console.log("loaded drive"));
        this.gapi.load("signin2", () => {
          // render a sign in button
          // using this method will show Signed In if the user is already signed in
          var opts = {
            width: 200,
            height: 50,
            position: "relative"
            //prompt: "none"
          };
          this.gapi.signin2.render("loginButton", opts);
        });
        this.gapi.auth2.authorize(
          {
            api_key: API_KEY,
            client_id: CLIENT_ID,
            scope: SCOPES,
            prompt: "none"
            //prompt: "select_account"
          },
          (authResult) => {
            if (authResult) {
              this.auth2 = this.gapi.auth2.init({
                discoveryDocs: DISCOVERY_DOCS,
                clientId:
                  "782099731386-homnqho2840h3kdvarjsavsmnp9bqak4.apps.googleusercontent.com"
              });
              this.setState({
                accessToken: authResult.access_token,
                authorizedScopes: true,
                signedIn: true
              });
              this.gapi.load("drive-share", () => {
                this.s = window.s;
                this.s = new window.gapi.drive.share.ShareClient();
                this.s.setOAuthToken(authResult.access_token);
              });
              this.gapi.load("picker", () => {
                this.googlepicker = window.google;
                this.setState({ authResult });
                var view3 = new this.googlepicker.picker.DocsView(
                  this.googlepicker.picker.ViewId.IMAGE
                ).setSelectFolderEnabled(true);

                var uploadView3 = new this.googlepicker.picker.DocsUploadView();

                view3.setMode(this.googlepicker.picker.DocsViewMode.LIST);
                view3.setQuery(window.dataFeedName);
                this.picker3 = window.picker3;
                this.picker3 = new this.googlepicker.picker.PickerBuilder()
                  .setAppId(CLIENT_ID)
                  .setOAuthToken(authResult.access_token)
                  .addView(view3)
                  .addView(uploadView3)
                  .setOrigin("https://ewb6x.csb.app")
                  .setCallback(this.pickerCallback)
                  .build();
                var view2 = new this.googlepicker.picker.DocsView(
                  this.googlepicker.picker.ViewId.IMAGE
                ).setSelectFolderEnabled(true);

                var uploadView2 = new this.googlepicker.picker.DocsUploadView();

                view2.setMode(this.googlepicker.picker.DocsViewMode.LIST);
                view2.setQuery(window.dataFeedName);
                this.picker2 = window.picker2;
                this.picker2 = new this.googlepicker.picker.PickerBuilder()
                  .setAppId(CLIENT_ID)
                  .setOAuthToken(authResult.access_token)
                  .addView(view2)
                  .addView(uploadView2)
                  .setOrigin("https://ewb6x.csb.app")
                  .setCallback(this.pickerCallback2)
                  .build();

                var view = new this.googlepicker.picker.DocsView(
                  this.googlepicker.picker.ViewId.IMAGE
                ).setSelectFolderEnabled(true);

                var uploadView = new this.googlepicker.picker.DocsUploadView();

                view2.setMode(this.googlepicker.picker.DocsViewMode.LIST);
                view2.setQuery(window.dataFeedName);
                this.picker = window.picker;
                this.picker = new this.googlepicker.picker.PickerBuilder()
                  .setAppId(CLIENT_ID)
                  .setOAuthToken(authResult.access_token)
                  .addView(view)
                  .addView(uploadView)
                  .setOrigin("https://ewb6x.csb.app")
                  .setCallback(this.pickerCallback2)
                  .build();
              });
            }
          }
        );
      },
      10
    );
  };
  loadYoutubeApi() {
    //var DIALOG_DIMENSIONS = { width: "90%", height: "90%" };
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/api.js";
    script.onload = () => {
      this.gapi = window.gapi;
      if (!this.gapi.auth2) {
        this.loadGapiAuth();
      }
    };
    document.body.appendChild(script);
  }
  componentDidMount = () => {
    firebase
      .firestore()
      .collection("users")
      .onSnapshot((querySnapshot) => {
        let users = [];
        querySnapshot.docs.forEach((doc) => {
          if (doc.exists) {
            let data = doc.data();
            data.photoThumbnail = data.photoThumbnail
              ? data.photoThumbnail
              : "https://www.dl.dropboxusercontent.com/s/wef09yq3mgu8eif/profile1%20%281%29.png?dl=0";
            data.id = doc.id;
            data.profilergb = data.profilergb
              ? data.profilergb
              : "#" + (((1 << 24) * Math.random()) | 0).toString(16);
            users.push(data);
            if (querySnapshot.docs.length === users.length) {
              //this.getUserInfo();
              this.setState({ users });
            }
          }
          return console.log(`${users.length} users signed up`);
        });
      });
    firebase
      .firestore()
      .collection("companies")
      .onSnapshot((querySnapshot) => {
        let p = 0;
        let fo = [];
        querySnapshot.docs.forEach((doc) => {
          p++;
          if (doc.exists) {
            const foo = doc.data();
            foo.id = doc.id;
            fo.push(foo);
            if (p === querySnapshot.docs.length) {
              this.setState({
                companies: fo
              });
            }
          }
        });
      });
    firebase
      .firestore()
      .collection("requests")
      .onSnapshot((querySnapshot) => {
        let p = 0;
        let fo = [];
        querySnapshot.docs.forEach((doc) => {
          p++;
          if (doc.exists) {
            const foo = doc.data();
            foo.id = doc.id;
            fo.push(foo);
            if (p === querySnapshot.docs.length) {
              this.setState({
                requests: fo
              });
            }
          }
        });
      });
    //this.loadYoutubeApi();
    this.refresh();
    window.addEventListener("resize", this.refresh, true);
  };
  componentWillUnmount = () => {
    window.removeEventListener("resize", this.refresh);
  };
  refresh = () => {
    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => {
      var width = window.innerWidth; // * 0.15;
      var height = window.innerHeight; // * 0.15;
      this.setState({
        width,
        height
      });
    }, 50);
  };
  getFile = async (x) => {
    await fetch(`https://www.googleapis.com/drive/v3/files/${x}`)
      .then(async (x) => await x.json())
      .then((x) => {
        console.log(x);
      })
      .catch((x) => console.log(x));
  };
  getUserInfo = () => {
    this.setState({ stop: true });
    firebase.auth().onAuthStateChanged(async (meAuth) => {
      if (meAuth) {
        meAuth.getIdToken(/* forceRefresh */ true).then(async (idToken) => {
          firebase
            .firestore()
            .collection("users")
            .doc(meAuth.uid)
            .onSnapshot((querySnapshot) => {
              if (querySnapshot.exists) {
                let b = querySnapshot.data();
                b.photoThumbnail = b.photoThumbnail
                  ? b.photoThumbnail
                  : "https://www.dl.dropboxusercontent.com/s/wef09yq3mgu8eif/profile1%20%281%29.png?dl=0";
                b.id = querySnapshot.id;
                b.profilergb = b.profilergb
                  ? b.profilergb
                  : "#" + (((1 << 24) * Math.random()) | 0).toString(16);

                if (this.state.user !== b) {
                  var myCompanies = this.state.companies.filter(
                    (x) =>
                      x.authorId === meAuth.uid ||
                      (x.admin && x.admin.includes(meAuth.uid))
                  );
                  this.setState({
                    myCompanies,
                    user: b,
                    auth: meAuth,
                    loaded: true,
                    loggedOut: false
                  });
                  firebase
                    .firestore()
                    .collection("projects")
                    .where("assigneeId", "==", meAuth.uid)
                    .onSnapshot((querySnapshot) => {
                      let p = 0;
                      let fo = [];
                      querySnapshot.docs.forEach((doc) => {
                        p++;
                        if (doc.exists) {
                          const foo = doc.data();
                          foo.id = doc.id;
                          fo.push(foo);
                          if (p === querySnapshot.docs.length) {
                            this.setState({ projects: fo });
                            firebase
                              .firestore()
                              .collection("projects")
                              .where("clientId", "==", meAuth.uid)
                              .onSnapshot((querySnapshot) => {
                                let p = 0;
                                querySnapshot.docs.forEach((doc) => {
                                  p++;
                                  if (doc.exists) {
                                    const foo = doc.data();
                                    foo.id = doc.id;
                                    fo.push(foo);
                                    if (p === querySnapshot.docs.length) {
                                      this.setState({
                                        projects: [
                                          ...this.state.projects,
                                          ...fo
                                        ]
                                      });
                                    }
                                  }
                                });
                              });
                          }
                        }
                      });
                    });
                }
              }
            });
        });
      }
    });
  };
  //.catch(function(error) {console.log("Error getting documents:", error);});

  moreMessages = () => {
    this.state.lastMessage &&
      firebase
        .firestore()
        .collection("chats")
        .where("recipients", "array-contains", this.props.auth.uid)
        //.orderBy("time", "desc")
        //.limit(this.state.n)
        .orderBy("time", "desc")
        .startAfter(this.state.lastMessage)
        .limit(100)
        .onSnapshot((querySnapshot) => {
          let p = 0;
          let f = [];
          querySnapshot.docs.forEach((doc) => {
            p++;
            if (doc.exists) {
              const foo = doc.data();
              foo.id = doc.id;
              if (foo.entityType) {
                f.push(foo);
              }
              if (p === querySnapshot.docs.length && this.state.chats !== f) {
                var invites = f.filter(
                  (x) => x.date && !Object.keys(this.props.notes).includes(x.id)
                );
                var selfvites = invites.filter(
                  (x) =>
                    //x.date &&
                    x.recipients === 1 &&
                    x.recipients.includes(this.props.auth.uid)
                );
                this.setState({ chats: f, invites, selfvites });
              }
            }
          });
        });
  };
  againBackMessages = () => {
    this.state.againMessage &&
      firebase
        .firestore()
        .collection("chats")
        .where("recipients", "array-contains", this.props.auth.uid)
        //.orderBy("time", "desc")
        //.limit(this.state.n)
        .orderBy("time", "desc")
        .startAfter(this.state.againMessage)
        .limit(100)
        .onSnapshot((querySnapshot) => {
          let p = 0;
          let f = [];
          querySnapshot.docs.forEach((doc) => {
            p++;
            if (doc.exists) {
              const foo = doc.data();
              foo.id = doc.id;
              if (foo.entityType) {
                f.push(foo);
              }
              if (p === querySnapshot.docs.length && this.state.chats !== f) {
                var invites = f.filter(
                  (x) => x.date && !Object.keys(this.props.notes).includes(x.id)
                );
                var selfvites = invites.filter(
                  (x) =>
                    //x.date &&
                    x.recipients === 1 &&
                    x.recipients.includes(this.props.auth.uid)
                );
                this.setState({ chats: f, invites, selfvites });
              }
            }
          });
        });
  };
  moreDocs = () => {
    this.state.lastMessage &&
      firebase
        .firestore()
        .collection("chats")
        .where("recipients", "array-contains", this.props.auth.uid)
        //.orderBy("time", "desc")
        //.limit(this.state.n)
        .orderBy("time", "desc")
        .startAfter(this.state.lastDoc)
        .limit(20)
        .onSnapshot((querySnapshot) => {
          let p = 0;
          let f = [];
          querySnapshot.docs.forEach((doc) => {
            p++;
            if (doc.exists) {
              const foo = doc.data();
              foo.id = doc.id;
              if (foo.entityType) {
                f.push(foo);
              }
              if (p === querySnapshot.docs.length && this.state.myDocs !== f) {
                this.setState({
                  myDocs: f
                });
              }
            }
          });
        });
  };
  againBackDocs = () => {
    this.state.againMessage &&
      firebase
        .firestore()
        .collection("chats")
        .where("recipients", "array-contains", this.props.auth.uid)
        //.orderBy("time", "desc")
        //.limit(this.state.n)
        .orderBy("time", "desc")
        .startAfter(this.state.againDoc)
        .limit(20)
        .onSnapshot((querySnapshot) => {
          let p = 0;
          let f = [];
          querySnapshot.docs.forEach((doc) => {
            p++;
            if (doc.exists) {
              const foo = doc.data();
              foo.id = doc.id;
              if (foo.entityType) {
                f.push(foo);
              }
              if (p === querySnapshot.docs.length && this.state.myDocs !== f) {
                this.setState({
                  myDocs: f
                });
              }
            }
          });
        });
  };
  render() {
    return (
      <App
        width={this.state.width}
        height={this.state.height}
        projects={this.state.projects}
        requests={this.state.requests}
        myCompanies={this.state.myCompanies}
        companies={this.state.companies}
        chats={this.state.chats}
        moreMessages={this.moreMessages}
        againBackMessages={this.againBackMessages}
        myDocs={this.state.myDocs}
        moreDocs={this.moreDocs}
        againBackDocs={this.againBackDocs}
        tickets={this.state.tickets}
        myEvents={this.state.myEvents}
        myClubs={this.state.myClubs}
        myJobs={this.state.myJobs}
        auth={this.state.auth}
        users={this.state.users}
        user={this.state.user}
        loaded={this.state.loaded}
        //
        showpicker2={() => {
          if (this.picker2) {
            console.log("buyer");
            this.picker2.setVisible(true);
          }
        }}
        //showpicker2={this.props.showpicker2}
        //settingsOpen={this.state.settingsOpen}
        //profileOpen={this.props.profileOpen}
        filePreparedToSend={this.state.filesPreparedToSend}
        picker2={this.picker2}
        loadGapiAuth={this.loadGapiAuth}
        signedIn={this.state.signedIn}
        switchAccount={this.switchAccount}
        signOut={this.signOut}
        //

        clearFilePreparedToSend={() =>
          this.setState({ filesPreparedToSend: [] })
        }
        loadYoutubeApi={this.loadYoutubeApi}
        s={this.s}
        authResult={this.state.authResult}
        googlepicker={this.googlepicker}
      />
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <ImportFireToBase />
  </BrowserRouter>,
  rootElement
);
