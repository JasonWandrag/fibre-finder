const getSummarizedProduct = ({
  productCode,
  productName,
  productRate,
  subcategory,
}) => {
  const provider = subcategory
    .replace("Uncapped", "")
    .replace("Capped", "")
    .trim();
  return { productCode, productName, productRate, provider };
};

const getProductsFromPromo = (pc) => {
  // const promoCode = pc.promoCode;
  return pc.products.reduce(
    (prods, p) => [...prods, getSummarizedProduct(p)],
    []
  );
};

module.exports = { getSummarizedProduct, getProductsFromPromo };
