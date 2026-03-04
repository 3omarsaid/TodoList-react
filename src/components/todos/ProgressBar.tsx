import { useEffect } from "react";
import { Box, Typography, LinearProgress } from "@mui/material";
import { useProgressStore } from "../../stores/progressStore";
import { useAuth } from "../../contexts/AuthContext";
import { styled } from "@mui/material/styles";

const GlassProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.2)",
  "& .MuiLinearProgress-bar": {
    borderRadius: 5,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
  },
}));

export default function ProgressBar() {
  const { dailyProgress, fetchDailyProgress } = useProgressStore();
  const auth = useAuth();

  useEffect(() => {
    if (auth?.user) {
      fetchDailyProgress(auth.user.uid);
    }
  }, [auth?.user, fetchDailyProgress]);

  const percentage = dailyProgress?.percentage || 0;

  return (
    <Box
      sx={{
        width: "100%",
        mb: 3,
        p: 1,
        bgcolor: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(10px)",
        borderRadius: "12px",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        <Typography
          variant="body2"
          sx={{ color: "rgba(255, 255, 255, 0.9)", fontWeight: 500 }}
        >
          Daily Progress
        </Typography>
        <Typography variant="body2" sx={{ color: "white", fontWeight: "bold" }}>
          {percentage}%
        </Typography>
      </Box>
      <GlassProgress variant="determinate" value={percentage} />
      <Typography
        variant="caption"
        sx={{
          color: "rgba(255, 255, 255, 0.5)",
          display: "block",
          mt: 1,
          textAlign: "right",
        }}
      >
        {dailyProgress?.completedTasks || 0} / {dailyProgress?.totalTasks || 0}{" "}
        tasks completed today
      </Typography>
    </Box>
  );
}
