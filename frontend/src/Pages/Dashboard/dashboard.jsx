
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line as RechartsLine,
  XAxis as LineXAxis,
  YAxis as LineYAxis,
  CartesianGrid as LineCartesianGrid,
  Tooltip as LineTooltip,
  Legend as LineLegend,
  ResponsiveContainer as LineResponsiveContainer,
} from "recharts";

// icons
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../Components/Dashboard/Header";
import ProgressCircle from "../../Components/Dashboard/ProgressCircle";


import { useEffect, useState } from "react";
const { jwtDecode } = require("jwt-decode");


const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const lineChartData = [
    { transportation: "Car", count: 40 },
    { transportation: "Bike", count: 50 },
    { transportation: "Bus", count: 30 },
    { transportation: "Train", count: 20 },
    { transportation: "Plane", count: 15 },
    { transportation: "Boat", count: 10 },
  ];

  const data = [
    {
      country: "USA",
      "hot dog": 120,
      burger: 80,
      sandwich: 60,
      kebab: 50,
      fries: 70,
      donut: 30,
    },
    {
      country: "Germany",
      "hot dog": 110,
      burger: 90,
      sandwich: 70,
      kebab: 40,
      fries: 60,
      donut: 40,
    },
    {
      country: "UK",
      "hot dog": 100,
      burger: 85,
      sandwich: 75,
      kebab: 60,
      fries: 80,
      donut: 50,
    },
    {
      country: "France",
      "hot dog": 95,
      burger: 70,
      sandwich: 80,
      kebab: 55,
      fries: 65,
      donut: 45,
    },
    {
      country: "Spain",
      "hot dog": 90,
      burger: 60,
      sandwich: 65,
      kebab: 50,
      fries: 60,
      donut: 40,
    },
    {
      country: "Italy",
      "hot dog": 115,
      burger: 75,
      sandwich: 70,
      kebab: 60,
      fries: 85,
      donut: 55,
    },
  ];

  const barData = [
    { key: "hot dog", color: "#38bcb2" },
    { key: "burger", color: "#eed312" },
    { key: "sandwich", color: "#f56342" },
    { key: "kebab", color: "#2b8a3e" },
    { key: "fries", color: "#b9d62b" },
    { key: "donut", color: "#9a32cc" },
  ];

  const mockTransactions = [
    { txId: "TXN001", user: "John Doe", date: "2023-12-20", cost: "120.50" },
    { txId: "TXN002", user: "Jane Smith", date: "2023-12-21", cost: "85.00" },
    { txId: "TXN003", user: "Bob Johnson", date: "2023-12-22", cost: "60.75" },
    { txId: "TXN004", user: "Alice Brown", date: "2023-12-23", cost: "150.20" },
    { txId: "TXN005", user: "Chris Green", date: "2023-12-24", cost: "99.99" },
  ];

    const [userrole, setUserrole] = useState(null);
  
    useEffect(() => {
      const token = localStorage.getItem("authToken");
      if (token) {
        const decodedToken = jwtDecode(token);
        setUserrole(decodedToken.userrole);
      }
    }, []);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" userrole={userrole}/>

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box width="100%" m="0 30px">
            <Box display="flex" justifyContent="space-between">
              <Box>
                <EmailIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  sx={{ color: colors.grey[100] }}
                >
                  12,361
                </Typography>
              </Box>
              <Box>
                <ProgressCircle progress="0.75" />
              </Box>
            </Box>
            <Box display="flex" justifyContent="space-between" mt="2px">
              <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
                Emails Sent
              </Typography>
              <Typography
                variant="h5"
                fontStyle="italic"
                sx={{ color: colors.greenAccent[600] }}
              >
                +14%
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box width="100%" m="0 30px">
            <Box display="flex" justifyContent="space-between">
              <Box>
                <PointOfSaleIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  sx={{ color: colors.grey[100] }}
                >
                  431,225
                </Typography>
              </Box>
              <Box>
                <ProgressCircle progress="0.50" />
              </Box>
            </Box>
            <Box display="flex" justifyContent="space-between" mt="2px">
              <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
                Sales Obtained
              </Typography>
              <Typography
                variant="h5"
                fontStyle="italic"
                sx={{ color: colors.greenAccent[600] }}
              >
                +21%
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box width="100%" m="0 30px">
            <Box display="flex" justifyContent="space-between">
              <Box>
                <PersonAddIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  sx={{ color: colors.grey[100] }}
                >
                  32,441
                </Typography>
              </Box>
              <Box>
                <ProgressCircle progress="0.30" />
              </Box>
            </Box>
            <Box display="flex" justifyContent="space-between" mt="2px">
              <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
                New Clients
              </Typography>
              <Typography
                variant="h5"
                fontStyle="italic"
                sx={{ color: colors.greenAccent[600] }}
              >
                +5%
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box width="100%" m="0 30px">
            <Box display="flex" justifyContent="space-between">
              <Box>
                <TrafficIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  sx={{ color: colors.grey[100] }}
                >
                  1,325,134
                </Typography>
              </Box>
              <Box>
                <ProgressCircle progress="0.80" />
              </Box>
            </Box>
            <Box display="flex" justifyContent="space-between" mt="2px">
              <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
                Traffic Received
              </Typography>
              <Typography
                variant="h5"
                fontStyle="italic"
                sx={{ color: colors.greenAccent[600] }}
              >
                +43%
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* ROW 2 */}

        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Sales Quantity
          </Typography>
          <Box height="250px" mt="-20px">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={data}
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="country"
                  tick={{ fill: colors.grey[100] }}
                  tickSize={5}
                  tickMargin={5}
                  angle={0}
                  textAnchor="middle"
                  style={{ fontSize: 12 }}
                />
                <YAxis
                  tick={{ fill: colors.grey[100] }}
                  tickSize={5}
                  tickMargin={5}
                  style={{ fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: colors.grey[700],
                    borderRadius: 5,
                    padding: "10px",
                  }}
                />
                <Legend
                  wrapperStyle={{
                    paddingTop: 10,
                    fontSize: 12,
                    color: colors.grey[100],
                  }}
                  layout="horizontal"
                  align="center"
                />
                {barData.map(({ key, color }) => (
                  <Bar
                    key={key}
                    dataKey={key}
                    fill={color}
                    radius={[10, 10, 0, 0]}
                    barSize={30}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Transactions
            </Typography>
          </Box>
          {mockTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.txId}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.user}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.date}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                ${transaction.cost}
              </Box>
            </Box>
          ))}
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 12"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Revenue Generated
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                $59,342.32
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>

          <Box height="250px" m="0 0 0 0">
            <LineResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={lineChartData}>
                <LineCartesianGrid strokeDasharray="3 3" />
                <LineXAxis
                  dataKey="transportation"
                  tick={{ fill: colors.grey[100] }}
                  tickSize={5}
                  tickMargin={5}
                  angle={0}
                  textAnchor="middle"
                  style={{ fontSize: 12 }}
                />
                <LineYAxis
                  tick={{ fill: colors.grey[100] }}
                  tickSize={5}
                  tickMargin={5}
                  style={{ fontSize: 12 }}
                />
                <LineTooltip
                  contentStyle={{
                    backgroundColor: colors.grey[700],
                    borderRadius: 5,
                    padding: "10px",
                  }}
                />
                <LineLegend
                  wrapperStyle={{
                    paddingTop: 10,
                    fontSize: 12,
                    color: colors.grey[100],
                  }}
                  layout="horizontal"
                  align="center"
                />
                <RechartsLine
                  type="monotone"
                  dataKey="count"
                  stroke={colors.primary[500]}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 8 }}
                />
              </RechartsLineChart>
            </LineResponsiveContainer>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
