import { useLocation } from "react-router-dom";
import {parse} from 'query-string';

export const Search = () => {
    const { search } = useLocation();
    const searchFilters = parse(search);
    
};