import { ExitIcon } from "@radix-ui/react-icons";
import { Text, Separator, Button } from "@radix-ui/themes";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";

export default function HeaderBar() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

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

        <button className="logout-btn" onClick={() => dispatch(logout())}>
          {user && <ExitIcon width={20} height={20} />}
        </button>
      </div>
      <Separator size="4" />
    </>
  );
}
