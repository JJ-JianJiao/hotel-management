import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useUpdateSettings() {
    const queryClient = useQueryClient();
    const { mutate: updateSetting, isPending: isUpdating } = useMutation({
        mutationFn: updateSettingApi,
        onSuccess: () => {
            toast.success("Settings has updated successfully.");
            queryClient.invalidateQueries({
                queryKey: ["settings"],
            });
        },
        onError: (err) => toast.error(err.message),
    });

    return { isUpdating, updateSetting };
}
