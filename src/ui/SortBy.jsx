import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options, resetParas }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const sortBy = searchParams.get("sortBy");
    function handleChange(e) {
        searchParams.set("sortBy", e.target.value);
        resetParas.forEach((para) => {
            searchParams.set(para.name, para.value);
        });
        setSearchParams(searchParams);
    }
    return (
        <Select
            options={options}
            type="white"
            onChange={handleChange}
            value={sortBy ? sortBy : "name-asc"}
        ></Select>
    );
}

export default SortBy;
