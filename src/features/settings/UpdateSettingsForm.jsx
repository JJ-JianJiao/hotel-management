// import { useForm } from "react-hook-form";
// import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useUpdateSettings } from "./useUpdateSettings";
import { useSettings } from "./useSettings";

function UpdateSettingsForm() {
    const {
        isLoading,
        settings: {
            breakfast_price: breakfastPrice,
            max_booking_lenght: maxBookingLength,
            max_guests_per_booking: maxGuestsPerBooking,
            min_booking_lenght: minBookingLength,
        } = {},
    } = useSettings();
    const { isUpdating, updateSetting } = useUpdateSettings();
    // const { register, handleSubmit, reset, getValues, formState } = useForm({});
    if (isLoading) return <Spinner />;
    function handleUpdate(e, field) {
        const { value } = e.target;
        if (!value) return;
        updateSetting({ [field]: value });
    }
    return (
        <Form>
            <FormRow label="Minimum nights/booking">
                <Input
                    type="number"
                    id="min-nights"
                    disabled={isUpdating}
                    defaultValue={minBookingLength}
                    onBlur={(e) => handleUpdate(e, "min_booking_lenght")}
                />
            </FormRow>
            <FormRow label="Maximum nights/booking">
                <Input
                    type="number"
                    id="max-nights"
                    disabled={isUpdating}
                    defaultValue={maxBookingLength}
                    onBlur={(e) => handleUpdate(e, "max_booking_lenght")}
                />
            </FormRow>
            <FormRow label="Maximum guests/booking">
                <Input
                    type="number"
                    id="max-guests"
                    disabled={isUpdating}
                    defaultValue={maxGuestsPerBooking}
                    onBlur={(e) => handleUpdate(e, "max_guests_per_booking")}
                />
            </FormRow>
            <FormRow label="Breakfast price">
                <Input
                    type="number"
                    id="breakfast-price"
                    disabled={isUpdating}
                    defaultValue={breakfastPrice}
                    onBlur={(e) => handleUpdate(e, "breakfast_price")}
                />
            </FormRow>
        </Form>
    );
}

export default UpdateSettingsForm;
