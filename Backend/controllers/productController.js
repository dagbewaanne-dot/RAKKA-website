export const getProducts = (req, res) => {
  res.json({
    success: true,
    message: "These are all the products."
  });
};