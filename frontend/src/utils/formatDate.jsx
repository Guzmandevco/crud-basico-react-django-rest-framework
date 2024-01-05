const formatDate = (date) => {
  const tempDate = new Date(date);
  return tempDate.toISOString().slice(0, 10);
};

export default formatDate;
