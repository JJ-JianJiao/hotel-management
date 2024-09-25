// import styled from "styled-components";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";
import { itemsFilter } from "../../utils/helpers";

// const TableHeader = styled.header`
//     display: grid;
//     grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//     column-gap: 2.4rem;
//     align-items: center;

//     background-color: var(--color-grey-50);
//     border-bottom: 1px solid var(--color-grey-100);
//     text-transform: uppercase;
//     letter-spacing: 0.4px;
//     font-weight: 600;
//     color: var(--color-grey-600);
//     padding: 1.6rem 2.4rem;
// `;

function CabinTable({ cabins }) {
    // const { isLoading, cabins } = useCabins();
    // if (isLoading) return <Spinner />;
    // console.log(cabins);
    const [searchParams] = useSearchParams();
    if (cabins.length === 0) return <Empty resourceName="cabins" />;
    const filterValue = searchParams.get("discount") ?? "all";
    // console.log(filterValue);

    //1) filter

    let filteredCabins;
    switch (filterValue) {
        case "all":
            filteredCabins = cabins;
            break;
        case "no-discount":
            filteredCabins = itemsFilter(cabins, "discount", 0, filterValue);
            // filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
            break;
        case "with-discount":
            filteredCabins = itemsFilter(cabins, "discount", 0, false);
            // filteredCabins = cabins.filter((cabin) => cabin.discount !== 0);
            break;
        default:
            throw new Error("there is no filter for the cabins");
    }

    //2 Sort
    const sortBy = searchParams.get("sortBy") || "name-asc";
    const [value, sortType] = sortBy.split("-");
    const modifier = sortType === "asc" ? 1 : -1;
    const sortedCabins = filteredCabins.sort((a, b) => (a[value] - b[value]) * modifier);
    return (
        <Menus>
            <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
                <Table.Header>
                    <div></div>
                    <div>Cabin</div>
                    <div>Capacity</div>
                    <div>Price</div>
                    <div>Discount</div>
                    <div></div>
                </Table.Header>
                <Table.Body
                    items={sortedCabins}
                    render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
                />
            </Table>
        </Menus>
    );
}

export default CabinTable;
