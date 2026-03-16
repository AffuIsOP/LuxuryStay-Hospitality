import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";

const Header = ({ title, subtitle, userrole }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Conditionally set subtitle based on user role
  const updatedSubtitle = subtitle.replace("your", userrole);

  return (
    <Box mb="30px">
      <Typography
        variant="h2"
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color={colors.greenAccent[400]}>
        {updatedSubtitle}
      </Typography>
    </Box>
  );
};

export default Header;
