function TotalProducts(props) {
  const {products} = props;
  const total = products.length;
  const totalBilleteras = products.filter(producto => producto.category === 'Billeteras').length;
  const totalRemeras = products.filter(producto => producto.category === 'Remeras').length;
  const porcentajeRemeras = Math.floor((totalRemeras * 100) / total);
  const porcentajeBilleteras = Math.floor((totalBilleteras * 100) / total);
  return (
    <Card title="Productos por categoria">
      <div className="card-body">
        <h4 className="small font-weight-bold">
  Remeras <span className="float-right"> {totalRemeras}</span>
        </h4>
        <div className="progress mb-4">
          <div
            className="progress-bar bg-danger"
            role="progressbar"
            style={{ width: `${porcentajeRemeras}%` }}
            aria-valuenow="20"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
        <h4 className="small font-weight-bold">
  Billeteras <span className="float-right">{totalBilleteras}</span>
        </h4>
        <div className="progress mb-4">
          <div
            className="progress-bar bg-warning"
            role="progressbar"
            style={{ width: `${porcentajeBilleteras}%` }}
            aria-valuenow="40"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
        <h4 className="small font-weight-bold">
          Total de productos <span className="float-right">{total}</span>
        </h4>
        <div className="progress">
          <div
            className="progress-bar bg-success"
            role="progressbar"
            style={{ width: "100%" }}
            aria-valuenow="100"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
      </div>
    </Card>
  );
}
