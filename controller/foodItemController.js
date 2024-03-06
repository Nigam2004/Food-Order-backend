const foodItem = require("../model/food-item");
const cloudinaryUploder = require("../services/cloudinaryUploder");

exports.addItem = async (req, res, next) => {
  const { food_name, review, price, food_type, description } = req.body;
  const imgurl = await cloudinaryUploder(req.file.path);
  const fooditem = new foodItem({
    food_name,
    review,
    price,
    food_type,
    description,
    imageUrl: imgurl.secure_url,
  });
  let result;
  try {
    result = await fooditem.save();
    // console.log(result);
  } catch (err) {
    console.log("error occured in controller" + err);
  }
  res.send({ success: true, message: "Item uploaded", result });
};

exports.findAllItem = async (req, res, next) => {
  try {
    const result = await foodItem.find({});

    res.send({ message: "success", result });
  } catch (error) {
    return next(error);
  }
};

exports.findItem = async (req, res, next) => {
  try {
    const result = await foodItem.find({
      $or: [
        { food_name: { $regex: req.params.item } },
        { price: { $regex: req.params.item } },
        { food_type: { $regex: req.params.item } },
      ],
    });

    res.send({ message: "success", result });
  } catch (error) {
    return next(error);
  }
};
