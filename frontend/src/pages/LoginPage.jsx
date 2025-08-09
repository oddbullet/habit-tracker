import { Button, Box, Card, Text, TextField, Spinner } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { Label } from "radix-ui";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { reset, login } from "../features/auth/authSlice";
import HeaderBar from "../components/HeaderBar";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (isSuccess) {
      navigate("/habit");
    }

    return () => {
      dispatch(reset());
    };
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  function handleChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  function onSubmit(e) {
    e.preventDefault();

    const userData = {
      email: formData.email,
      password: formData.password,
    };

    dispatch(login(userData));
  }

  if (isLoading) {
    return (
      <div className="auth-page">
        <div className="main-content">
          <Spinner size="3" />
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <HeaderBar></HeaderBar>

      <div className="main-content">
        <Box>
          <Card className="auth-card">
            <form className="auth-form" onSubmit={onSubmit}>
              <Text
                as="p"
                weight="bold"
                size="4"
                style={{ textAlign: "center" }}
              >
                Welcome back
              </Text>

              <Label.Root className="form-label" htmlFor="emailField">
                Email
              </Label.Root>
              <TextField.Root
                placeholder="example@example.com"
                id="emailField"
                name="email"
                onChange={handleChange}
              ></TextField.Root>

              <Label.Root className="form-label" htmlFor="passwordField">
                Password
              </Label.Root>
              <TextField.Root
                type="password"
                id="passwordField"
                name="password"
                onChange={handleChange}
              ></TextField.Root>

              <Button
                color="gray"
                variant="solid"
                highContrast
                style={{ margin: "0.5rem 0 0.5rem 0" }}
                type="submit"
              >
                Sign In
              </Button>
              <Button
                color="gray"
                variant="soft"
                highContrast
                style={{ margin: "0 0 0.5rem 0" }}
                onClick={() => navigate("/register")}
              >
                Don't have an account? Sign Up
              </Button>
            </form>
          </Card>
        </Box>
      </div>
    </div>
  );
}
