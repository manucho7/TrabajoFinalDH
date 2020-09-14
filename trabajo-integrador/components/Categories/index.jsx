class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }
  //evento onclick en categoria remeras
  onClickRemeras() {
    const remeras = this.props.products.filter((producto) => {
          return producto.category === "Remeras";
        });
     
        this.setState({ products: remeras });
  }
  //evento onclick en categoria billeteras
  onClickBilleteras() {
      const billeteras = this.props.products.filter((producto) => {
        return producto.category === "Billeteras";
      });
   
      this.setState({ products: billeteras });
  }

  render() {
    const { products = [] } = this.state;
    return (
      <Card title="Categorias">
        <Carrousel fotos={products} />
        <React.Fragment>
          <div className="card-body">
            <div className="row">
              <div className="col-lg-6 mb-12">
                <div
                  onClick={() => {
                    this.onClickRemeras();
                  }}
                  className="card bg-info text-white shadow"
                >
                  <div className="card-body">Remeras</div>
                </div>
              </div>
              <div className="col-lg-6 mb-12">
                <div
                  onClick={() => this.onClickBilleteras()}
                  className="card bg-info text-white shadow"
                >
                  <div className="card-body">Billeteras</div>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      </Card>
    );
  }
}
