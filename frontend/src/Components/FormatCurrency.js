const FormatCurrency = (currency) => {
  const nf = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  });
  return nf.format(currency);
};

export default FormatCurrency;
