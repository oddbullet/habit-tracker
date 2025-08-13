import { Box, Button, Card, Text } from "@radix-ui/themes";
import HeaderBar from "../components/HeaderBar";
import { useNavigate } from "react-router";
import "../index.css";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <HeaderBar />
      <div className="landing-main-content">
        <div className="landing-catch">
          <Text as="p" weight="bold" size="8">
            Transform Your Life One Habit at a Time
          </Text>
          <Text as="p" size="5">
            Build lasting habits with Habit Today
          </Text>
          <Button color="gray" highContrast onClick={() => navigate("/login")}>
            Get Started for Free
          </Button>
        </div>
        <div className="landing-img">
          <img src="/landImg.png" alt="Habit Page" className="landing-image" />
        </div>
        <div className="landing-feature">
          <Box maxWidth={"300px"}>
            <Card className="feature-card">
              <div className="feature-icon">🔥</div>
              <Text as="p" weight="bold" size="4">
                Streak Tracking
              </Text>
              <Text>
                Stay motivated by tracking your streaks. See how many
                consecutive days you've stayed consistent.
              </Text>
            </Card>
          </Box>

          <Box maxWidth={"300px"}>
            <Card className="feature-card">
              <div className="feature-icon">📈</div>
              <Text as="p" weight="bold" size="4">
                Progress Visualization
              </Text>
              <Text>
                Monitor your progress with heatmaps and charts that show your
                habit completion trends.
              </Text>
            </Card>
          </Box>

          <Box maxWidth={"300px"}>
            <Card className="feature-card">
              <div className="feature-icon">🎯</div>
              <Text as="p" weight="bold" size="4">
                Reach Your Goals
              </Text>
              <Text as="p" size="3" className="feature-des">
                Achieve your goals with structured habit tracking and progress
                monitoring.
              </Text>
            </Card>
          </Box>
        </div>
        <div className="landing-end">
          <Text as="p" weight="bold" size="5">
            Start Your Habits Today
          </Text>
          <Button color="gray" highContrast onClick={() => navigate("/login")}>
            Get Started for Free
          </Button>
        </div>
      </div>
    </div>
  );
}
