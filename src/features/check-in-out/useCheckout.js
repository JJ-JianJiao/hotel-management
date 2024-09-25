import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckout() {
    const queryClient = useQueryClient();
    const { mutate: checkout, isPending: isCheckout } = useMutation({
        mutationFn: (bookingId) => updateBooking(bookingId, { status: "checked-out" }),
        onSuccess: (data) => {
            toast.success(`The booking #${data.id} has checked out.`);
            queryClient.invalidateQueries({
                // queryKey: ["bookings"],
                active: true,
            });
        },
        onError: (err) => toast.error(err.message),
    });
    return { checkout, isCheckout };
}
