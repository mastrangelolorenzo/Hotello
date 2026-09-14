package com.hotello.backend.api;

import com.hotello.backend.api.dto.FiscalDataRequest;
import com.hotello.backend.domain.FiscalData;
import com.hotello.backend.repository.FiscalDataRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/setup/fiscal-data")
public class FiscalDataController {

    private final FiscalDataRepository repository;

    public FiscalDataController(FiscalDataRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public ResponseEntity<Void> save(@Valid @RequestBody FiscalDataRequest request) {
        FiscalData fiscalData = repository.findById(1L).orElseGet(FiscalData::new);
        fiscalData.setCompanyName(request.companyName());
        fiscalData.setVatNumber(request.vatNumber());
        fiscalData.setTaxCode(request.taxCode());
        fiscalData.setLegalAddress(request.legalAddress());
        fiscalData.setVatRegime(request.vatRegime());
        fiscalData.setAccommodationVatRate(request.accommodationVatRate());
        fiscalData.setSdiOrPec(request.sdiOrPec());
        fiscalData.setCin(request.cin());
        fiscalData.setCir(request.cir());
        fiscalData.setIstatCode(request.istatCode());
        fiscalData.setAlloggiatiUsername(request.alloggiatiUsername());
        fiscalData.setAlloggiatiPassword(request.alloggiatiPassword());
        fiscalData.setAlloggiatiWsKey(request.alloggiatiWsKey());
        fiscalData.setTouristTaxActive(request.touristTaxActive());
        fiscalData.setTouristTaxAmount(request.touristTaxAmount());
        fiscalData.setTouristTaxMaxNights(request.touristTaxMaxNights());
        fiscalData.setTouristTaxExemptionAge(request.touristTaxExemptionAge());
        fiscalData.setTouristTaxExemptions(request.touristTaxExemptions());
        repository.save(fiscalData);

        return ResponseEntity.ok().build();
    }
}
