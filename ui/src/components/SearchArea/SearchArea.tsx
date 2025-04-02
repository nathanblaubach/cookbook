import React, {useState} from "react";
import filterImage from '../../assets/filter.svg';
import './SearchArea.css';

type SearchAreaProps = {
    children: React.ReactNode,
    type: string,
    searchString: string,
    onSearchStringChange: (searchString: string) => void,
};

export function SearchArea({
                               children,
                               type,
                               searchString,
                               onSearchStringChange
                           }: Readonly<SearchAreaProps>): React.JSX.Element {

    const [showFilters, setShowFilters] = useState<boolean>(false);

    return (
        <div className="search-area">
            <button onClick={() => setShowFilters(!showFilters)} aria-label="Show Filter Area">
                <img src={filterImage} alt="Filter Icon"/>
            </button>
            <input
                className="search-bar"
                type="textbox"
                aria-label={`${type} Search Bar`}
                placeholder="Search"
                value={searchString}
                onChange={(event) => onSearchStringChange(event.target.value)}/>
            {showFilters && children}
        </div>
    );

}
