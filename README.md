# HalalBites HK

HalalBites HK is a lightweight, browser-based halal food discovery app for
Hong Kong. It helps people find restaurants by craving, budget, region, or
neighborhood, then provides restaurant details and a direct Google Maps link.

The project is intentionally simple: there is no build system, package
manager, backend, or database. The interface is rendered with HTML, CSS, and
vanilla JavaScript, and the restaurant catalog is stored as static data.

## Features

- Browse a catalog of **199 restaurants** across Hong Kong.
- Search by restaurant name, cuisine, menu highlight, or food craving.
- Use relaxed semantic search for related terms such as:
  - `shawarma`, `doner`, and `kebab`
  - `curry`, `biryani`, and `tandoori`
  - `dumpling`, `dim sum`, and `Chinese`
  - `burger`, `fried chicken`, and `wings`
- Filter by craving category:
  - Kebabs & Shawarma
  - Dim Sum & Chinese
  - Curries & Biryani
  - Noodles & Soups
  - Burgers & Chicken
  - Hot Pot
  - Middle Eastern
  - Pizza & Steaks
  - Southeast Asian
- Filter by budget:
  - Up to HK$80
  - Up to HK$150
  - Up to HK$300
  - HK$500 and above
- Filter by Hong Kong Island, Kowloon, or New Territories and Outlying
  Islands.
- Filter by a specific neighborhood.
- Open a restaurant detail modal with address, phone number, cuisine, halal
  classification, price information, menu highlights, and certificate expiry.
- Open the restaurant in Google Maps.
- Use **Surprise Me** to choose a restaurant from the current result set.
- Read the in-app halal classification guide.
- Toggle between light and dark themes.
- Persist the theme preference in `localStorage`.
- Use responsive layouts on mobile and desktop screens.

## Quick start

### Requirements

- A modern web browser.
- Optional: a local static HTTP server for development.

No `npm install`, build command, or environment variables are required.

### Run locally

From the repository root, start any static file server. For example, with
Python 3:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000> in a browser.

The app also includes a fallback that can load `data/restaurants.json`, but
serving the project over HTTP is recommended because browsers may restrict
local-file requests and because it matches normal deployment behavior.

### Deploy

This is a static site. The repository can be deployed to any host that serves
HTML, CSS, JavaScript, and JSON files, including GitHub Pages, Netlify,
Vercel static hosting, or an ordinary web server.

Publish the repository root as the site root so that these relative paths
remain valid:

```text
index.html
app.js
styles.css
data/restaurants.js
data/restaurants.json
```

## How the app works

1. [`index.html`](./index.html) defines the page structure, controls, result
   grid, and modal containers.
2. [`data/restaurants.js`](./data/restaurants.js) is loaded first and exposes
   the catalog as `window.RESTAURANTS_DATA`.
3. [`app.js`](./app.js) initializes the UI after the DOM is ready.
4. The app uses the JavaScript data global when it is available. If it is not
   available, it attempts to load [`data/restaurants.json`](./data/restaurants.json)
   with `fetch`.
5. Filters are combined in the browser and the results grid is re-rendered
   without a server request.
6. Restaurant images are selected from Unsplash URLs using craving/cuisine
   mappings in `app.js`; they are not stored in the restaurant records.

The page uses Tailwind CSS from the browser CDN and Plus Jakarta Sans from
Google Fonts. The project-specific styles and transitions are in
[`styles.css`](./styles.css).

## Project structure

```text
.
├── index.html                 # Page markup and Tailwind configuration
├── app.js                    # State, filtering, rendering, and interactions
├── styles.css                # Custom theme, animations, and component styles
├── data/
│   ├── restaurants.js        # Browser-ready catalog: window.RESTAURANTS_DATA
│   └── restaurants.json      # JSON version of the catalog
└── scripts/
    └── clean_data.py         # CSV-to-catalog transformation script
```

## Search and filtering behavior

The app applies filters in this order:

1. Selected craving category.
2. Region segment.
3. Location dropdown (region or neighborhood).
4. Budget.
5. Text and semantic search.

Search is case-insensitive. It checks restaurant names, cuisine text, menu
highlights, and related cuisine concepts. A small fuzzy-match helper also
allows minor spelling differences.

The **Find Food** button scrolls to the results section; search and filter
controls update results immediately as they change. If no restaurant matches,
the empty state provides a reset action.

## Data format

Each restaurant record in `restaurants.json` contains fields similar to:

```json
{
  "id": 1,
  "name": "27 Kebab House - Central",
  "address": "Shop D - E, 27 Hollywood Road, Central.",
  "area": "Central",
  "region": "Hong Kong Island",
  "cuisine": "Turkish, Indian & Italian",
  "phone": "2795 2727",
  "halalType": "HK",
  "halalLabel": "Halal Certified Kitchen",
  "halalDescription": "Kitchen has full certified Halal segregation & certification.",
  "certExpiry": "24/Jan/27",
  "gmapsUrl": "https://www.google.com/maps/search/...",
  "priceRangeText": "HK$51–100",
  "minPrice": 51,
  "maxPrice": 100,
  "priceTier": "$",
  "priceTierLabel": "Budget (< HK$100)",
  "currency": "HKD",
  "menuHighlights": ["Chicken Doner", "Mixed Kebab"],
  "evidenceStatus": "Verified via Research",
  "cravings": ["Curries & Biryani", "Kebabs & Wraps"]
}
```

### Halal codes

The current catalog uses these codes:

| Code | Meaning |
| --- | --- |
| `HK` | Halal-certified kitchen with segregated preparation and certification |
| `H` | Halal-certified restaurant |
| `HF` | Halal-friendly restaurant or restaurant with halal options/counters |

These labels are displayed in the detail modal and explained in the Halal
Guide. Users should still confirm current certification and availability with
the restaurant before visiting.

## Updating restaurant data

The source data is embedded as CSV text in
[`scripts/clean_data.py`](./scripts/clean_data.py). The script:

- Parses restaurant names, addresses, contact details, prices, and evidence.
- Maps neighborhoods to Hong Kong regions.
- Derives craving tags from names, cuisines, and menu highlights.
- Converts halal codes into display labels and descriptions.
- Calculates price tiers.
- Writes both JSON and browser-ready JavaScript output.

Run it with:

```bash
python3 scripts/clean_data.py
```

### Important regeneration note

The script currently writes generated files to a hard-coded directory:

```text
/Users/abbad/.gemini/antigravity/scratch/halal-craving-finder/data
```

That path is specific to the original development environment and may not be
the current checkout. After running the script, verify that the generated
files were written to this repository's `data/` directory, or update the
`out_dir` value in `clean_data.py` to a repository-relative path before
regenerating. Keep [`restaurants.json`](./data/restaurants.json) and
[`restaurants.js`](./data/restaurants.js) synchronized because the browser
loads the JavaScript version first.

When adding or changing records, check:

- `id` values are unique.
- `region` matches the `area`.
- `minPrice` and `maxPrice` are numeric.
- `menuHighlights` and `cravings` are arrays.
- `gmapsUrl` points to the intended location.
- Certificate dates and evidence status are current.

## Development notes

- The application uses an immediately invoked function expression in
  `app.js`, so implementation details remain private to the script.
- UI state is kept in memory in the `state` object.
- Theme state is stored under the `halalbites_theme` local-storage key.
- Restaurant detail, random-selection, and halal-guide dialogs close through
  their close buttons, backdrop clicks, or the `Escape` key.
- Restaurant content is escaped before it is inserted into generated card and
  modal HTML.
- The site depends on third-party CDN resources for Tailwind, Google Fonts,
  and Unsplash images. Offline use may have reduced styling or missing
  restaurant imagery.

## Validation checklist

Because there is no automated test suite or build pipeline, use this manual
checklist after making changes:

1. Start a local HTTP server.
2. Confirm the restaurant count and initial cards render.
3. Try a craving chip, region filter, neighborhood filter, and each budget
   option.
4. Search for both an exact restaurant name and a related term such as
   `shawarma` or `biryani`.
5. Open a detail modal and verify the Google Maps link.
6. Test **Surprise Me**, the Halal Guide, reset behavior, and `Escape`.
7. Toggle the theme, reload the page, and confirm the preference persists.
8. Check the layout at a narrow mobile viewport and a desktop viewport.

## Data and content disclaimer

Restaurant hours, menus, prices, certification status, certificate expiry
dates, and locations can change. This project is a discovery aid, not a
replacement for checking with the restaurant or certification authority.
Always verify current halal status, menu availability, opening hours, and
pricing before traveling.

## License

No license file is currently included in this repository. Treat the project
and its data as all-rights-reserved unless the project owner adds explicit
licensing terms.
