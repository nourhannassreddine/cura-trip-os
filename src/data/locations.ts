/* ------------------------------------------------------------------
   CURA — Global locations + passports.
   Used by Onboarding for free-text city input (datalist hints) and
   searchable passport dropdowns. Lists are intentionally broad so
   no traveler is excluded.
------------------------------------------------------------------ */

// A wide, non-exhaustive set of global cities (~150) used as datalist hints.
// Free text is allowed — anything the user types is accepted and later
// resolved against Google Maps.
export const worldCities: string[] = [
  // Africa
  "Lagos", "Abuja", "Accra", "Nairobi", "Mombasa", "Addis Ababa", "Kampala",
  "Kigali", "Dar es Salaam", "Cairo", "Alexandria", "Casablanca", "Marrakech",
  "Rabat", "Tunis", "Algiers", "Dakar", "Abidjan", "Cape Town", "Johannesburg",
  "Durban", "Luanda", "Maputo", "Khartoum",
  // Middle East
  "Dubai", "Abu Dhabi", "Doha", "Riyadh", "Jeddah", "Kuwait City", "Muscat",
  "Manama", "Tel Aviv", "Jerusalem", "Amman", "Beirut", "Istanbul", "Ankara",
  "Tehran",
  // Europe
  "London", "Manchester", "Edinburgh", "Dublin", "Paris", "Lyon", "Marseille",
  "Nice", "Lisbon", "Porto", "Madrid", "Barcelona", "Seville", "Valencia",
  "Rome", "Milan", "Florence", "Venice", "Naples", "Bologna", "Turin",
  "Berlin", "Munich", "Hamburg", "Frankfurt", "Cologne", "Amsterdam",
  "Rotterdam", "Brussels", "Antwerp", "Vienna", "Salzburg", "Zurich", "Geneva",
  "Bern", "Copenhagen", "Stockholm", "Oslo", "Helsinki", "Reykjavik", "Prague",
  "Budapest", "Warsaw", "Krakow", "Bucharest", "Sofia", "Athens", "Thessaloniki",
  "Belgrade", "Zagreb", "Ljubljana", "Tallinn", "Riga", "Vilnius", "Moscow",
  "Saint Petersburg", "Kyiv",
  // Asia
  "Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", "Hyderabad", "Goa",
  "Karachi", "Lahore", "Islamabad", "Dhaka", "Colombo", "Kathmandu",
  "Singapore", "Kuala Lumpur", "Bangkok", "Chiang Mai", "Phuket",
  "Ho Chi Minh City", "Hanoi", "Jakarta", "Bali", "Manila", "Hong Kong",
  "Taipei", "Tokyo", "Osaka", "Kyoto", "Seoul", "Busan", "Beijing", "Shanghai",
  "Shenzhen", "Guangzhou",
  // Oceania
  "Sydney", "Melbourne", "Brisbane", "Perth", "Auckland", "Wellington",
  // North America
  "New York", "Boston", "Washington DC", "Miami", "Atlanta", "Chicago",
  "Los Angeles", "San Francisco", "Seattle", "Las Vegas", "Houston", "Dallas",
  "Toronto", "Vancouver", "Montreal", "Mexico City", "Guadalajara", "Cancún",
  // Caribbean
  "Havana", "San Juan", "Kingston", "Nassau", "Bridgetown",
  // South America
  "São Paulo", "Rio de Janeiro", "Salvador", "Brasília", "Buenos Aires",
  "Córdoba", "Santiago", "Lima", "Cusco", "Bogotá", "Cartagena", "Quito",
  "Caracas", "Montevideo",
];

/* All sovereign nations (and a few common dependencies) — used to derive
   nationality/passport. Ordered alphabetically. */
export const passportNationalities: string[] = [
  "Afghan", "Albanian", "Algerian", "American", "Andorran", "Angolan",
  "Antiguan", "Argentine", "Armenian", "Australian", "Austrian", "Azerbaijani",
  "Bahamian", "Bahraini", "Bangladeshi", "Barbadian", "Belarusian", "Belgian",
  "Belizean", "Beninese", "Bhutanese", "Bolivian", "Bosnian", "Botswanan",
  "Brazilian", "British", "Bruneian", "Bulgarian", "Burkinabé", "Burundian",
  "Cambodian", "Cameroonian", "Canadian", "Cape Verdean", "Central African",
  "Chadian", "Chilean", "Chinese", "Colombian", "Comoran", "Congolese",
  "Costa Rican", "Croatian", "Cuban", "Cypriot", "Czech", "Danish", "Djiboutian",
  "Dominican", "Dutch", "East Timorese", "Ecuadorian", "Egyptian", "Salvadoran",
  "Equatorial Guinean", "Eritrean", "Estonian", "Eswatini", "Ethiopian",
  "Fijian", "Finnish", "French", "Gabonese", "Gambian", "Georgian", "German",
  "Ghanaian", "Greek", "Grenadian", "Guatemalan", "Guinean", "Guinea-Bissauan",
  "Guyanese", "Haitian", "Honduran", "Hungarian", "Icelandic", "Indian",
  "Indonesian", "Iranian", "Iraqi", "Irish", "Israeli", "Italian", "Ivorian",
  "Jamaican", "Japanese", "Jordanian", "Kazakhstani", "Kenyan", "Kiribati",
  "Kosovar", "Kuwaiti", "Kyrgyz", "Laotian", "Latvian", "Lebanese", "Basotho",
  "Liberian", "Libyan", "Liechtensteiner", "Lithuanian", "Luxembourgish",
  "Malagasy", "Malawian", "Malaysian", "Maldivian", "Malian", "Maltese",
  "Marshallese", "Mauritanian", "Mauritian", "Mexican", "Micronesian",
  "Moldovan", "Monégasque", "Mongolian", "Montenegrin", "Moroccan",
  "Mozambican", "Burmese", "Namibian", "Nauruan", "Nepalese", "New Zealander",
  "Nicaraguan", "Nigerien", "Nigerian", "North Korean", "North Macedonian",
  "Norwegian", "Omani", "Pakistani", "Palauan", "Palestinian", "Panamanian",
  "Papua New Guinean", "Paraguayan", "Peruvian", "Filipino", "Polish",
  "Portuguese", "Qatari", "Romanian", "Russian", "Rwandan", "Kittitian",
  "Saint Lucian", "Vincentian", "Samoan", "San Marinese", "São Toméan",
  "Saudi Arabian", "Scottish", "Senegalese", "Serbian", "Seychellois",
  "Sierra Leonean", "Singaporean", "Slovak", "Slovenian", "Solomon Islander",
  "Somali", "South African", "South Korean", "South Sudanese", "Spanish",
  "Sri Lankan", "Sudanese", "Surinamese", "Swedish", "Swiss", "Syrian",
  "Taiwanese", "Tajik", "Tanzanian", "Thai", "Togolese", "Tongan",
  "Trinidadian", "Tunisian", "Turkish", "Turkmen", "Tuvaluan", "Ugandan",
  "Ukrainian", "Emirati", "Uruguayan", "Uzbek", "Ni-Vanuatu", "Vatican",
  "Venezuelan", "Vietnamese", "Welsh", "Yemeni", "Zambian", "Zimbabwean",
];
