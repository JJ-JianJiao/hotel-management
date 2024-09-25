import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBookingId from "./useBookingId";
import Spinner from "../../ui/Spinner";
import { HiArrowDownOnSquare, HiArrowUpOnSquare, HiTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBooking } from "./useDeleteBooking";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
    display: flex;
    gap: 2.4rem;
    align-items: center;
`;

function BookingDetail() {
    const { isFetching, booking } = useBookingId();
    const { checkout, isCheckout } = useCheckout();
    const { isDeleting, deleteBooking } = useDeleteBooking();
    const navigate = useNavigate();
    const moveBack = useMoveBack();
    if (isFetching) return <Spinner />;
    if (!booking) return <Empty resourceName="booking" />;
    const statusToTagName = {
        unconfirmed: "blue",
        "checked-in": "green",
        "checked-out": "silver",
    };
    const { status, id } = booking;
    // console.log(status);
    return (
        <>
            <Row type="horizontal">
                <HeadingGroup>
                    <Heading as="h1">Booking #{id}</Heading>
                    <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
                </HeadingGroup>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking} />

            <Modal>
                <ButtonGroup>
                    <Modal.Open opens="booking-delete">
                        <Button variation="danger" disabled={isDeleting} icon={<HiTrash />}>
                            Delete
                        </Button>
                    </Modal.Open>
                    {status === "unconfirmed" && (
                        <Button
                            icon={<HiArrowDownOnSquare />}
                            onClick={() => navigate(`/checkin/${id}`)}
                        >
                            Check in
                        </Button>
                    )}
                    {status === "checked-in" && (
                        <Button
                            disabled={isCheckout}
                            icon={<HiArrowUpOnSquare />}
                            onClick={() => checkout(id)}
                        >
                            Check out
                        </Button>
                    )}
                    <Button variation="secondary" onClick={moveBack}>
                        Back
                    </Button>
                    <Modal.Window name="booking-delete">
                        <ConfirmDelete
                            resourceName={`Booking ${id}`}
                            disabled={isDeleting}
                            onConfirm={() =>
                                deleteBooking(id, {
                                    onSettled: () => navigate(-1),
                                })
                            }
                        />
                    </Modal.Window>
                </ButtonGroup>
            </Modal>
        </>
    );
}

export default BookingDetail;
