import { Text, Separator } from "@radix-ui/themes";

export default function HeaderBar() {
  return (
    <div className="header">
      <Text
        as="p"
        weight="bold"
        size="6"
        style={{ padding: "0.5rem 0 0.5rem 1rem" }}
      >
        Habits
      </Text>
      <Separator size="4" />
    </div>
  );
}
