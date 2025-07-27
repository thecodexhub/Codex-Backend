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

    return res.status(200).json(existing);
  } catch (err) {
    return res.status(500).json({ error: "Error adding company" });
  }
};

/**
 * @desc Bulk upload companies (deduplicated)
 */
const bulkAddCompanies = async (req, res) => {
  const { companies } = req.body;

  if (!Array.isArray(companies) || companies.length === 0) {
    return res.status(400).json({ error: "Provide a non-empty array of companies" });
  }

  const inserted = [];
  const skipped = [];

  for (const company of companies) {
    const { name, company_logo } = company;

    if (!name || typeof name !== "string") {
      skipped.push(company);
      continue;
    }

    const exists = await Company.findOne({ name: { $regex: `^${name}$`, $options: "i" } });

    if (!exists) {
      try {
        const newCompany = new Company({
          name: name.trim(),
          company_logo: company_logo?.trim() || "",
        });
        await newCompany.save();
        inserted.push({ name: newCompany.name, company_logo: newCompany.company_logo });
      } catch (err) {
        skipped.push(company);
      }
    } else {
      skipped.push(company);
    }
  }

  return res.status(201).json({
    inserted,
    skipped,
    message: `${inserted.length} added, ${skipped.length} skipped (already exists or failed)`,
  });
};


/**
 * @desc Get paginated list of companies with optional search
 */
const getAllCompanies = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 9;
  const skip = (page - 1) * limit;
  const search = req.query.search?.trim();

  const query = search
    ? { name: { $regex: search, $options: "i" } } // partial case-insensitive match
    : {};

  try {
    const companies = await Company.find(query, "_id name company_logo")
      .skip(skip)
      .limit(limit);

    const total = await Company.countDocuments(query);

    res.status(200).json({
      data: companies,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalCompanies: total,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch companies" });
  }
};

module.exports = {
  searchCompanies,
  addCompany,
  bulkAddCompanies,
  getAllCompanies,
};