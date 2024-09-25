import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { mutate: checkin, isPending: isCheckIn } = useMutation({
        mutationFn: ({ bookingId, breakfast }) =>
            updateBooking(bookingId, { status: "checked-in", is_paid: true, ...breakfast }),
        onSuccess: (data) => {
            toast.success(`The booking #${data.id} has checked in.`);
            queryClient.invalidateQueries({
                queryKey: ["bookings"], //active:true
            });
            navigate("/");
        },
        onError: (err) => toast.error(err.message),
    });
    return { checkin, isCheckIn };
}
