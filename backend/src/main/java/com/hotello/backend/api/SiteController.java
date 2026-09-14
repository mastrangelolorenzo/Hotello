package com.hotello.backend.api;

import com.hotello.backend.api.dto.SiteResponse;
import com.hotello.backend.domain.AppearanceConfig;
import com.hotello.backend.domain.Installation;
import com.hotello.backend.domain.Policy;
import com.hotello.backend.domain.Property;
import com.hotello.backend.domain.Rate;
import com.hotello.backend.domain.RoomType;
import com.hotello.backend.repository.AppearanceConfigRepository;
import com.hotello.backend.repository.InstallationRepository;
import com.hotello.backend.repository.PolicyRepository;
import com.hotello.backend.repository.PropertyRepository;
import com.hotello.backend.repository.RateRepository;
import com.hotello.backend.repository.RoomTypeRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/site")
public class SiteController {

    private final InstallationRepository installationRepository;
    private final PropertyRepository propertyRepository;
    private final RoomTypeRepository roomTypeRepository;
    private final RateRepository rateRepository;
    private final PolicyRepository policyRepository;
    private final AppearanceConfigRepository appearanceConfigRepository;

    public SiteController(
            InstallationRepository installationRepository,
            PropertyRepository propertyRepository,
            RoomTypeRepository roomTypeRepository,
            RateRepository rateRepository,
            PolicyRepository policyRepository,
            AppearanceConfigRepository appearanceConfigRepository
    ) {
        this.installationRepository = installationRepository;
        this.propertyRepository = propertyRepository;
        this.roomTypeRepository = roomTypeRepository;
        this.rateRepository = rateRepository;
        this.policyRepository = policyRepository;
        this.appearanceConfigRepository = appearanceConfigRepository;
    }

    @GetMapping
    public ResponseEntity<SiteResponse> get() {
        boolean completed = installationRepository.findById(1L)
                .map(Installation::isCompleted)
                .orElse(false);

        if (!completed) {
            return ResponseEntity.notFound().build();
        }

        Property property = propertyRepository.findById(1L).orElse(null);
        if (property == null) {
            return ResponseEntity.notFound().build();
        }

        Map<UUID, Rate> ratesByType = rateRepository.findAll().stream()
                .collect(Collectors.toMap(Rate::getRoomTypeId, rate -> rate));

        List<SiteResponse.RoomInfo> rooms = roomTypeRepository.findAll().stream()
                .map(type -> toRoomInfo(type, ratesByType.get(type.getId())))
                .toList();

        Policy policy = policyRepository.findById(1L).orElseGet(Policy::new);
        AppearanceConfig appearance = appearanceConfigRepository.findById(1L).orElseGet(AppearanceConfig::new);

        SiteResponse response = new SiteResponse(
                new SiteResponse.PropertyInfo(
                        property.getCommercialName(),
                        property.getType(),
                        property.getStarRating(),
                        property.getShortDescription(),
                        property.getLongDescription(),
                        property.getStreet(),
                        property.getPostalCode(),
                        property.getCity(),
                        property.getProvince(),
                        property.getCountry(),
                        property.getLatitude(),
                        property.getLongitude(),
                        property.getPhone(),
                        property.getPublicEmail(),
                        property.getExistingWebsite()
                ),
                rooms,
                new SiteResponse.PolicyInfo(
                        policy.getCheckInFrom(),
                        policy.getCheckInTo(),
                        policy.getCheckOutBy(),
                        policy.getCancellationPolicy(),
                        policy.isDepositRequired(),
                        policy.isPetsAllowed(),
                        policy.isSmokingAllowed()
                ),
                new SiteResponse.AppearanceInfo(
                        appearance.getPrimaryColor(),
                        appearance.getSecondaryColor(),
                        appearance.getHeroTitle(),
                        appearance.getHeroSubtitle(),
                        appearance.getLogoUrl(),
                        appearance.getFaviconUrl(),
                        appearance.getHeroImageUrl(),
                        appearance.getFacebook(),
                        appearance.getInstagram(),
                        appearance.getTwitter()
                )
        );

        return ResponseEntity.ok(response);
    }

    private SiteResponse.RoomInfo toRoomInfo(RoomType type, Rate rate) {
        return new SiteResponse.RoomInfo(
                type.getId(),
                type.getName(),
                type.getDescription(),
                type.getMaxOccupancy(),
                type.getBedCount(),
                type.getSurfaceSqm(),
                type.getAmenities(),
                rate != null ? rate.getBasePrice() : null,
                rate != null ? rate.getCurrency() : "EUR",
                rate != null ? rate.getExtraGuestPrice() : null,
                rate != null ? rate.getMinStayNights() : null,
                rate != null && rate.isBreakfastIncluded(),
                rate != null ? rate.getBreakfastPrice() : null
        );
    }
}
