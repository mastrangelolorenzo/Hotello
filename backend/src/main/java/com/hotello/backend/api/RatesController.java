package com.hotello.backend.api;

import com.hotello.backend.api.dto.RatesRequest;
import com.hotello.backend.domain.Rate;
import com.hotello.backend.domain.RoomType;
import com.hotello.backend.repository.RateRepository;
import com.hotello.backend.repository.RoomTypeRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/setup/rates")
public class RatesController {

    private final RateRepository rateRepository;
    private final RoomTypeRepository roomTypeRepository;

    public RatesController(RateRepository rateRepository, RoomTypeRepository roomTypeRepository) {
        this.rateRepository = rateRepository;
        this.roomTypeRepository = roomTypeRepository;
    }

    @PostMapping
    @Transactional
    public ResponseEntity<Void> save(@RequestBody RatesRequest request) {
        List<RatesRequest.RateItem> items = request.rates() == null ? List.of() : request.rates();

        for (RatesRequest.RateItem item : items) {
            if (item.roomTypeId() == null) {
                continue;
            }
            RoomType type = roomTypeRepository.findById(item.roomTypeId()).orElse(null);
            if (type == null) {
                continue;
            }

            Rate rate = rateRepository.findById(item.roomTypeId()).orElseGet(Rate::new);
            rate.setRoomType(type);
            rate.setBasePrice(item.basePrice());
            rate.setCurrency(item.currency() == null || item.currency().isBlank() ? "EUR" : item.currency());
            rate.setExtraGuestPrice(item.extraGuestPrice());
            rate.setMinStayNights(item.minStayNights());
            rate.setBreakfastIncluded(item.breakfastIncluded());
            rate.setBreakfastPrice(item.breakfastPrice());
            rateRepository.save(rate);
        }

        return ResponseEntity.ok().build();
    }
}
