/**
 * @desc Verify Firebase token and return user info
 */
const verifyUser = async (req, res) => {
  const { uid, email } = req.user;

  return res.json({
    success: true,
    user: {
      uid,
      email,
    },
  });
};

module.exports = { verifyUser };