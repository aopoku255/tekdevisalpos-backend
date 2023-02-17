const Invoice = require("../schemas/Invoice");

async function fetchDaySales({ req }) {
  const { shop_id } = req.body;
  try {
    const results = await Invoice.find({ shop_id });
    const sales = {};
    results.forEach(({ grand_total, createdAt, invoice_number }) => {
      const dayofweek = new Date(createdAt).toLocaleDateString("en-US", {
        weekday: "short",
      });
      const revenue = grand_total;
      if (!sales[createdAt]) {
        sales[dayofweek] = sales[dayofweek]
          ? sales[dayofweek] + revenue
          : revenue;
      } else {
        sales[dayofweek] = sales[dayofweek]
          ? sales[dayofweek] + revenue
          : revenue;
      }
    });
    // const salevalue = Object.values(sales)
    return { message: "success", data: sales };
  } catch (error) {
    return { data: error };
  }
}

// SALES FOR MONTH
async function fetchMonthSales({ req }) {
  const { shop_id } = req.body;
  try {
    const results = await Invoice.find({ shop_id });
    const sales = {};
    results.forEach(({ grand_total, createdAt, invoice_number }) => {
      const dayofweek = new Date(createdAt).toLocaleDateString("en-US", {
        weekday: "short",
      });
      const revenue = grand_total;
      if (!sales[createdAt]) {
        sales[dayofweek] = sales[dayofweek]
          ? sales[dayofweek] + revenue
          : revenue;
      } else {
        sales[dayofweek] = sales[dayofweek]
          ? sales[dayofweek] + revenue
          : revenue;
      }
    });

    return { message: "success", data: sales };
  } catch (error) {
    return { data: error };
  }
}

module.exports = { fetchDaySales, fetchMonthSales };
