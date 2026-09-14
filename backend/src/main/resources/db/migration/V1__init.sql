create table installation (
    id bigint primary key,
    completed boolean not null default false,
    completed_at timestamp
);

create table admin_account (
    id bigint primary key,
    email varchar(255),
    password_hash varchar(255),
    first_name varchar(255),
    last_name varchar(255),
    interface_language varchar(255),
    timezone varchar(255)
);

create table property (
    id bigint primary key,
    commercial_name varchar(255),
    type varchar(255),
    star_rating integer,
    short_description varchar(255),
    long_description text,
    street varchar(255),
    postal_code varchar(255),
    city varchar(255),
    province varchar(255),
    country varchar(255),
    latitude numeric(10, 6),
    longitude numeric(10, 6),
    phone varchar(255),
    public_email varchar(255),
    existing_website varchar(255)
);

create table fiscal_data (
    id bigint primary key,
    company_name varchar(255),
    vat_number varchar(255),
    tax_code varchar(255),
    legal_address varchar(255),
    vat_regime varchar(255),
    accommodation_vat_rate varchar(255),
    sdi_or_pec varchar(255),
    cin varchar(255),
    cir varchar(255),
    istat_code varchar(255),
    alloggiati_username varchar(255),
    alloggiati_password varchar(255),
    alloggiati_ws_key varchar(255),
    tourist_tax_active boolean not null default false,
    tourist_tax_amount numeric(10, 2),
    tourist_tax_max_nights integer,
    tourist_tax_exemption_age integer,
    tourist_tax_exemptions text
);

create table room_type (
    id uuid primary key,
    name varchar(255),
    description text,
    standard_occupancy integer,
    max_occupancy integer,
    bed_count integer,
    surface_sqm integer
);

create table room_type_amenity (
    room_type_id uuid not null references room_type (id) on delete cascade,
    amenity varchar(255)
);

create table room_unit (
    id uuid primary key,
    number_or_name varchar(255),
    floor varchar(255),
    room_type_id uuid references room_type (id) on delete set null,
    internal_notes text,
    active boolean not null default true
);

create table rate (
    room_type_id uuid primary key references room_type (id) on delete cascade,
    base_price numeric(10, 2),
    currency varchar(10),
    extra_guest_price numeric(10, 2),
    min_stay_nights integer,
    breakfast_included boolean not null default false,
    breakfast_price numeric(10, 2)
);

create table policy (
    id bigint primary key,
    check_in_from time,
    check_in_to time,
    check_out_by time,
    cancellation_policy varchar(255),
    free_cancellation_days integer,
    penalty_percentage numeric(5, 2),
    deposit_required boolean not null default false,
    deposit_percentage numeric(5, 2),
    pets_allowed boolean not null default false,
    smoking_allowed boolean not null default false,
    min_check_in_age integer,
    terms_text text
);

create table payments_config (
    id bigint primary key,
    mode varchar(255),
    stripe_publishable_key varchar(255),
    stripe_secret_key varchar(255),
    stripe_webhook_secret varchar(255),
    bank_transfer_accepted boolean not null default false,
    iban varchar(255),
    account_holder varchar(255),
    pay_at_property boolean not null default false
);

create table email_config (
    id bigint primary key,
    smtp_host varchar(255),
    smtp_port integer,
    smtp_user varchar(255),
    smtp_password varchar(255),
    tls boolean not null default false,
    sender_address varchar(255),
    sender_name varchar(255),
    internal_notifications_email varchar(255),
    signature text
);

create table appearance_config (
    id bigint primary key,
    logo_url varchar(255),
    favicon_url varchar(255),
    hero_image_url varchar(255),
    primary_color varchar(20),
    secondary_color varchar(20),
    hero_title varchar(255),
    hero_subtitle varchar(255),
    facebook varchar(255),
    instagram varchar(255),
    twitter varchar(255),
    analytics_code varchar(255),
    cookie_banner_text text
);

create table appearance_active_language (
    appearance_id bigint not null references appearance_config (id) on delete cascade,
    language varchar(10)
);
