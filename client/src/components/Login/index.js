import React from "react";

function LoginForm() {
  return (
    <form>
      <div className="form-inner">
        <h2>Login</h2>
        {/* ERROR! */}
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" id="name" />
        </div>

        <div className="form-group">
          <label htmlFor="name">Email:</label>
          <input type="email" name="email" id="email" />
        </div>
        <div className="form-group">
          <label htmlFor="password">password:</label>
          <input type="password" name="password" id="password" />
        </div>
      </div>
      <input type="submit" value="LOGIN" />
    </form>
  );
}

export default LoginForm;
