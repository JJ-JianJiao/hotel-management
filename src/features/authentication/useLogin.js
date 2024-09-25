import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Login as LoginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
export function useLogin() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { mutate: login, isPending } = useMutation({
        mutationFn: ({ email, password }) => LoginApi({ email, password }),
        onSuccess: (data) => {
            // console.log(data);
            queryClient.setQueryData(["user"], data.user); //set some data into React Query cache
            // console.log("should jump here");
            navigate("/dashboard", { replace: true });
        },
        onError: (err) => {
            console.log("Error", err);
            toast.error("provided email or password are incorrect");
        },
    });

    return { login, isPending };
}
