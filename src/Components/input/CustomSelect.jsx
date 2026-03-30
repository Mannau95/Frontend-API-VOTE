import React, {useState} from 'react';
import {ChevronDown, ChevronRight} from "lucide-react";
import DefaultValue from "../default/DefaultValue.jsx";
import Checkbox from "daisyui/components/checkbox/index.js";

function CustomSelect({
    value,
    onChange,
    placeholder,
    options,
    mode = "single",
}) {
    // const [value, setSelected] = useState([]);
    const [open, setOpen] = useState(false);
    const toggle = () => setOpen(!open);
    const [search, setSearch] = useState("");

    const handleChange = (selected) => {
        if( mode === "single" ) {
            onChange([selected]);
        } else {
            if(value.includes(selected)) {
                onChange(selected.filter(item => item.value !== selected));
            }else {
                onChange([...value, selected]);
            }
        }
    }

    const filtered = options.filter(
        (o) =>
            o.label.toLowerCase().includes(search.toLowerCase()) &&
            !value.find((s) => s.value === o.value)
    );

    return (
        <div className="relative">
            {/*Selected items*/}
            <div
                onClick={() => toggle()}
                className="flex border border-gray-300 h-9.5 px-3 rounded-sm text-sm text-gray-500">
                {
                    value.length === 0 ?
                        (<div className="my-auto flex items-center justify-between w-full">
                            <span>{ placeholder ?? "Sélectionner une valeur"}</span>
                            <span><ChevronDown size={15} /></span>
                        </div> ):
                        (<div className="flex items-center justify-between w-full">
                            <ul className="flex gap-x-3 py-1.5">
                                {value.slice(0,2).map((val, index) =>
                                (<li key={index} className="bg-gray-300 rounded-xs text-black px-2 py-0.5">{options.find(o => o.value == val).label}</li>))}
                                { value.length >1 && <li className="bg-gray-300 rounded-xs px-2 py-0.5">...</li>}
                            </ul>
                            <ChevronDown size={15}/>
                        </div>)
                }
            </div>

            {/*dropdown*/}
            { open && (
                <div className="flex absolute top-10 border border-gray-300 rounded-sm w-full text-2xs text-black bg-white">
                    { options.length === 0 ?
                        <DefaultValue defaultValue="Aucune option" className=" h-10 " />:
                        <ul className="flex flex-col py-2 w-full">{
                            options.map((option, index) => (
                                <li key={index} className={"hover:bg-blue-100 w-full " + " "}>
                                    {mode === "multiple" && (
                                        <Checkbox
                                            checked={value.includes(option.value)}
                                            onChange={() => handleChange(option.value)}
                                        />
                                    )}
                                    <span className="px-3 inline-block w-full" onClick={()=> handleChange(option.value)}>{option.label}</span>
                                </li>
                            ))
                        }</ul>
                    }
                </div>
            )}
        </div>
    );
}

export default CustomSelect;