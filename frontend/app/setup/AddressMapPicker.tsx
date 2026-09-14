"use client";

import { useEffect, useRef, useState } from "react";
import { importLibrary, setOptions } from "@googlemaps/js-api-loader";

type ResolvedAddress = {
  formattedAddress: string;
  lat: number;
  lng: number;
  postalCode: string;
  city: string;
  province: string;
  country: string;
};

type Props = {
  label: string;
  confirmLabel: string;
  editLabel: string;
  confirmedLabel: string;
  missingKeyLabel: string;
  confirmRequiredMessage: string;
};

export default function AddressMapPicker({
  label,
  confirmLabel,
  editLabel,
  confirmedLabel,
  missingKeyLabel,
  confirmRequiredMessage,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markerInstanceRef = useRef<google.maps.Marker | null>(null);

  const [address, setAddress] = useState<ResolvedAddress | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(true);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey || !inputRef.current) {
      setHasApiKey(Boolean(apiKey));
      return;
    }

    setOptions({ key: apiKey });

    let autocomplete: google.maps.places.Autocomplete | undefined;
    let listener: google.maps.MapsEventListener | undefined;

    Promise.all([importLibrary("places"), importLibrary("maps"), importLibrary("marker")]).then(
      ([placesLibrary, mapsLibrary, markerLibrary]) => {
        autocomplete = new placesLibrary.Autocomplete(inputRef.current!, {
          types: ["address"],
          componentRestrictions: { country: "it" },
          fields: ["formatted_address", "geometry", "address_components"],
        });

        listener = autocomplete.addListener("place_changed", () => {
          const place = autocomplete!.getPlace();
          const location = place.geometry?.location;
          if (!location) return;

          const components = place.address_components ?? [];
          const getComponent = (type: string) =>
            components.find((component) => component.types.includes(type))?.long_name ?? "";

          const resolved: ResolvedAddress = {
            formattedAddress: place.formatted_address ?? "",
            lat: location.lat(),
            lng: location.lng(),
            postalCode: getComponent("postal_code"),
            city: getComponent("locality") || getComponent("administrative_area_level_3"),
            province: getComponent("administrative_area_level_2"),
            country: getComponent("country"),
          };

          setAddress(resolved);
          setConfirmed(false);

          if (!mapRef.current) return;

          if (!mapInstanceRef.current) {
            mapInstanceRef.current = new mapsLibrary.Map(mapRef.current, {
              center: { lat: resolved.lat, lng: resolved.lng },
              zoom: 16,
            });
          } else {
            mapInstanceRef.current.setCenter({ lat: resolved.lat, lng: resolved.lng });
          }

          markerInstanceRef.current?.setMap(null);
          markerInstanceRef.current = new markerLibrary.Marker({
            map: mapInstanceRef.current,
            position: { lat: resolved.lat, lng: resolved.lng },
          });
        });
      }
    );

    return () => {
      listener?.remove();
    };
  }, []);

  useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.setCustomValidity(address && !confirmed ? confirmRequiredMessage : "");
  }, [address, confirmed, confirmRequiredMessage]);

  function handleEdit() {
    setConfirmed(false);
    setAddress(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="propertyAddress" className="text-sm font-medium text-gray-700">
          {label}
        </label>
        <input
          id="propertyAddress"
          name="propertyAddress"
          ref={inputRef}
          autoComplete="off"
          required
          disabled={!hasApiKey}
          className="text-black rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:bg-gray-100 disabled:text-gray-400"
        />
        {!hasApiKey && <p className="text-sm text-amber-600">{missingKeyLabel}</p>}
      </div>

      {address && (
        <input type="hidden" name="street" value={address.formattedAddress} readOnly />
      )}
      {address && <input type="hidden" name="postalCode" value={address.postalCode} readOnly />}
      {address && <input type="hidden" name="city" value={address.city} readOnly />}
      {address && <input type="hidden" name="province" value={address.province} readOnly />}
      {address && <input type="hidden" name="country" value={address.country} readOnly />}
      {address && <input type="hidden" name="latitude" value={address.lat} readOnly />}
      {address && <input type="hidden" name="longitude" value={address.lng} readOnly />}

      {address && (
        <div className="flex flex-col gap-3 rounded-lg border border-gray-200 p-3">
          <div ref={mapRef} className="h-56 w-full rounded-lg bg-gray-100" />
          <p className="text-sm text-gray-600">{address.formattedAddress}</p>
          {confirmed ? (
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-green-600">{confirmedLabel}</span>
              <button
                type="button"
                onClick={handleEdit}
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                {editLabel}
              </button>
            </div>
          ) : (
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setConfirmed(true)}
                className="rounded-lg bg-blue-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
              >
                {confirmLabel}
              </button>
              <button
                type="button"
                onClick={handleEdit}
                className="text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                {editLabel}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
