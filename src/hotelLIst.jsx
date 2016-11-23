'use strict';
/* global updateBasket, brandConfig */

const React = require('react');


const HotelList = (props) => {
  const hotelsOutput = props.hotels.map((hotel, index) => {

    return (
      <li
        key={index}
        >
        <Hotel
          id={hotel.id}
          name={hotel.name}
          distance={hotel.milesToPark}
          isResort={hotel.isResort}
          starRating={hotel.starRating}
          image={primaryImage}
          grossPrice={hotel.grossPrice}
          standardPrice={hotel.standardPrice}
          hideTicket={hotel.hideTicket}
          uniqueSellingPoints={hotel.uniqueSellingPoints}
          hasFreeWifi={hotel.facilities.hasFreeWifi}
          hasFreeParking={hotel.facilities.hasFreeParking}
          hasSwimmingPool={hotel.facilities.hasSwimmingPool}
          hasBreakfastIncluded={hotel.facilities.hasBreakfastIncluded}
          isCotConfirmationRequired={hotel.isCotConfirmationRequired}
          telephone={hotel.telephone}
          numInfants={hotel.numInfants}
          handleSetProductModal={props.handleSetProductModal}
          handleAddProduct={addToBasket}
          modalState={props.modalState}
          getSessionBasketData={props.getSessionBasketData}
          />
        {hotelModal}
      </li>
    );
  });
  return (
    <ul id="hotels" className="list-unstyled">
      {hotelsOutput}
    </ul>
  );
};



module.exports = HotelList;