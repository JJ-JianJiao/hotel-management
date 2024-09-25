import CabinTable from "../features/cabins/CabinTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AddCabin from "../features/cabins/AddCabin";
import { useCabins } from "../features/cabins/useCabins";
import Spinner from "../ui/Spinner";
import CabinTableOperations from "../features/cabins/CabinTableOperations";

function Cabins() {
    const { isLoading, cabins } = useCabins();
    // if (isLoading) return <Spinner />;
    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">All cabins</Heading>
                <CabinTableOperations />
            </Row>
            {isLoading ? (
                <Spinner />
            ) : (
                <Row>
                    <CabinTable cabins={cabins} />
                    <AddCabin />
                </Row>
            )}
        </>
    );
}

export default Cabins;
