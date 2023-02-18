const { fetchReports } = require("../../../private/services/report.service");

const router = require("express").Router()
router.post("", verify, async (req, res, next) => {
    try {
        return res.status(201).json(await fetchReports({ req, res }));
      } catch (error) {
        next(error);
      }
})

module.exports = router
