import "./App.css";
import { useState } from "react";
import { validateEmail } from "../src/utils";

const ErrorMessage = ({ errorMessage }) => {
  return <p className="FieldError">{errorMessage}</p>;
};

function App() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: {
      value: "",
      isTouched: false,
    },
    role: "role",
  });

  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  });

  const validateForm = () => {
    let isValid = true;
    const errors = { ...formErrors };

    if (!user.firstName) {
      errors.firstName = "First name is required";
      isValid = false;
    } else {
      errors.firstName = "";
    }

    if (!validateEmail(user.email)) {
      errors.email = "Email address is invalid";
      isValid = false;
    } else {
      errors.email = "";
    }

    if (user.password.value.length < 8) {
      errors.password = "Password should have at least 8 characters";
      isValid = false;
    } else {
      errors.password = "";
    }

    if (user.role === "role") {
      errors.role = "Role is required";
      isValid = false;
    } else {
      errors.role = "";
    }

    setFormErrors(errors);
    return isValid;
  };

  const clearForm = () => {
    setUser({
      firstName: "",
      lastName: "",
      email: "",
      password: {
        value: "",
        isTouched: false,
      },
      role: "role",
    });
    setFormErrors({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(user);
      alert("Account created!");
      clearForm();
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <h2>Sign Up</h2>
          <div className="Field">
            <label>
              First name <sup>*</sup>
            </label>
            <input
              value={user.firstName}
              onChange={(e) => {
                setUser({ ...user, firstName: e.target.value });
              }}
              onBlur={(e) => {
                // validateForm();
                if (e.target.value.length != 0) {
                  setFormErrors({...formErrors, firstName: ""});
                }
              }}
              placeholder="First name"
            />
            {formErrors.firstName && (
              <ErrorMessage errorMessage={formErrors.firstName} />
            )}
          </div>
          <div className="Field">
            <label>Last name</label>
            <input
              value={user.lastName}
              onChange={(e) => {
                setUser({ ...user, lastName: e.target.value });
              }}
              placeholder="Last name"
            />
          </div>
          <div className="Field">
            <label>
              Email address <sup>*</sup>
            </label>
            <input
              value={user.email}
              onChange={(e) => {
                setUser({ ...user, email: e.target.value });
              }}
              placeholder="Email address"
            />
            {user.email.length != 0 && !validateEmail(user.email) && (
              <ErrorMessage errorMessage="Please enter a valid email address" />
            )}
          </div>
          <div className="Field">
            <label>
              Password <sup>*</sup>
            </label>
            <input
              value={user.password.value}
              type="password"
              onChange={(e) => {
                setUser({
                  ...user,
                  password: { ...user.password, value: e.target.value },
                });
              }}
              onBlur={() => {
                setUser({
                  ...user,
                  password: { ...user.password, isTouched: true },
                });
              }}
              placeholder="Password"
            />
            {user.password.isTouched && user.password.value.length < 8 ? (
              <ErrorMessage errorMessage="Password should have at least 8 characters" />
            ) : null}
          </div>
          <div className="Field">
            <label>
              Role <sup>*</sup>
            </label>
            <select
              value={user.role}
              onChange={(e) => setUser({ ...user, role: e.target.value })}
            >
              <option value="role">Role</option>
              <option value="individual">Individual</option>
              <option value="business">Business</option>
            </select>
          </div>
          <button type="submit">Create account</button>
        </fieldset>
      </form>
    </div>
  );
}

export default App;
