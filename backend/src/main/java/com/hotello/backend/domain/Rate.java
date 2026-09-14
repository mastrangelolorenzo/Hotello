package com.hotello.backend.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;

import java.math.BigDecimal;
import java.util.UUID;

@Entity
public class Rate {

    @Id
    private UUID roomTypeId;

    @OneToOne
    @MapsId
    private RoomType roomType;

    private BigDecimal basePrice;

    private String currency = "EUR";

    private BigDecimal extraGuestPrice;

    private Integer minStayNights;

    private boolean breakfastIncluded;

    private BigDecimal breakfastPrice;

    public UUID getRoomTypeId() {
        return roomTypeId;
    }

    public void setRoomTypeId(UUID roomTypeId) {
        this.roomTypeId = roomTypeId;
    }

    public RoomType getRoomType() {
        return roomType;
    }

    public void setRoomType(RoomType roomType) {
        this.roomType = roomType;
    }

    public BigDecimal getBasePrice() {
        return basePrice;
    }

    public void setBasePrice(BigDecimal basePrice) {
        this.basePrice = basePrice;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public BigDecimal getExtraGuestPrice() {
        return extraGuestPrice;
    }

    public void setExtraGuestPrice(BigDecimal extraGuestPrice) {
        this.extraGuestPrice = extraGuestPrice;
    }

    public Integer getMinStayNights() {
        return minStayNights;
    }

    public void setMinStayNights(Integer minStayNights) {
        this.minStayNights = minStayNights;
    }

    public boolean isBreakfastIncluded() {
        return breakfastIncluded;
    }

    public void setBreakfastIncluded(boolean breakfastIncluded) {
        this.breakfastIncluded = breakfastIncluded;
    }

    public BigDecimal getBreakfastPrice() {
        return breakfastPrice;
    }

    public void setBreakfastPrice(BigDecimal breakfastPrice) {
        this.breakfastPrice = breakfastPrice;
    }
}
