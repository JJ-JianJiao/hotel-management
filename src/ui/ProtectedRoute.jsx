import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
// import { useEditCabin } from "../features/cabins/useEditCabin";
import { useEffect } from "react";

const FullPage = styled.div`
    height: 100vh;
    background-color: var() (--color-grey-50);
    display: flex;
    align-items: center;
    justify-content: center;
`;

function ProtectedRoute({ children }) {
    const navigate = useNavigate(); //only can use navigate inside a callback or useEffect
    //1. load the authenticated user
    const { isPending: isLoadingUser, isAuthenticated } = useUser();

    //2. if there is No authenticated user, redirect to the /login page
    useEffect(
        function () {
            if (!isAuthenticated && !isLoadingUser) navigate("/login");
        },
        [navigate, isAuthenticated, isLoadingUser]
    );

    //3. while loading, show a spinner,
    if (isLoadingUser)
        return (
            <FullPage>
                <Spinner />
            </FullPage>
        );
    //4. if there is a user, render the app
    if (isAuthenticated) return children;
}

export default ProtectedRoute;
