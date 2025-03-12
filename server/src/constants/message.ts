export const Messages = {
  // General success messages
  SUCCESS: "Thành công.",
  CREATED: "Tạo thành công.",
  UPDATED: "Cập nhật thành công.",
  DELETED: "Xóa thành công.",
  FETCHED: "Dữ liệu được tải thành công.",

  // Authentication messages
  UNAUTHORIZED: "Bạn không có quyền truy cập.",
  FORBIDDEN: "Truy cập bị từ chối.",
  AUTHENTICATION_REQUIRED: "Vui lòng đăng nhập để tiếp tục.",
  LOGIN_SUCCESS: "Đăng nhập thành công.",
  LOGIN_FAILED: "Thông tin đăng nhập không chính xác.",
  LOGOUT_SUCCESS: "Đăng xuất thành công.",
  REGISTRATION_SUCCESS: "Đăng ký thành công.",
  REGISTRATION_FAILED: "Đăng ký thất bại.",
  INVALID_TOKEN: "Token không hợp lệ.",
  TOKEN_EXPIRED: "Token đã hết hạn.",
  TOKEN_REQUIRED: "Token không được tìm thấy.",
  REFRESH_TOKEN_REQUIRED: "Vui lòng cung cấp refresh token.",
  REFRESH_TOKEN_EXPIRED: "Refresh token đã hết hạn.",
  REFRESH_TOKEN_INVALID: "Refresh token không hợp lệ.",
  TOKEN_REVOKED: "Token đã bị thu hồi.",
  TOKEN_REFRESHED: "Token đã được làm mới.",
  PASSWORD_CHANGED: "Mật khẩu đã được thay đổi.",
  PASSWORD_RESET: "Mật khẩu đã được đặt lại.",
  PASSWORD_RESET_REQUESTED: "Yêu cầu đặt lại mật khẩu đã được gửi.",
  EMAIL_NOT_FOUND: "Không tìm thấy địa chỉ email.",
  EMAIL_EXISTS: "Địa chỉ email đã tồn tại.",
  EMAIL_NOT_VERIFIED: "Vui lòng xác minh địa chỉ email của bạn.",
  EMAIL_VERIFIED: "Địa chỉ email đã được xác minh.",
  EMAIL_VERIFICATION_SENT: "Email xác minh đã được gửi.",
  EMAIL_VERIFICATION_FAILED: "Email xác minh không thành công.",
  ACCOUNT_LOCKED: "Tài khoản của bạn đã bị khóa.",
  ACCOUNT_UNLOCKED: "Tài khoản của bạn đã được mở khóa.",
  ACCOUNT_INACTIVE: "Tài khoản của bạn không hoạt động.",
  ACCOUNT_LOCKED_ERROR: "Không thể khóa tài khoản.",
  ACCOUNT_UNLOCKED_ERROR: "Không thể mở khóa tài khoản.",
  ACCOUNT_SUSPENDED: "Tài khoản của bạn đã bị đình chỉ.",
  ACCOUNT_SUSPENDED_ERROR: "Không thể đình chỉ tài khoản.",
  ACCOUNT_RESTORED: "Tài khoản của bạn đã được khôi phục.",
  ACCOUNT_RESTORED_ERROR: "Không thể khôi phục tài khoản.",
  ACCOUNT_DELETED: "Tài khoản của bạn đã bị xóa.",
  ACCOUNT_DELETED_ERROR: "Không thể xóa tài khoản.",
  ACCOUNT_NOT_FOUND: "Không tìm thấy tài khoản.",
  ACCOUNT_CREATED: "Tài khoản đã được tạo.",
  ACCOUNT_UPDATED: "Tài khoản đã được cập nhật.",
  INVALID_CREDENTIALS: "Thông tin đăng nhập không chính xác.",
  // Validation messages
  INVALID_INPUT: "Dữ liệu nhập không hợp lệ.",
  REQUIRED_FIELDS_MISSING: "Vui lòng điền đầy đủ các trường bắt buộc.",
  EMAIL_INVALID: "Địa chỉ email không hợp lệ.",
  PASSWORD_TOO_SHORT: "Mật khẩu phải có ít nhất 6 ký tự.",
  PASSWORD_NOT_MATCH: "Mật khẩu không khớp.",

  // Resource-related messages
  NOT_FOUND: "Không tìm thấy tài nguyên.",
  ALREADY_EXISTS: "Tài nguyên đã tồn tại.",
  ACCESS_DENIED: "Bạn không được phép thực hiện hành động này.",
  RESOURCE_LOCKED: "Tài nguyên đang bị khóa.",

  // Server error messages
  SERVER_ERROR: "Lỗi máy chủ.",
  DATABASE_ERROR: "Lỗi cơ sở dữ liệu.",
  TIMEOUT: "Yêu cầu hết thời gian xử lý.",
  SERVICE_UNAVAILABLE: "Dịch vụ hiện không khả dụng.",
  MAINTENANCE_MODE: "Hệ thống đang bảo trì. Vui lòng thử lại sau.",

  // Operation-specific messages
  OPERATION_SUCCESS: "Thao tác thành công.",
  OPERATION_FAILED: "Thao tác thất bại.",
  PERMISSION_DENIED: "Bạn không có quyền thực hiện hành động này.",
  DATA_SAVED: "Dữ liệu đã được lưu.",
  DATA_DELETED: "Dữ liệu đã được xóa.",

  // Custom user feedback
  WELCOME: "Chào mừng bạn đến với hệ thống.",
  GOODBYE: "Hẹn gặp lại bạn."
};

export type MessagesType = (typeof Messages)[keyof typeof Messages];
