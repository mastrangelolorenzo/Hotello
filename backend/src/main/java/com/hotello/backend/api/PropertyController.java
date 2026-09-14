package com.hotello.backend.api;

import com.hotello.backend.api.dto.PropertyRequest;
import com.hotello.backend.domain.Property;
import com.hotello.backend.repository.PropertyRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/setup/property")
public class PropertyController {

    private final PropertyRepository repository;

    public PropertyController(PropertyRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public ResponseEntity<Void> save(@Valid @RequestBody PropertyRequest request) {
        Property property = repository.findById(1L).orElseGet(Property::new);
        property.setCommercialName(request.commercialName());
        property.setType(request.type());
        property.setStarRating(request.starRating());
        property.setShortDescription(request.shortDescription());
        property.setLongDescription(request.longDescription());
        property.setStreet(request.street());
        property.setPostalCode(request.postalCode());
        property.setCity(request.city());
        property.setProvince(request.province());
        property.setCountry(request.country());
        property.setLatitude(request.latitude());
        property.setLongitude(request.longitude());
        property.setPhone(request.phone());
        property.setPublicEmail(request.publicEmail());
        property.setExistingWebsite(request.existingWebsite());
        repository.save(property);

        return ResponseEntity.ok().build();
    }
}
