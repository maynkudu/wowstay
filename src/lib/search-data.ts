export interface SearchSuggestion {
  id: string
  type: "destination"
  title: string
  subtitle: string
  country: string
  image?: string
}

export const destinations: SearchSuggestion[] = [
  // A
  {
    id: "amsterdam",
    type: "destination",
    title: "Amsterdam",
    subtitle: "Canals and historic architecture",
    country: "Netherlands",
  },
  { id: "athens", type: "destination", title: "Athens", subtitle: "Ancient history and culture", country: "Greece" },
  { id: "aspen", type: "destination", title: "Aspen", subtitle: "Luxury ski resort town", country: "USA" },
  {
    id: "auckland",
    type: "destination",
    title: "Auckland",
    subtitle: "Harbor city and sailing",
    country: "New Zealand",
  },

  // B
  {
    id: "bali",
    type: "destination",
    title: "Bali",
    subtitle: "Tropical paradise with beautiful beaches",
    country: "Indonesia",
  },
  {
    id: "barcelona",
    type: "destination",
    title: "Barcelona",
    subtitle: "Art, architecture, and beaches",
    country: "Spain",
  },
  {
    id: "bangkok",
    type: "destination",
    title: "Bangkok",
    subtitle: "Vibrant street life and temples",
    country: "Thailand",
  },
  { id: "berlin", type: "destination", title: "Berlin", subtitle: "History and modern culture", country: "Germany" },
  { id: "boston", type: "destination", title: "Boston", subtitle: "Historic American city", country: "USA" },

  // C
  { id: "cairo", type: "destination", title: "Cairo", subtitle: "Ancient pyramids and history", country: "Egypt" },
  {
    id: "cape-town",
    type: "destination",
    title: "Cape Town",
    subtitle: "Mountains meet the ocean",
    country: "South Africa",
  },
  {
    id: "chicago",
    type: "destination",
    title: "Chicago",
    subtitle: "Architecture and deep-dish pizza",
    country: "USA",
  },
  {
    id: "copenhagen",
    type: "destination",
    title: "Copenhagen",
    subtitle: "Danish design and hygge",
    country: "Denmark",
  },

  // D
  {
    id: "dubai",
    type: "destination",
    title: "Dubai",
    subtitle: "Luxury shopping and modern architecture",
    country: "UAE",
  },
  {
    id: "dublin",
    type: "destination",
    title: "Dublin",
    subtitle: "Irish culture and friendly pubs",
    country: "Ireland",
  },

  // F
  {
    id: "florence",
    type: "destination",
    title: "Florence",
    subtitle: "Renaissance art and architecture",
    country: "Italy",
  },

  // L
  {
    id: "london",
    type: "destination",
    title: "London",
    subtitle: "Historic landmarks and royal palaces",
    country: "UK",
  },
  {
    id: "los-angeles",
    type: "destination",
    title: "Los Angeles",
    subtitle: "Hollywood and sunny beaches",
    country: "USA",
  },
  { id: "lisbon", type: "destination", title: "Lisbon", subtitle: "Colorful tiles and trams", country: "Portugal" },

  // M
  { id: "maldives", type: "destination", title: "Maldives", subtitle: "Luxury overwater villas", country: "Maldives" },
  { id: "madrid", type: "destination", title: "Madrid", subtitle: "Art museums and tapas", country: "Spain" },
  { id: "miami", type: "destination", title: "Miami", subtitle: "Art deco and beach vibes", country: "USA" },

  // N
  { id: "new-york", type: "destination", title: "New York", subtitle: "The city that never sleeps", country: "USA" },
  { id: "nice", type: "destination", title: "Nice", subtitle: "French Riviera glamour", country: "France" },

  // P
  { id: "paris", type: "destination", title: "Paris", subtitle: "City of lights and romance", country: "France" },
  {
    id: "prague",
    type: "destination",
    title: "Prague",
    subtitle: "Medieval charm and beer",
    country: "Czech Republic",
  },
  { id: "phuket", type: "destination", title: "Phuket", subtitle: "Thai beaches and culture", country: "Thailand" },

  // R
  { id: "rome", type: "destination", title: "Rome", subtitle: "Ancient history and pasta", country: "Italy" },
  {
    id: "rio",
    type: "destination",
    title: "Rio de Janeiro",
    subtitle: "Beaches and carnival spirit",
    country: "Brazil",
  },

  // S
  {
    id: "santorini",
    type: "destination",
    title: "Santorini",
    subtitle: "Stunning sunsets and white buildings",
    country: "Greece",
  },
  { id: "singapore", type: "destination", title: "Singapore", subtitle: "Modern city-state", country: "Singapore" },
  { id: "sydney", type: "destination", title: "Sydney", subtitle: "Opera house and harbor", country: "Australia" },

  // T
  {
    id: "tokyo",
    type: "destination",
    title: "Tokyo",
    subtitle: "Modern metropolis with rich culture",
    country: "Japan",
  },
  { id: "toronto", type: "destination", title: "Toronto", subtitle: "Multicultural Canadian city", country: "Canada" },

  // V
  { id: "venice", type: "destination", title: "Venice", subtitle: "Canals and romantic gondolas", country: "Italy" },
  { id: "vienna", type: "destination", title: "Vienna", subtitle: "Imperial palaces and coffee", country: "Austria" },
]

export function getDestinationSuggestions(query: string): SearchSuggestion[] {
  if (!query || query.length < 1) return []

  const filtered = destinations.filter(
    (destination) =>
      destination.title.toLowerCase().startsWith(query.toLowerCase()) ||
      destination.country.toLowerCase().startsWith(query.toLowerCase()),
  )

  return filtered.slice(0, 5) // Limit to 5 suggestions
}

export const budgetOptions = [
  { id: "budget", label: "Budget", range: "Under $100", min: 0, max: 100 },
  { id: "mid-range", label: "Mid-range", range: "$100 - $250", min: 100, max: 250 },
  { id: "luxury", label: "Luxury", range: "$250 - $500", min: 250, max: 500 },
  { id: "ultra-luxury", label: "Ultra Luxury", range: "$500+", min: 500, max: 1000 },
]
