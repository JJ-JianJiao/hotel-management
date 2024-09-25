import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import { useBookings } from "./useBookings";
import Spinner from "../../ui/Spinner";
import { useSearchParams } from "react-router-dom";
import { itemsFilter } from "../../utils/helpers";

function BookingTable() {
    const { isLoading, bookings } = useBookings();

    const [searchParams] = useSearchParams();
    if (isLoading) return <Spinner />;
    if (bookings.length === 0) return <Empty resourceName="bookings" />;

    const filterValue = searchParams.get("status") ?? "all";

    let filteredBookings = [];
    switch (filterValue) {
        case "all":
            filteredBookings = bookings;
            break;
        case "checked-out":
            filteredBookings = itemsFilter(bookings, "status", "checked-out");
            break;
        case "checked-in":
            filteredBookings = itemsFilter(bookings, "status", "checked-in");
            break;
        case "unconfirmed":
            filteredBookings = itemsFilter(bookings, "status", "unconfirmed");
            break;
        default:
            throw new Error("there is no filter for the bookings");
    }
    //2 Sort
    const sortBy = searchParams.get("sortBy") || "start_date-desc";
    const [value, sortType] = sortBy.split("-");
    const modifier = sortType === "asc" ? 1 : -1;
    let sortedBookings;
    if (value === "start_date") {
        sortedBookings = filteredBookings.sort(
            (a, b) => Number(new Date(a[value])) - Number(new Date(b[value])) * modifier
        );
    } else {
        sortedBookings = filteredBookings.sort((a, b) => (a[value] - b[value]) * modifier);
    }
    console.log(sortedBookings);
    return (
        <Menus>
            <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
                <Table.Header>
                    <div>Cabin</div>
                    <div>Guest</div>
                    <div>Dates</div>
                    <div>Status</div>
                    <div>Amount</div>
                    <div></div>
                </Table.Header>

                <Table.Body
                    items={sortedBookings}
                    render={(booking) => <BookingRow key={booking.id} booking={booking} />}
                />
            </Table>
        </Menus>
    );
}

export default BookingTable;
