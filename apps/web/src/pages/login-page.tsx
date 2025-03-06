import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch } from "../hooks/hooks";
import { login } from "../stores/slices/authSlice";
import { useMutation } from "@tanstack/react-query";

interface IFormInputs {
  username: string;
  password: string;
}

export function LoginPage() {
  const loginMutation = useMutation({
    mutationFn: async (data: IFormInputs) => {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      if (response.ok) {
        return response.json()
      }
      throw new Error("Login failed")
    },
    onSuccess: () => {
      dispatch(login())
    }
  })
  const dispatch = useAppDispatch()
  const { handleSubmit, control } = useForm<IFormInputs>({
    defaultValues: {
      username: "",
      password: ""
    },
  })
  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    loginMutation.mutate(data)
  }

  return (
    <Paper sx={{
      padding: 2
    }}>
      <Box 
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1
        }}
      >
        <Controller 
          name="username"
          control={control}
          render={({field}) => <TextField {...field} label="Felhasználónév" type="text" />}
        />
        <Controller 
          name="password"
          control={control}
          render={({field}) => <TextField {...field} label="Jelszó" type="password" />}
        />
        <Button type="submit" disabled={loginMutation.isPending}>
          <Typography>Belépés</Typography>
        </Button>
        {loginMutation.isError && <Typography color="error">Érvénytelen belépési adatok!</Typography>}
      </Box>
    </Paper>
  )
}