const router = require("express").Router();

const Product = require("../../../private/schemas/Product");
const { editInventory } = require("../../../private/services/inventoryRecords.service");
const { verify } = require("../../../verifyToken");

router.post("/edit-inventory", verify, async (req, res, next) => {
  try {
    return res.status(201).json(await editInventory({ req }));
  } catch (error) {
    next(error);
  }
});

// router.delete("/delete-product", upload, verify, async (req, res, next) => {
//   try {
//     return res.status(201).json(await deleteProduct({ req }));
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;
