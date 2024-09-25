import { useEffect, useRef } from "react";

export function useClickOutside(close, listenCapturing = true) {
    const ref = useRef();
    useEffect(
        function () {
            function handleClick(e) {
                // if (ref.current) {
                //     if (ref.current.contains(e.target)) {
                //         return;
                //     } else {
                //         closeModal();
                //     }
                // } else {
                //     return;
                // }

                if (ref.current && !ref.current.contains(e.target)) {
                    close();
                }
            }
            document.addEventListener("click", handleClick, listenCapturing);
            return () => {
                document.removeEventListener("click", handleClick, listenCapturing);
            };
        },
        [close, listenCapturing]
    );
    return [ref];
}
