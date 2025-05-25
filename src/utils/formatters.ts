const priceFormatter = Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 0,
});

export const formatPrice = (price: number | null | undefined): string => {
  if (price === null || price === undefined) return "0€";
  return priceFormatter.format(price);
};
