class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      avatar: "",
      respuestaDeLaApi: {
        arrayListaProductos: [],
      },
      users: [],
    };
  }
//cuando se termina de cargar la aplicacion en el navegador, se llama a este metodo
  componentDidMount() {
    fetch("/api/products")
      .then((response) => {
        return response.json();
      })
      .then((respuestaDeLaApi) => {
        fetch("/api/users")
          .then((response) => {
            return response.json();
          })
          .then((respuestaDeLaApiUsuarios) => {
            this.setState({
              users: respuestaDeLaApiUsuarios.users,
              respuestaDeLaApi,
              email: getCookie("usuarioLogeado"),
              avatar: getCookie("avatar"),
            });
          });
      });
  }

  render() {
    const { avatar, email, respuestaDeLaApi, users } = this.state;
    return (
      <div className="App">
        <div id="wrapper">
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Header mail={email} foto={avatar} />
              <div className="container-fluid">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                  <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-12">
                    <AmountProducts
                      amount={respuestaDeLaApi.arrayListaProductos.length}
                    />
                  </div>

                  <div className="col-md-6 mb-12">
                    <AmountUsers amount={users.length} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6 mb-4">
                    <TotalProducts products={respuestaDeLaApi.arrayListaProductos}/>
                  </div>
                  <div className="col-lg-6 mb-4">
                    <Category products={respuestaDeLaApi.arrayListaProductos} />
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

ReactDOM.render(<App />, document.querySelector("#react-dashboard"));
