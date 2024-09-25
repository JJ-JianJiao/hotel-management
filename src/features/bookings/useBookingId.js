import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBooking } from "../../services/apiBookings";

function useBookingId() {
    const { bookingId } = useParams();
    // console.log(bookingId);
    const { isFetching, data: booking } = useQuery({
        queryKey: ["bookings", bookingId],
        queryFn: () => getBooking({ bookingId }),
        retry: false,
    });

    return { isFetching, booking };
}

export default useBookingId;
