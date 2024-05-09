import React from "react";

export default function AuthLayout({ children }) {
  return (
    <div className="auth_wrap custom_center custom_screen">
      <div className="auth_main">{children}</div>
    </div>
  );
}
