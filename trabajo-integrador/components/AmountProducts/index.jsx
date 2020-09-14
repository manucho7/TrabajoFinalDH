function AmountProducts(props) {
  return (
    <Etiqueta
      title="Total de Productos"
      amount={props.amount}
      icon="fas fa-clipboard-list fa-2x text-gray-300"
      color="border-left-primary"
    />
  );
}