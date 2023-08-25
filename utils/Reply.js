// ? ************************** Failed method *************************** */
exports.failed = (res, message) => {
  return res.status(200).json({ status: false, message: message });
};

// ? ************************** Success method *************************** */
exports.success = (
  res,
  message,
  data = null,
  pagination = false,
  title = "",
  extra = []
) => {
  let success = { status: true, message: message };

  if (data !== null) {
    success = { ...success, data: data };
  }

  if (pagination) {
    success = { ...success, pagination: 20 };
  }

  if (title !== "") {
    success = { ...success, title: title };
  }

  if (extra.length > 0) {
    for (const key in extra) {
      success = { ...success, ...extra[key] };
    }
  }

  return res.status(200).json(success);
};
