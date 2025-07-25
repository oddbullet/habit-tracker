import { Box, Button, Card } from "@radix-ui/themes";

export default function Habit({ title, week }) {
  return (
    <Box maxWidth={"400px"}>
      <Card>
        <div className="habit">
          <div className="habit-title">
            {title}
            <div className="habit-week-group">{week}</div>
          </div>
          <div className="habit-btn-group">
            <Button>Fail</Button>
            <Button>Skip</Button>
            <Button>Done</Button>
          </div>
        </div>
      </Card>
    </Box>
  );
}
