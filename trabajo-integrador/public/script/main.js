function AmountProducts(props) {
  return React.createElement(Etiqueta, {
    title: "Total de Productos",
    amount: props.amount,
    icon: "fas fa-clipboard-list fa-2x text-gray-300",
    color: "border-left-primary"
  });
}

function AmountUsers(props) {
				return React.createElement(Etiqueta, {
								title: "Total de Usuarios",
								amount: props.amount,
								icon: "fas fa-user-check fa-2x text-gray-300",
								color: "border-left-warning" });
}

function Card({ children, title }) {
  return React.createElement(
    "div",
    { className: "card shadow mb-4" },
    React.createElement(
      "div",
      { className: "card-header py-3" },
      React.createElement(
        "h6",
        { className: "m-0 font-weight-bold text-primary" },
        title
      )
    ),
    React.createElement(
      "div",
      { className: "card-body" },
      children
    )
  );
}

function Carrousel(props) {
  return React.createElement(
    "div",
    { id: "carouselExampleControls", "class": "carousel slide", "data-ride": "carousel" },
    React.createElement(
      "div",
      { "class": "carousel-inner" },
      props.fotos.map((prod, i) => React.createElement(
        "div",
        { key: prod.title, className: `carousel-item ${i === 0 ? 'active' : ''}` },
        React.createElement("img", {
          src: `${prod.image}`,
          className: "d-block w-100",
          alt: "#"
        })
      ))
    ),
    React.createElement(
      "a",
      { "class": "carousel-control-prev", href: "#carouselExampleControls", role: "button", "data-slide": "prev" },
      React.createElement("span", { "class": "carousel-control-prev-icon", "aria-hidden": "true" }),
      React.createElement(
        "span",
        { "class": "sr-only" },
        "Previous"
      )
    ),
    React.createElement(
      "a",
      { "class": "carousel-control-next", href: "#carouselExampleControls", role: "button", "data-slide": "next" },
      React.createElement("span", { "class": "carousel-control-next-icon", "aria-hidden": "true" }),
      React.createElement(
        "span",
        { "class": "sr-only" },
        "Next"
      )
    )
  );
}
class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }
  //evento onclick en categoria remeras
  onClickRemeras() {
    const remeras = this.props.products.filter(producto => {
      return producto.category === "Remeras";
    });

    this.setState({ products: remeras });
  }
  //evento onclick en categoria billeteras
  onClickBilleteras() {
    const billeteras = this.props.products.filter(producto => {
      return producto.category === "Billeteras";
    });

    this.setState({ products: billeteras });
  }

  render() {
    const { products = [] } = this.state;
    return React.createElement(
      Card,
      { title: "Categorias" },
      React.createElement(Carrousel, { fotos: products }),
      React.createElement(
        React.Fragment,
        null,
        React.createElement(
          "div",
          { className: "card-body" },
          React.createElement(
            "div",
            { className: "row" },
            React.createElement(
              "div",
              { className: "col-lg-6 mb-12" },
              React.createElement(
                "div",
                {
                  onClick: () => {
                    this.onClickRemeras();
                  },
                  className: "card bg-info text-white shadow"
                },
                React.createElement(
                  "div",
                  { className: "card-body" },
                  "Remeras"
                )
              )
            ),
            React.createElement(
              "div",
              { className: "col-lg-6 mb-12" },
              React.createElement(
                "div",
                {
                  onClick: () => this.onClickBilleteras(),
                  className: "card bg-info text-white shadow"
                },
                React.createElement(
                  "div",
                  { className: "card-body" },
                  "Billeteras"
                )
              )
            )
          )
        )
      )
    );
  }
}

function Etiqueta({ title, amount, icon, color }) {
  return React.createElement(
    "div",
    { className: "row" },
    React.createElement(
      "div",
      { className: "col-md-12 mb-12" },
      React.createElement(
        "div",
        { className: "etiqueta card border-left-primary shadow h-100 py-2 " + color },
        React.createElement(
          "div",
          { className: "card-body" },
          React.createElement(
            "div",
            { className: "row no-gutters align-items-center" },
            React.createElement(
              "div",
              { className: "col mr-2" },
              React.createElement(
                "div",
                { className: "text-xs font-weight-bold text-uppercase mb-1" },
                title
              ),
              React.createElement(
                "div",
                { className: "h5 mb-0 font-weight-bold text-gray-800" },
                amount
              ),
              React.createElement(
                "div",
                { className: "col-auto" },
                React.createElement("i", { className: icon })
              )
            )
          )
        )
      )
    )
  );
}

function Footer() {
	return React.createElement(
		"footer",
		{ className: "sticky-footer bg-white" },
		React.createElement(
			"div",
			{ className: "container my-auto" },
			React.createElement(
				"div",
				{ className: "copyright text-center my-auto" },
				React.createElement(
					"span",
					null,
					"Copyright \xA9 Dashboard MVW 2020"
				)
			)
		)
	);
}
function Header(props) {
  return React.createElement(
    "nav",
    { className: "navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow" },
    React.createElement(
      "a",
      { href: "/" },
      React.createElement("img", {
        className: "img-profile rounded-circle",
        src: "/images/logo.png",
        width: "60",
        alt: "#"
      })
    ),
    React.createElement(
      "ul",
      { className: "navbar-nav ml-auto" },
      React.createElement("div", { className: "topbar-divider d-none d-sm-block" }),
      React.createElement(
        "li",
        { className: "nav-item dropdown no-arrow" },
        React.createElement(
          "a",
          { className: "nav-link dropdown-toggle", href: "/", id: "userDropdown" },
          React.createElement(
            "span",
            { className: "mr-2 d-none d-lg-inline text-gray-600 small" },
            props.mail
          ),
          React.createElement("img", {
            className: "img-profile rounded-circle",
            src: props.foto,
            width: "60",
            alt: "#"
          })
        )
      )
    )
  );
}
function TotalProducts(props) {
  const { products } = props;
  const total = products.length;
  const totalBilleteras = products.filter(producto => producto.category === 'Billeteras').length;
  const totalRemeras = products.filter(producto => producto.category === 'Remeras').length;
  const porcentajeRemeras = Math.floor(totalRemeras * 100 / total);
  const porcentajeBilleteras = Math.floor(totalBilleteras * 100 / total);
  return React.createElement(
    Card,
    { title: 'Productos por categoria' },
    React.createElement(
      'div',
      { className: 'card-body' },
      React.createElement(
        'h4',
        { className: 'small font-weight-bold' },
        'Remeras ',
        React.createElement(
          'span',
          { className: 'float-right' },
          ' ',
          totalRemeras
        )
      ),
      React.createElement(
        'div',
        { className: 'progress mb-4' },
        React.createElement('div', {
          className: 'progress-bar bg-danger',
          role: 'progressbar',
          style: { width: `${porcentajeRemeras}%` },
          'aria-valuenow': '20',
          'aria-valuemin': '0',
          'aria-valuemax': '100'
        })
      ),
      React.createElement(
        'h4',
        { className: 'small font-weight-bold' },
        'Billeteras ',
        React.createElement(
          'span',
          { className: 'float-right' },
          totalBilleteras
        )
      ),
      React.createElement(
        'div',
        { className: 'progress mb-4' },
        React.createElement('div', {
          className: 'progress-bar bg-warning',
          role: 'progressbar',
          style: { width: `${porcentajeBilleteras}%` },
          'aria-valuenow': '40',
          'aria-valuemin': '0',
          'aria-valuemax': '100'
        })
      ),
      React.createElement(
        'h4',
        { className: 'small font-weight-bold' },
        'Total de productos ',
        React.createElement(
          'span',
          { className: 'float-right' },
          total
        )
      ),
      React.createElement(
        'div',
        { className: 'progress' },
        React.createElement('div', {
          className: 'progress-bar bg-success',
          role: 'progressbar',
          style: { width: "100%" },
          'aria-valuenow': '100',
          'aria-valuemin': '0',
          'aria-valuemax': '100'
        })
      )
    )
  );
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      avatar: "",
      respuestaDeLaApi: {
        arrayListaProductos: []
      },
      users: []
    };
  }
  //cuando se termina de cargar la aplicacion en el navegador, se llama a este metodo
  componentDidMount() {
    fetch("/api/products").then(response => {
      return response.json();
    }).then(respuestaDeLaApi => {
      fetch("/api/users").then(response => {
        return response.json();
      }).then(respuestaDeLaApiUsuarios => {
        this.setState({
          users: respuestaDeLaApiUsuarios.users,
          respuestaDeLaApi,
          email: getCookie("usuarioLogeado"),
          avatar: getCookie("avatar")
        });
      });
    });
  }

  render() {
    const { avatar, email, respuestaDeLaApi, users } = this.state;
    return React.createElement(
      "div",
      { className: "App" },
      React.createElement(
        "div",
        { id: "wrapper" },
        React.createElement(
          "div",
          { id: "content-wrapper", className: "d-flex flex-column" },
          React.createElement(
            "div",
            { id: "content" },
            React.createElement(Header, { mail: email, foto: avatar }),
            React.createElement(
              "div",
              { className: "container-fluid" },
              React.createElement(
                "div",
                { className: "d-sm-flex align-items-center justify-content-between mb-4" },
                React.createElement(
                  "h1",
                  { className: "h3 mb-0 text-gray-800" },
                  "Dashboard"
                )
              ),
              React.createElement(
                "div",
                { className: "row" },
                React.createElement(
                  "div",
                  { className: "col-md-6 mb-12" },
                  React.createElement(AmountProducts, {
                    amount: respuestaDeLaApi.arrayListaProductos.length
                  })
                ),
                React.createElement(
                  "div",
                  { className: "col-md-6 mb-12" },
                  React.createElement(AmountUsers, { amount: users.length })
                )
              ),
              React.createElement(
                "div",
                { className: "row" },
                React.createElement(
                  "div",
                  { className: "col-lg-6 mb-4" },
                  React.createElement(TotalProducts, { products: respuestaDeLaApi.arrayListaProductos })
                ),
                React.createElement(
                  "div",
                  { className: "col-lg-6 mb-4" },
                  React.createElement(Category, { products: respuestaDeLaApi.arrayListaProductos })
                )
              )
            )
          ),
          React.createElement(Footer, null)
        )
      )
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

ReactDOM.render(React.createElement(App, null), document.querySelector("#react-dashboard"));
