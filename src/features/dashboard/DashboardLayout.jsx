import styled from "styled-components";
import { useRecentStays } from "./useRecentStays";
import Spinner from "../../ui/Spinner";
import { useRecentBookings } from "./useRecentBookings copy";
import { useCabins } from "../cabins/useCabins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";
import Stats from "./Stats";

const StyledDashboardLayout = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: auto 34rem auto;
    gap: 2.4rem;
`;

function DashboardLayout() {
    const { bookings, isLoading: isLoadingBookings } = useRecentBookings();
    const { isLoading: isLoadingStays, confirmedStays, numDays } = useRecentStays();
    const { cabins, isLoading: isLoadingCabins } = useCabins();
    if (isLoadingBookings || isLoadingStays || isLoadingCabins) return <Spinner />;

    return (
        <StyledDashboardLayout>
            <Stats
                bookings={bookings}
                confirmedStays={confirmedStays}
                numsDays={numDays}
                cabinCount={cabins.length}
            />
            <TodayActivity />
            <DurationChart confirmedStays={confirmedStays} />
            <SalesChart bookings={bookings} numOfDays={numDays} />
        </StyledDashboardLayout>
    );
}

export default DashboardLayout;
