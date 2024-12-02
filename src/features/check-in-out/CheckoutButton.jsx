import Button from "../../ui/Button";
import { useCheckout } from "./useCheckout";

function CheckoutButton({ bookingId }) {
  const{checkout, isCheckinOut } = useCheckout()
  return (
    <Button variations="primary" size="small" disabled={isCheckinOut} onClick={()=>checkout(bookingId)}>
      Check out
    </Button>
  );
}

export default CheckoutButton;
