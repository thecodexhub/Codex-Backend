const Company = require("../models/company.model");

/**
 * @desc Search companies by query prefix
 */
const searchCompanies = async (req, res) => {
  const { query } = req.query;
  if (!query) return res.status(400).json([]);

  const regex = new RegExp(`^${query}`, "i");

  try {
    const companies = await Company.find({ name: { $regex: regex } }).limit(10);
    res.json(companies);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

/**
 * @desc Add a new company (if not already exists)
 */
const addCompany = async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Company name is required" });

  try {
    let existing = await Company.findOne({ name: { $regex: `^${name}$`, $options: "i" } });

    if (!existing) {
      const newCompany = await Company.create({ name });
      return res.status(201).json(newCompany);
    }

    return res.status(200).json(existing); // return existing if found
  } catch (err) {
    return res.status(500).json({ error: "Error adding company" });
  }
};

/**
 * @desc Bulk upload companies (deduplicated)
 */
const bulkAddCompanies = async (req, res) => {
  const { names } = req.body;

  if (!Array.isArray(names) || names.length === 0) {
    return res.status(400).json({ error: "Provide a non-empty array of company names" });
  }

  const inserted = [];
  const skipped = [];

  for (const name of names) {
    if (!name || typeof name !== 'string') continue;

    const exists = await Company.findOne({ name: { $regex: `^${name}$`, $options: "i" } });

    if (!exists) {
      try {
        const newCompany = new Company({ name: name.trim() });
        await newCompany.save();
        inserted.push(newCompany.name);
      } catch (err) {
        skipped.push(name); // If insertion fails (e.g., unique index race)
      }
    } else {
      skipped.push(name);
    }
  }

  return res.status(201).json({
    inserted,
    skipped,
    message: `${inserted.length} added, ${skipped.length} skipped (already exists or failed)`,
  });
};

module.exports = { searchCompanies, addCompany, bulkAddCompanies };
