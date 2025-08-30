import { CheckIcon, ExitIcon, GearIcon } from "@radix-ui/react-icons";
import { Text, Separator, IconButton, DropdownMenu } from "@radix-ui/themes";
import { useDispatch, useSelector } from "react-redux";
import { darkTheme, lightTheme, logout } from "../features/auth/authSlice";

export default function HeaderBar() {
  const dispatch = useDispatch();

  const { theme } = useSelector((state) => state.auth);

  return (
    <>
      <div className="header">
        <Text
          as="p"
          weight="bold"
          size="6"
          style={{ padding: "0.5rem 0 0.5rem 1rem" }}
        >
          Habit Today
        </Text>

        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <IconButton variant="ghost" color="gray">
              <GearIcon width="18" height="18" />
            </IconButton>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Sub>
              <DropdownMenu.SubTrigger>Theme</DropdownMenu.SubTrigger>
              <DropdownMenu.SubContent>
                <DropdownMenu.Item onClick={() => dispatch(lightTheme())}>
                  Light {theme === "light" ? <CheckIcon /> : ""}
                </DropdownMenu.Item>
                <DropdownMenu.Item onClick={() => dispatch(darkTheme())}>
                  Dark {theme === "dark" ? <CheckIcon /> : ""}
                </DropdownMenu.Item>
              </DropdownMenu.SubContent>
            </DropdownMenu.Sub>
            <DropdownMenu.Item onClick={() => dispatch(logout())}>
              Sign Out <ExitIcon />
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
      <Separator size="4" />
    </>
  );
}
