
function Carrousel(props) {
  return (
    <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
  <div class="carousel-inner">
        {props.fotos.map((prod, i) => (
          <div key={prod.title} className={`carousel-item ${ i === 0 ? 'active' : ''}` } >
              <img
                src={`${prod.image}`}
                className="d-block w-100"
                alt="#"
              ></img>
          </div>
        ))}
      </div>
      <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
    </div>
  );
}

