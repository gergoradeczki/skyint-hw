import { Outlet, Navigate } from "react-router";
import { useAppSelector } from "../hooks/hooks";

export function LoggedInLayout() {
  const isLoggedIn = useAppSelector(state => state.auth.value)

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />
  }

  return (
    <>
      <Outlet />
    </>
  )
}