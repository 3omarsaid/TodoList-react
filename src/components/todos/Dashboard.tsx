import { useEffect, useState } from "react";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebaseConfig";
import { useAuth } from "../../contexts/AuthContext";
import { DailyProgress } from "../../controler/progressControler";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function Dashboard() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [history, setHistory] = useState<DailyProgress[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!auth?.user) return;

      const q = query(
        collection(db, `users/${auth.user.uid}/progress`),
        orderBy("date", "asc"),
        limit(30),
      );

      try {
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(
          (doc) => doc.data() as DailyProgress,
        );
        setHistory(data);
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };

    fetchHistory();
  }, [auth?.user]);

  return (
    <div className="min-h-screen bg-linear-to-br from-[#5B117D] via-[#190C4E] to-[#3C2989] p-8 flex flex-col items-center">
      <Box sx={{ width: "100%", maxWidth: "800px", mb: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/")}
          sx={{ color: "white", mb: 2 }}
        >
          Back to Tasks
        </Button>
        <Typography variant="h3" sx={{ color: "white", mb: 4 }}>
          Progress Dashboard
        </Typography>

        <Box
          sx={{
            p: 4,
            bgcolor: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(20px)",
            borderRadius: "16px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
          }}
        >
          <Typography
            variant="h6"
            sx={{ color: "rgba(255,255,255,0.8)", mb: 3 }}
          >
            Task Completion Percentage (Last 30 Days)
          </Typography>

          <Box sx={{ height: 400, width: "100%" }}>
            {history.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={history}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="colorPercentage"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="date"
                    stroke="rgba(255,255,255,0.5)"
                    tickFormatter={(tick) => {
                      const date = new Date(tick);
                      return `${date.getMonth() + 1}/${date.getDate()}`;
                    }}
                  />
                  <YAxis
                    stroke="rgba(255,255,255,0.5)"
                    domain={[0, 100]}
                    tickFormatter={(tick) => `${tick}%`}
                  />
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.1)"
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(0,0,0,0.8)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      borderRadius: "8px",
                      color: "white",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="percentage"
                    stroke="#8b5cf6"
                    fillOpacity={1}
                    fill="url(#colorPercentage)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography sx={{ color: "rgba(255,255,255,0.5)" }}>
                  No enough data yet to display progress history. Complete some
                  tasks today!
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </div>
  );
}
