import Product from "../models/Product";

export const createProduct = async (req, res) => {
  try {
    const { name, category, price, imgUrl } = req.body;

    const newProduct = new Product({ name, category, price, imgUrl });

    const productSave = await newProduct.save();

    res.status(201).json(productSave);
  } catch (error) {
    res.status(500).json(error);
  }
  
};

export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.status(200).json(products);
};

export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.productId);
  console.log(req.params.id);
  res.status(200).json(product);
};

export const updateProductById = async (req, res) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.productId,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedProduct);
};

export const deleteProductById = async (req, res) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.productId);
    res.status(200).json(deletedProduct);
};
