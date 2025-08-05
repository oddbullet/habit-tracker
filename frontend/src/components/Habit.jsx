import { Box, Button, Card, IconButton, Text } from "@radix-ui/themes";
import { CheckIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router";

export default function Habit({ title, habitId }) {
  const navigate = useNavigate();

  return (
    <Box>
      <Card
        style={{ cursor: "pointer" }}
        onDoubleClick={() => navigate(`/stat/${habitId}`)}
      >
        <div className="habit">
          <div className="habit-title">
            <Text as="p" weight="medium" size="4">
              {title}
            </Text>

            {/* <div className="habit-week-group">
              <div className="week-square">S</div>
              <div className="week-square">M</div>
              <div className="week-square">T</div>
              <div className="week-square">W</div>
              <div className="week-square">T</div>
              <div className="week-square">F</div>
              <div className="week-square">S</div>
            </div> */}
          </div>
          <div className="habit-btn-group">
            <IconButton variant="outline" radius="full" highContrast>
              <CheckIcon width={"20px"} height={"20px"} />
            </IconButton>
          </div>
        </div>
      </Card>
    </Box>
  );
}
