import { AppBar, Badge, Box, Button, IconButton, Toolbar, Typography } from "@mui/material"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { logout } from "../stores/slices/authSlice";
import { Link, redirect } from "react-router";

export function Layout({
  children,
}: {
  children: React.ReactElement
}) {
  const dispatch = useAppDispatch()
  const cartItems = useAppSelector((state) => state.cart.value)
  const isLoggedIn = useAppSelector((state) => state.auth.value)

  const onLogout = () => {
    dispatch(logout())
  }

  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column"
    }}>
      <AppBar component="nav" position="sticky">
        <Toolbar>
          <Box
            sx={{ flexGrow: 1 }}
          >
            <Link to={"/"} style={{ textDecoration: "none", color: "inherit"}}>
              <Typography
                variant="h6"
                component="div"
              >
                Skyint Homework
              </Typography>
            </Link>
          </Box>
          {
            isLoggedIn && (
              <>
                <Link to={"/cart"}>
                  <IconButton
                    size="large"
                  >
                    <Badge badgeContent={cartItems.length} color="error">
                      <ShoppingCartIcon />
                    </Badge>
                  </IconButton>
                </Link>
                <Button onClick={onLogout}>
                  <Typography>Kijelentkezés</Typography>
                </Button>
              </>
            )
          }
        </Toolbar>
      </AppBar>
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        padding: 4,
        alignItems: "center"
      }}>
        {children}
      </Box>
    </Box>
  )
}