import {useMemo} from "react";

export const useSortedPersons = (persons, sort) => {
    const sortedPersons = useMemo(() => {
        if(sort) {
            return [...persons].sort((a, b) => a[sort].localeCompare(b[sort]))
        }
        return persons;
    }, [sort, persons])

    return sortedPersons;
}

export const usePersons = (persons, sort, query) => {
    const sortedPersons = useSortedPersons(persons, sort);

    const sortedAndSearchedPersons = useMemo(() => {
        return sortedPersons.filter(person => person.lastname.toLowerCase().includes(query.toLowerCase()))
    }, [query, sortedPersons])

    return sortedAndSearchedPersons;
}