pragma solidity >= 0.6.5;

contract SharableCar {
    struct Passenger {
        address payable passengerAddress;
        uint account;
    }
    
    struct Driver {
        address payable driverAdress;
        uint account;
    }
}
