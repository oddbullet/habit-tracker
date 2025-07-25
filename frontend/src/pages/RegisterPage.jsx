import { Button, Box, Card, Text, TextField, Spinner } from "@radix-ui/themes";
import { Label } from "radix-ui";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { reset, register } from "../features/auth/authSlice";
import HeaderBar from "../components/HeaderBar";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (isSuccess) {
      navigate("/login");
    }

    dispatch(reset());
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

    dispatch(register(userData));
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
                Create an account
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
                Sign Up
              </Button>
              <Button
                color="gray"
                variant="soft"
                highContrast
                style={{ margin: "0 0 0.5rem 0" }}
                onClick={() => navigate("/login")}
              >
                Already have an account? Sign In
              </Button>
            </form>
          </Card>
        </Box>
      </div>
    </div>
  );
}
