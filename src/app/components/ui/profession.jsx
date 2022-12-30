import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
    getProfessionsLoadingStatus,
    getProfessionById
} from "../../store/professions";

const Profession = ({ id }) => {
    const isLoading = useSelector(getProfessionsLoadingStatus());
    if (!isLoading) {
        const prof = useSelector(getProfessionById(id));
        return <p>{prof.name}</p>;
    } else return "Loading...";
};
Profession.propTypes = {
    id: PropTypes.string
};
export default Profession;
