const Invoice = require("../schemas/Invoice");

async function fetchDaySales({ req }) {
  const { shop_id } = req.body;
  try {
    const results = await Invoice.find({ shop_id });
    const sales = {};
    let total = 0;
    results.forEach(({ grand_total, createdAt, invoice_number }) => {
      const dayofweek = new Date(createdAt).toLocaleDateString("en-US", {
        weekday: "short",
      });
      const revenue = grand_total;
      if (!sales[createdAt]) {
        total = sales[dayofweek] ? (total += revenue) : revenue;
        sales[dayofweek] = { name: dayofweek, sale: total };
      } else {
        total += revenue;
        sales[dayofweek].sale = total;
      }
    });
    const salevalue = Object.values(sales);
    return { message: "success", data: salevalue };
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
    let total = 0;
    results.forEach(({ grand_total, createdAt }) => {
      const currentMonth = new Date(createdAt).toLocaleDateString("en-US", {
        month: "short",
      });
      const revenue = grand_total;
      if (!sales[createdAt]) {
        total = sales[currentMonth] ? (total += revenue) : revenue;
        sales[currentMonth] = { name: currentMonth, sale: total };
      } else {
        sales[currentMonth].sale = sales[currentMonth] + revenue;
      }
    });

    const salesvalue = Object.values(sales);

    return { message: "success", data: salesvalue };
  } catch (error) {
    return { data: error };
  }
}
// TOTAL SALES FOR MONTH
async function monthSales({ req }) {
  const { shop_id } = req.body;
  try {
    const results = await Invoice.find({ shop_id });
    const sales = {};
    let total = 0;
    results.forEach(({ grand_total, createdAt }) => {
      const currentMonth = new Date(createdAt).toLocaleDateString("en-US", {
        month: "long",
      });
      const revenue = grand_total;
      if (!sales[createdAt]) {
        total = sales[currentMonth] ? (total += revenue) : revenue;
        sales[currentMonth] = { name: currentMonth, sale: total };
      } else {
        sales[currentMonth].sale = sales[currentMonth] + revenue;
      }
    });

    const salesvalue = Object.values(sales);
    const monthSales = salesvalue[salesvalue.length - 1];

    return { message: "success", data: monthSales };
  } catch (error) {
    return { data: error };
  }
}

// Total Sales
async function totalSales({ req }) {
  const { shop_id } = req.body;
  try {
    const results = await Invoice.find({ shop_id });
    let revenue = 0;
    results.forEach(({ grand_total }) => {
      revenue += grand_total;
    });

    return { message: "success", data: revenue };
  } catch (error) {
    return { data: error };
  }
}
// Today Sales
async function salesToday({ req }) {
  const { shop_id } = req.body;
  try {
    const results = await Invoice.find({ shop_id });
    const sales = {};
    const todaySale = {};
    let total = 0;
    results.forEach(({ grand_total, createdAt, invoice_number }) => {
      const dayofweek = new Date(createdAt).toLocaleDateString("en-US", {
        weekday: "long",
      });
      const revenue = grand_total;
      if (!sales[createdAt]) {
        total = sales[dayofweek] ? (total += revenue) : revenue;
        sales[dayofweek] = { name: dayofweek, sale: total };
      } else {
        total += revenue;
        sales[dayofweek].sale = total;
      }
    });

    const salevalue = Object.values(sales);
    const newValue = salevalue[salevalue.length - 1];
    const subValue = salevalue[salevalue.length - 2];
    const value = (subValue.sale - newValue.sale) / newValue.sale * 100
    return { message: "success", data: newValue, value };
  } catch (error) {
    return { data: error };
  }
}

module.exports = {
  fetchDaySales,
  fetchMonthSales,
  totalSales,
  salesToday,
  monthSales,
};
