import React, { useEffect } from "react";
import {getSpotsById } from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { EditSpot } from "../../store/spots";

const MyOwnedSpots = () => {
    const dispatch = useDispatch()
    const mySpots = useSelector((state) => {
        return Object.values(state.spots)
    })
    useEffect(() => {
        dispatch(getSpotsById())
    }, [dispatch])
    const handleClick = (id) => {
        dispatch(EditSpot(id))
    }
    // if (mySpots.length < 1){
    //     return
    // }
    return (
        <div>{mySpots.map((spot, i) => {
            return <div key={i}>{spot.address}
            <button onClick={() => handleClick(i)}>Edit Your Spot</button>
            </div>
        })}</div>
    )
}

export default MyOwnedSpots;
