import { Box, Button, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { honeysForSale, HoneyType } from "../utils/util";
import { clear, remove } from "../stores/slices/cartSlice";
import { useMutation } from "@tanstack/react-query";

type GroupedHoneyType = {
  honeyType: HoneyType; 
  indexes: number[];
}

type OrderHoneyType = {
  honeyType: HoneyType; 
  quantity: number;
}

export function CartPage() {
  const orderMutation = useMutation({
    mutationFn: async(data: OrderHoneyType[]) => {
      const response = await fetch("http://localhost:3001/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      if (response.ok) {
        return response.json()
      }
      throw new Error("Order failed")
    },
    onSuccess: () => {
      dispatch(clear())
    }
  })

  const dispatch = useAppDispatch()
  const cartItems = useAppSelector(state => state.cart.value)

  const groupedItems = honeysForSale.reduce((acc, honey) => {
    const cartItemIndexes = cartItems.reduce((indexes, item, index) => {
      if (item === honey) {
        return [...indexes, index]
      }
      return indexes
    }
    , [] as number[])

    return [...acc, {honeyType: honey, indexes: cartItemIndexes}]
  }, [] as GroupedHoneyType[])

  const onItemRemove = (index: number) => {
    dispatch(remove(index))
  }

  const onClearCart = () => {
    dispatch(clear())
  }

  const onOrder = () => {
    const orderData = groupedItems
      .filter(group => group.indexes.length > 0) // filter out empty groups
      .reduce((acc, group) => {
      return [...acc, {
        honeyType: group.honeyType,
        quantity: group.indexes.length
      }]
  }, [] as OrderHoneyType[])

    orderMutation.mutate(orderData)
  }


  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      gap: 2,
      padding: 2
    }}>
      {groupedItems.map((group, index) => (
        <Box key={index} sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          padding: 1
        }}>
          <Typography>{group.honeyType} ({group.indexes.length} db)</Typography>
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            padding: 1
          }}>
            {group.indexes.length === 0 && (
              <Typography sx={{ padding: 1 }}>-</Typography>
            )}
            {group.indexes.map((cartItemIndex) => (
              <Box key={cartItemIndex} sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 1,
                padding: 1
              }}>
                <Typography>{cartItems[cartItemIndex]}</Typography>
                <Button color="error" variant="outlined" onClick={() => onItemRemove(cartItemIndex)}>
                  <Typography>Törlés</Typography>
                </Button>
              </Box>
            ))}
          </Box>
        </Box>
      ))}
      <Box sx={{
        display: "flex",
        gap: 2,
        padding: 2
      }}>
        <Button color="error" disabled={cartItems.length === 0 || orderMutation.isPending} onClick={onClearCart}>
          <Typography>Kosár ürítése</Typography>
        </Button>
        <Button variant="contained" disabled={cartItems.length === 0 || orderMutation.isPending} onClick={onOrder}>
          <Typography>Megrendelés</Typography>
        </Button>
      </Box>
      {orderMutation.isSuccess && (
        <Typography color="success">Sikeres megrendelés</Typography>
      )}
      {orderMutation.isError && (
        <Typography color="error">Hiba történt a megrendelés során</Typography>
      )}
    </Box>
  )
}