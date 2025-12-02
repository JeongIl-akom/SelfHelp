import { Link, Outlet, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

export default function AppLayout() {
  const location = useLocation();

  const tabItems = [
    { value: "/selfhelp", label: "게시판" },
    { value: "/library", label: "자료실" },
  ];

  // 현재 URL에 맞는 탭 value
  const current = tabItems.find((x) =>
    location.pathname.startsWith(x.value)
  )?.value ?? false;

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar sx={{ minHeight: 64 }}>
          <Tabs
            value={current}
            textColor="primary"
            indicatorColor="primary"
          >
            {tabItems.map((tab) => (
              <Tab
                key={tab.value}
                value={tab.value}
                label={tab.label}
                component={Link}
                to={tab.value}
                sx={{ textTransform: "none", fontWeight: 500 }}
              />
            ))}
          </Tabs>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ p: 2 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
