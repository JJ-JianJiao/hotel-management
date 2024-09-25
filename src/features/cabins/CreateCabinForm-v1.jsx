import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import { createCabin } from "../../services/apiCabins";

function CreateCabinForm() {
    const { register, handleSubmit, reset, getValues, formState } = useForm();
    const { errors } = formState;
    // console.log(errors);
    const queryClient = useQueryClient();
    const { mutate, isPending: isCreating } = useMutation({
        mutationFn: createCabin,
        onSuccess: () => {
            toast.success("New cabin successfully created");
            queryClient.invalidateQueries({
                queryKey: ["cabins"],
            });
            reset();
        },
        onError: (err) => toast.error(err.message),
    });

    function onSubmit(data) {
        console.log(data);
        console.log(data.image[0]);
        mutate({ ...data, image: data.image[0] });
    }

    function onError(errors) {
        // console.log(errors);
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <FormRow lable="Cabin name" error={errors?.name?.message}>
                <Input
                    disabled={isCreating}
                    type="text"
                    id="name"
                    {...register("name", {
                        required: "This field is required",
                    })}
                />
            </FormRow>

            <FormRow lable="Maximum capacity" error={errors?.maxCapacity?.message}>
                <Input
                    disabled={isCreating}
                    type="number"
                    id="maxCapacity"
                    {...register("maxCapacity", {
                        required: "This field is required",
                        min: {
                            value: 1,
                            message: "Capacity should be at least 1",
                        },
                    })}
                />
            </FormRow>

            <FormRow lable="Regular price" error={errors?.regularPrice?.message}>
                <Input
                    disabled={isCreating}
                    type="number"
                    id="regularPrice"
                    {...register("regularPrice", {
                        required: "This field is required",
                        min: {
                            value: 1,
                            message: "Capacity should be at least 1",
                        },
                    })}
                />
            </FormRow>

            <FormRow lable="Discount" error={errors?.discount?.message}>
                <Input
                    disabled={isCreating}
                    type="number"
                    id="discount"
                    defaultValue={0}
                    {...register("discount", {
                        required: "This field is required",
                        validate: (value) => {
                            // console.log(value, typeof value);
                            // console.log(Number(value));
                            // console.log(getValues().regularPrice, typeof getValues().regularPrice);
                            // console.log(Number(getValues().regularPrice));
                            if (Number(value) < 0) return "Discount should be greater than 0";
                            if (Number(value) <= Number(getValues().regularPrice)) {
                                return true;
                            } else {
                                return "Discount should be less than regular price";
                            }
                        },

                        // validate: (value, fieldValues) =>
                        //     value <= getValues().regularPrice ||
                        //     "Discount should be less than regular price",
                    })}
                />
            </FormRow>

            <FormRow lable="Description for website" error={errors?.description?.message}>
                <Textarea
                    disabled={isCreating}
                    type="number"
                    id="description"
                    defaultValue=""
                    {...register("description", {
                        required: "This field is required",
                    })}
                />
            </FormRow>

            <FormRow lable="Cabin photo" error={errors?.name?.message}>
                <FileInput
                    disabled={isCreating}
                    id="image"
                    accept="image/*"
                    {...register("image", {
                        required: "This field is required",
                    })}
                />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button disabled={isCreating}>Add cabin</Button>
            </FormRow>
        </Form>
    );
}

export default CreateCabinForm;
