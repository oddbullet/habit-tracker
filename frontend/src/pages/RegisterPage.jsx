import { Button, Box, Card, Text, TextField } from "@radix-ui/themes";
import { Label } from "radix-ui";
import HeaderBar from "../components/HeaderBar";

export default function RegisterPage() {
  return (
    <div className="auth-page">
      <HeaderBar></HeaderBar>
      <div className="main-content">
        <Box>
          <Card className="auth-card">
            <form className="auth-form">
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
              ></TextField.Root>

              <Label.Root className="form-label" htmlFor="passwordField">
                Password
              </Label.Root>
              <TextField.Root
                type="password"
                id="passwordField"
              ></TextField.Root>

              <Button
                color="gray"
                variant="solid"
                highContrast
                style={{ margin: "0.5rem 0 0.5rem 0" }}
              >
                Sign Up
              </Button>
              <Button
                color="gray"
                variant="soft"
                highContrast
                style={{ margin: "0 0 0.5rem 0" }}
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
