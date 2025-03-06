import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "../hooks/hooks";

export function LoggedOutLayout() {
  const isLoggedIn = useAppSelector(state => state.auth.value)

  if (isLoggedIn) {
    return <Navigate to="/" replace />
  }

  return (
    <>
      <Outlet />
    </>
  )
}