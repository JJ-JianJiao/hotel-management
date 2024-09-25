import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBookingId from "../bookings/useBookingId";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
    /* Box */
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-100);
    border-radius: var(--border-radius-md);
    padding: 2.4rem 4rem;
`;

function CheckinBooking() {
    const [confirmPaid, setConfirmPaid] = useState(false);
    const [confirmBreakfast, setConfirmBreakfast] = useState(false);
    const moveBack = useMoveBack();
    const { isFetching, booking } = useBookingId();
    const { checkin, isCheckIn } = useCheckin();
    const { settings, isLoading: isLoadingSettings } = useSettings();

    useEffect(() => setConfirmPaid(booking?.is_paid ?? false), [booking?.is_paid]);

    if (isFetching || isLoadingSettings) return <Spinner />;
    const {
        id: bookingId,
        guests,
        total_price,
        num_guests,
        has_breakfast,
        // num_nights,
        is_paid,
    } = booking;
    const optionalBreakfastPrice = (settings.breakfast_price * num_guests).toFixed(2);
    // console.log(bookingId);
    function handleCheckin() {
        if (!confirmPaid) return;
        if (confirmBreakfast) {
            checkin({
                bookingId,
                breakfast: {
                    has_breakfast: true,
                    extra_price: optionalBreakfastPrice,
                    total_price: Number(total_price) + Number(optionalBreakfastPrice),
                },
            });
        } else checkin({ bookingId, breakfast: {} });
    }

    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">Check in booking #{bookingId}</Heading>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking} />

            {!has_breakfast && (
                <Box>
                    <Checkbox
                        checked={confirmBreakfast}
                        onChange={() => {
                            setConfirmBreakfast((confirm) => !confirm);
                            // setConfirmPaid(false);
                        }}
                        id="confirmBk"
                        disabled={has_breakfast || isCheckIn}
                    >
                        Want to add breakfast for ${optionalBreakfastPrice}{" "}
                        <i>(${settings.breakfast_price} / per guest)</i>?
                    </Checkbox>
                </Box>
            )}
            <Box>
                <Checkbox
                    checked={confirmPaid}
                    onChange={() => setConfirmPaid((confirm) => !confirm)}
                    id="confirm"
                    disabled={is_paid || isCheckIn}
                >
                    I confirm that {guests.full_name} has paid the total amount of{" "}
                    {/* {formatCurrency(total_price)} */}
                    {confirmBreakfast && !is_paid
                        ? `${formatCurrency(total_price)} (${formatCurrency(
                              total_price
                          )} + ${formatCurrency(optionalBreakfastPrice)} breakfast)`
                        : formatCurrency(total_price)}
                    .
                </Checkbox>
            </Box>

            <ButtonGroup>
                <Button disabled={!confirmPaid || isCheckIn} onClick={handleCheckin}>
                    Check in booking #{bookingId}
                </Button>
                <Button variation="secondary" onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
}

export default CheckinBooking;
