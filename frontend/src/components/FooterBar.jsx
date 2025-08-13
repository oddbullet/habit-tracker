import { Link, Separator, Text } from "@radix-ui/themes";

export default function FooterBar() {
  return (
    <div className="footer">
      <Separator size="4" />
      <div className="footer-content">
        <Text size="2" color="gray">
          V1.0.0
        </Text>
        <Link href="https://github.com/oddbullet/habit-tracker" target="_blank">
          GitHub Repository
        </Link>
      </div>
    </div>
  );
}
