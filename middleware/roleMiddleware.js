function requireRole(
  ...allowedRoles
) {
  return (
    req,
    res,
    next
  ) => {
    if (!req.session.user) {
      return res.redirect(
        "/login"
      );
    }

    const userRole =
      req.session.user.role;

    if (
      !allowedRoles.includes(
        userRole
      )
    ) {
      return res
        .status(403)
        .send(
          "Forbidden: You do not have permission."
        );
    }

    next();
  };
}

module.exports = {
  requireRole,
};