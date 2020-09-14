
function Etiqueta({title, amount, icon, color }) {
  return (
    <div className="row">
      <div className="col-md-12 mb-12">
      <div className={"etiqueta card border-left-primary shadow h-100 py-2 " + color}>
        <div className="card-body">
          <div className="row no-gutters align-items-center">
            <div className="col mr-2">
              <div className="text-xs font-weight-bold text-uppercase mb-1">
                {title}
              </div>
              <div className="h5 mb-0 font-weight-bold text-gray-800">
                {amount}
              </div>
              <div className="col-auto">
                <i className={icon}></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

