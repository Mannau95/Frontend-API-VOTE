import {useEffect, useState} from 'react';
import SearchBar from "../../Components/SearchBar.jsx";
import CustomSelect from "../../Components/input/CustomSelect.jsx";
import {useSelector} from "react-redux";

function CandidaturesFilterBar({}) {
    const [selectedElections, setSelectedElections] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState([]);
    const { elections } = useSelector( state => state.elections);
    const [electionsOptions, setElectionsOptions] = useState([]);

    useEffect(() => {
        setElectionsOptions(
            elections.map( e => ({
                value: e.id,
                label: e.name,
            }))
        )
    }, [elections]);

    return (
        <div className="grid grid-cols-3 gap-x-20">
            <SearchBar placeholder={"Rechercher un candidat"} className="w-full" />
            <CustomSelect
                placeholder="Toutes les élections"
                value={selectedElections}
                onChange={(value) => setSelectedElections(value)}
                options={electionsOptions} />

            <CustomSelect
                placeholder="Tous "
                value={selectedStatus}
                onChange={(value) => setSelectedStatus(value)}
                options={electionsOptions} />
        </div>
    );
}

export default CandidaturesFilterBar;