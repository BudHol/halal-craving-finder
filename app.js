// HalalBites HK - Clean Minimalist Food Discovery Engine

(function () {
  'use strict';

  // Craving category configuration matching screenshot
  const CRAVING_DEFINITIONS = [
    { id: 'all', label: 'All Cravings', icon: '🍴' },
    { id: 'Kebabs & Wraps', label: 'Kebabs & Shawarma', icon: '🌯' },
    { id: 'Dim Sum & Chinese', label: 'Dim Sum & Chinese', icon: '🥟' },
    { id: 'Curries & Biryani', label: 'Curries & Biryani', icon: '🍛' },
    { id: 'Noodles & Soups', label: 'Noodles & Soups', icon: '🍜' },
    { id: 'Crispy Chicken & Burgers', label: 'Burgers & Chicken', icon: '🍗' },
    { id: 'Hot Pot', label: 'Hot Pot', icon: '🍲' },
    { id: 'Middle Eastern & Mezze', label: 'Middle Eastern', icon: '🫓' },
    { id: 'Pizza, Pasta & Steaks', label: 'Pizza & Steaks', icon: '🍕' },
    { id: 'Asian & Southeast Asian', label: 'Southeast Asian', icon: '🥢' },
  ];

  // Curated High-Resolution Food Photography Mappings
  const CUISINE_IMAGE_MAP = {
    'Kebabs & Wraps': 'https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&w=800&q=80',
    'Dim Sum & Chinese': 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=800&q=80',
    'Curries & Biryani': 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80',
    'Noodles & Soups': 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80',
    'Crispy Chicken & Burgers': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    'Hot Pot': 'https://images.unsplash.com/photo-1547928576-a4a33237cbc3?auto=format&fit=crop&w=800&q=80',
    'Pizza, Pasta & Steaks': 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    'Middle Eastern & Mezze': 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=800&q=80',
    'Asian & Southeast Asian': 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=800&q=80',
    'Bakery, Coffee & Desserts': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    'Hotel & Buffets': 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    'Vegetarian & Vegan': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80'
  };

  // Specific restaurant custom hero photo overrides
  const RESTAURANT_CUSTOM_IMAGES = {
    '27 Kebab House - Central': 'https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&w=800&q=80',
    'Islamic Centre Canteen': 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=800&q=80',
    'Bombay Dreams': 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80',
    "Yaqut's Lanzhou Hand-Pulled Beef Noodles": 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80'
  };

  function getRestaurantImage(r) {
    if (RESTAURANT_CUSTOM_IMAGES[r.name]) {
      return RESTAURANT_CUSTOM_IMAGES[r.name];
    }
    if (r.cravings && r.cravings.length > 0) {
      for (const c of r.cravings) {
        if (CUISINE_IMAGE_MAP[c]) return CUISINE_IMAGE_MAP[c];
      }
    }
    const cLower = (r.cuisine || '').toLowerCase();
    if (cLower.includes('kebab') || cLower.includes('turkish') || cLower.includes('middle eastern')) return CUISINE_IMAGE_MAP['Kebabs & Wraps'];
    if (cLower.includes('dim sum') || cLower.includes('chinese') || cLower.includes('cantonese')) return CUISINE_IMAGE_MAP['Dim Sum & Chinese'];
    if (cLower.includes('indian') || cLower.includes('curry') || cLower.includes('pakistani') || cLower.includes('biryani')) return CUISINE_IMAGE_MAP['Curries & Biryani'];
    if (cLower.includes('noodle') || cLower.includes('lanzhou') || cLower.includes('ramen')) return CUISINE_IMAGE_MAP['Noodles & Soups'];
    if (cLower.includes('fast food') || cLower.includes('burger') || cLower.includes('chicken')) return CUISINE_IMAGE_MAP['Crispy Chicken & Burgers'];
    if (cLower.includes('steak') || cLower.includes('pizza') || cLower.includes('italian')) return CUISINE_IMAGE_MAP['Pizza, Pasta & Steaks'];
    if (cLower.includes('thai') || cLower.includes('indonesian') || cLower.includes('singaporean')) return CUISINE_IMAGE_MAP['Asian & Southeast Asian'];
    if (cLower.includes('buffet') || cLower.includes('hotel')) return CUISINE_IMAGE_MAP['Hotel & Buffets'];
    if (cLower.includes('bakery') || cLower.includes('coffee') || cLower.includes('dessert')) return CUISINE_IMAGE_MAP['Bakery, Coffee & Desserts'];
    
    return 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80';
  }

  // Food Knowledge Graph for smart relaxed search (e.g. shawarma -> Turkish/Lebanese kebabs)
  const FOOD_SEMANTIC_GRAPH = [
    {
      keywords: ['shawarma', 'shwarma', 'doner', 'kebab', 'kebabs', 'kebap', 'gyros', 'falafel', 'wrap', 'tagine', 'hummus', 'mezze'],
      cuisines: ['turkish', 'middle eastern', 'lebanese', 'egyptian', 'moroccan', 'arabic', 'persian']
    },
    {
      keywords: ['dim sum', 'dimsum', 'dumpling', 'dumplings', 'bao', 'steamed bun', 'peking duck', 'char siu', 'cantonese', 'chinese', 'chinese halal'],
      cuisines: ['chinese', 'dim sum', 'cantonese', 'chinese halal']
    },
    {
      keywords: ['curry', 'curries', 'biryani', 'biriyani', 'tandoori', 'naan', 'tikka', 'butter chicken', 'rogan josh', 'paneer', 'makhani', 'thali', 'dosa', 'samosa', 'indian', 'pakistani', 'nepalese'],
      cuisines: ['indian', 'south indian', 'modern indian', 'pakistani', 'bangladeshi', 'south asian']
    },
    {
      keywords: ['noodle', 'noodles', 'lanzhou', 'hand-pulled', 'ramen', 'pho', 'beef noodle', 'beef soup', 'chow mein', 'laksa'],
      cuisines: ['lanzhou noodles', 'lan zhou noodles', 'noodle shop', 'singaporean']
    },
    {
      keywords: ['burger', 'burgers', 'cheeseburger', 'fried chicken', 'crispy chicken', 'wings', 'nuggets', 'fries', 'chips', 'fast food'],
      cuisines: ['fast food', 'american fast food', 'american burger']
    },
    {
      keywords: ['hot pot', 'hotpot', 'mutton hot pot', 'shabu'],
      cuisines: ['hot pot']
    },
    {
      keywords: ['steak', 'steaks', 'tomahawk', 'dry aged', 'grill', 'bbq', 'pizza', 'pasta', 'italian'],
      cuisines: ['italian', 'international', 'mediterranean', 'steak']
    },
    {
      keywords: ['taco', 'tacos', 'quesadilla', 'burrito', 'mexican'],
      cuisines: ['egyptian', 'middle eastern', 'international']
    },
    {
      keywords: ['thai', 'pad thai', 'tom yum', 'green curry', 'satay', 'nasi lemak', 'indonesian', 'rendang'],
      cuisines: ['thai', 'indonesian', 'southeast asian']
    }
  ];

  // Levenshtein fuzzy distance
  function isFuzzyMatch(word, target, maxDistance = 2) {
    word = word.toLowerCase();
    target = target.toLowerCase();
    if (target.includes(word) || word.includes(target)) return true;
    if (Math.abs(word.length - target.length) > maxDistance) return false;
    
    let a = word, b = target;
    const matrix = [];
    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1);
        }
      }
    }
    return matrix[b.length][a.length] <= maxDistance;
  }

  // App State
  const state = {
    restaurants: [],
    selectedCraving: 'all',
    selectedRegion: 'all', // 'all', 'Hong Kong Island', 'Kowloon', 'New Territories & Outlying Islands'
    selectedLocation: 'all', // Specific area or region
    selectedBudget: 'all', // 'all', 'under80', 'under150', 'under300', '500plus'
    searchQuery: '',
    darkMode: false,
    filteredResults: []
  };

  let dom = {};

  function init() {
    cacheDom();
    loadLocalStorage();
    initTheme();
    loadRestaurants();
    setupEventListeners();
  }

  function cacheDom() {
    dom = {
      themeToggle: document.getElementById('themeToggle'),
      restaurantsCount: document.getElementById('restaurantsCount'),
      cravingsContainer: document.getElementById('cravingsContainer'),
      searchInput: document.getElementById('searchInput'),
      clearSearchBtn: document.getElementById('clearSearchBtn'),
      budgetSelect: document.getElementById('budgetSelect'),
      locationSelect: document.getElementById('locationSelect'),
      searchActionBtn: document.getElementById('searchActionBtn'),
      
      regionSegments: document.getElementById('regionSegments'),
      resultsSubtitle: document.getElementById('resultsSubtitle'),
      gridContainer: document.getElementById('restaurantsGrid'),
      emptyState: document.getElementById('emptyState'),
      emptyStateResetBtn: document.getElementById('emptyStateResetBtn'),
      
      detailModal: document.getElementById('detailModal'),
      detailModalContent: document.getElementById('detailModalContent'),
      closeDetailModalBtn: document.getElementById('closeDetailModalBtn'),
      
      randomModal: document.getElementById('randomModal'),
      randomModalCard: document.getElementById('randomModalCard'),
      randomModalSpinBtn: document.getElementById('randomModalSpinBtn'),
      closeRandomModalBtn: document.getElementById('closeRandomModalBtn'),
      surpriseMeBtn: document.getElementById('surpriseMeBtn'),

      halalGuideModal: document.getElementById('halalGuideModal'),
      halalGuideBtn: document.getElementById('halalGuideBtn'),
      closeHalalGuideBtn: document.getElementById('closeHalalGuideBtn')
    };
  }

  function loadLocalStorage() {
    try {
      const savedTheme = localStorage.getItem('halalbites_theme');
      if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        state.darkMode = true;
      }
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }

  function initTheme() {
    if (state.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  function toggleTheme() {
    state.darkMode = !state.darkMode;
    if (state.darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('halalbites_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('halalbites_theme', 'light');
    }
  }

  function loadRestaurants() {
    if (window.RESTAURANTS_DATA && Array.isArray(window.RESTAURANTS_DATA)) {
      state.restaurants = window.RESTAURANTS_DATA;
      finishDataLoad();
    } else {
      fetch('data/restaurants.json')
        .then(res => res.json())
        .then(data => {
          state.restaurants = data;
          finishDataLoad();
        })
        .catch(err => {
          console.error('Error loading restaurants:', err);
        });
    }
  }

  function finishDataLoad() {
    if (dom.restaurantsCount) {
      dom.restaurantsCount.textContent = state.restaurants.length;
    }
    populateCravings();
    populateLocationDropdown();
    applyFilters();
  }

  // Populate Craving Chips Row
  function populateCravings() {
    if (!dom.cravingsContainer) return;
    dom.cravingsContainer.innerHTML = '';

    CRAVING_DEFINITIONS.forEach(craving => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.dataset.craving = craving.id;
      const isActive = state.selectedCraving === craving.id;

      chip.className = `craving-chip flex items-center gap-1.5 px-4 py-2 rounded-full border text-xs font-semibold flex-shrink-0 cursor-pointer ${
        isActive
          ? 'active bg-[#064e3b] text-white border-[#064e3b]'
          : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800 hover:border-gray-400'
      }`;

      chip.innerHTML = `<span>${craving.icon}</span><span>${craving.label}</span>`;

      chip.addEventListener('click', () => {
        if (state.selectedCraving === craving.id) {
          state.selectedCraving = 'all';
        } else {
          state.selectedCraving = craving.id;
        }
        updateCravingChipsUI();
        applyFilters();
      });

      dom.cravingsContainer.appendChild(chip);
    });
  }

  function updateCravingChipsUI() {
    if (!dom.cravingsContainer) return;
    const chips = dom.cravingsContainer.querySelectorAll('.craving-chip');
    chips.forEach(chip => {
      const cId = chip.dataset.craving;
      if (state.selectedCraving === cId) {
        chip.className = 'craving-chip active flex items-center gap-1.5 px-4 py-2 rounded-full border text-xs font-semibold flex-shrink-0 cursor-pointer bg-[#064e3b] text-white border-[#064e3b]';
      } else {
        chip.className = 'craving-chip flex items-center gap-1.5 px-4 py-2 rounded-full border text-xs font-semibold flex-shrink-0 cursor-pointer bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800 hover:border-gray-400';
      }
    });
  }

  // Populate Location Select with grouped neighborhoods
  function populateLocationDropdown() {
    if (!dom.locationSelect) return;
    const areas = Array.from(new Set(state.restaurants.map(r => r.area))).sort();
    
    const optgroup = document.createElement('optgroup');
    optgroup.label = '── Specific Neighborhoods ──';

    areas.forEach(area => {
      const count = state.restaurants.filter(r => r.area === area).length;
      const opt = document.createElement('option');
      opt.value = `area:${area}`;
      opt.textContent = `${area} (${count})`;
      optgroup.appendChild(opt);
    });

    dom.locationSelect.appendChild(optgroup);
  }

  // Filter Engine
  function applyFilters() {
    let results = state.restaurants.slice();
    const query = state.searchQuery.trim().toLowerCase();

    // 1. Craving category filter
    if (state.selectedCraving && state.selectedCraving !== 'all') {
      results = results.filter(r => r.cravings && r.cravings.includes(state.selectedCraving));
    }

    // 2. Region segment control filter (All, HK, KLN, NT)
    if (state.selectedRegion && state.selectedRegion !== 'all') {
      results = results.filter(r => r.region === state.selectedRegion);
    }

    // 3. Location Dropdown filter
    if (state.selectedLocation && state.selectedLocation !== 'all') {
      if (state.selectedLocation.startsWith('region:')) {
        const regionName = state.selectedLocation.replace('region:', '');
        results = results.filter(r => r.region === regionName);
      } else if (state.selectedLocation.startsWith('area:')) {
        const areaName = state.selectedLocation.replace('area:', '');
        results = results.filter(r => r.area === areaName);
      }
    }

    // 4. Budget filter
    if (state.selectedBudget === 'under80') {
      results = results.filter(r => r.minPrice <= 80);
    } else if (state.selectedBudget === 'under150') {
      results = results.filter(r => r.minPrice <= 150);
    } else if (state.selectedBudget === 'under300') {
      results = results.filter(r => r.minPrice <= 300);
    } else if (state.selectedBudget === '500plus') {
      results = results.filter(r => r.maxPrice >= 500 || r.minPrice >= 400);
    }

    // 5. Semantic & text search
    if (query) {
      const concepts = FOOD_SEMANTIC_GRAPH.filter(c => 
        c.keywords.some(k => query.includes(k) || k.includes(query) || isFuzzyMatch(query, k, 1))
      );

      results = results.filter(r => {
        const nameMatch = r.name.toLowerCase().includes(query);
        const cuisineMatch = r.cuisine.toLowerCase().includes(query);
        const areaMatch = r.area.toLowerCase().includes(query);
        const highlightMatch = r.menuHighlights && r.menuHighlights.some(h => h.toLowerCase().includes(query));
        const cravingMatch = r.cravings && r.cravings.some(c => c.toLowerCase().includes(query));

        let semanticMatch = false;
        if (concepts.length > 0) {
          semanticMatch = concepts.some(sc => 
            sc.cuisines.some(c => r.cuisine.toLowerCase().includes(c)) ||
            (r.menuHighlights && r.menuHighlights.some(h => sc.keywords.some(k => h.toLowerCase().includes(k))))
          );
        }

        return nameMatch || cuisineMatch || areaMatch || highlightMatch || cravingMatch || semanticMatch;
      });
    }

    state.filteredResults = results;
    renderResults();
  }

  function renderResults() {
    if (!dom.gridContainer) return;
    const results = state.filteredResults;

    if (dom.resultsSubtitle) {
      if (results.length === state.restaurants.length) {
        dom.resultsSubtitle.textContent = 'Curated selections for you';
      } else {
        dom.resultsSubtitle.textContent = `Showing ${results.length} matching spot${results.length === 1 ? '' : 's'}`;
      }
    }

    if (results.length === 0) {
      dom.gridContainer.innerHTML = '';
      if (dom.emptyState) dom.emptyState.classList.remove('hidden');
      return;
    }

    if (dom.emptyState) dom.emptyState.classList.add('hidden');

    dom.gridContainer.innerHTML = results.map(renderCard).join('');
    attachCardListeners();
  }

  function getHalalBadge(r) {
    if (r.halalType === 'H') {
      return `<span class="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/80">
        <span>🛡️ 100% Halal</span>
      </span>`;
    } else if (r.halalType === 'HK') {
      return `<span class="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/80">
        <span>🛡️ HK Halal Certified</span>
      </span>`;
    }
    return `<span class="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-teal-50 dark:bg-teal-950/70 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-800/80">
      <span>🛡️ Halal Friendly</span>
    </span>`;
  }

  function getSubtleTag(r) {
    if (r.priceTier === '$$$' || r.priceTier === '$$$$') {
      return `<span class="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">Premium</span>`;
    }
    if (r.halalType === 'H') {
      return `<span class="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300">⭐ Highly Rated</span>`;
    }
    return `<span class="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">Dine-in</span>`;
  }

  function renderCard(r) {
    const imageUrl = getRestaurantImage(r);
    const tier = r.priceTier || '$';

    return `
      <div class="restaurant-card bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md cursor-pointer flex flex-col justify-between" data-id="${r.id}">
        <div>
          <!-- Card Image Cover -->
          <div class="card-image-wrap relative">
            <img src="${imageUrl}" alt="${escapeHtml(r.name)}" loading="lazy">
          </div>

          <!-- Card Content Body -->
          <div class="p-5">
            <!-- Header Line: Name + Price Tier -->
            <div class="flex items-start justify-between gap-3 mb-1.5">
              <h3 class="text-base font-bold text-gray-900 dark:text-white leading-snug">
                ${escapeHtml(r.name)}
              </h3>
              <span class="px-2 py-0.5 rounded-lg text-xs font-bold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 flex-shrink-0">
                ${tier}
              </span>
            </div>

            <!-- Location & Cuisine Line -->
            <p class="text-xs text-gray-500 dark:text-gray-400 mb-3 truncate">
              <span>📍 ${escapeHtml(r.area)}</span>
              <span class="mx-1">•</span>
              <span>${escapeHtml(r.cuisine)}</span>
            </p>

            <!-- Badges -->
            <div class="flex flex-wrap items-center gap-1.5 pt-1">
              ${getHalalBadge(r)}
              ${getSubtleTag(r)}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function attachCardListeners() {
    document.querySelectorAll('.restaurant-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = parseInt(card.dataset.id, 10);
        openDetailModal(id);
      });
    });
  }

  // Modals
  function openDetailModal(id) {
    const r = state.restaurants.find(item => item.id === id);
    if (!r) return;

    const imageUrl = getRestaurantImage(r);
    const highlights = (r.menuHighlights && r.menuHighlights.length > 0)
      ? r.menuHighlights.map(h => `<span class="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">${escapeHtml(h)}</span>`).join(' ')
      : '<span class="text-xs text-gray-400 italic">Authentic Halal menu.</span>';

    dom.detailModalContent.innerHTML = `
      <div class="relative h-48 sm:h-60 overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img src="${imageUrl}" alt="${escapeHtml(r.name)}" class="w-full h-full object-cover">
      </div>
      
      <div class="p-6 space-y-4">
        <div>
          <div class="flex items-center gap-2 mb-1.5">
            <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
              📍 ${escapeHtml(r.area)} • ${escapeHtml(r.region)}
            </span>
            ${getHalalBadge(r)}
            <span class="text-xs font-bold px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">${r.priceTier} (${r.priceRangeText || `HK$${r.minPrice}–${r.maxPrice}`})</span>
          </div>
          <h2 class="text-2xl font-black text-gray-900 dark:text-white">${escapeHtml(r.name)}</h2>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1"><span class="font-semibold text-gray-700 dark:text-gray-300">Cuisine:</span> ${escapeHtml(r.cuisine)}</p>
        </div>

        <div class="p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 text-xs">
          <div class="font-bold text-emerald-900 dark:text-emerald-200">${escapeHtml(r.halalLabel)} (${r.halalType})</div>
          <div class="text-emerald-700 dark:text-emerald-400 mt-0.5">${escapeHtml(r.halalDescription)}</div>
          ${r.certExpiry && r.certExpiry !== 'N/A' ? `<div class="text-[11px] text-gray-500 dark:text-gray-400 mt-1">Certificate Valid Until: <strong>${escapeHtml(r.certExpiry)}</strong></div>` : ''}
        </div>

        <div>
          <div class="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Popular Dishes</div>
          <div class="flex flex-wrap gap-1.5">${highlights}</div>
        </div>

        <div class="pt-3 border-t border-gray-100 dark:border-gray-800 space-y-2 text-xs text-gray-700 dark:text-gray-300">
          <div class="flex items-start gap-2">
            <span class="font-semibold flex-shrink-0">Address:</span>
            <span>${escapeHtml(r.address)}</span>
          </div>
          ${r.phone ? `
            <div class="flex items-center gap-2">
              <span class="font-semibold">Phone:</span>
              <a href="tel:${r.phone.replace(/\s+/g, '')}" class="text-brand dark:text-emerald-400 hover:underline font-mono">${escapeHtml(r.phone)}</a>
            </div>
          ` : ''}
        </div>

        <div class="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center gap-3">
          <a href="${r.gmapsUrl}" target="_blank" rel="noopener noreferrer" class="flex-1 py-3 px-4 rounded-full bg-[#064e3b] text-white font-bold text-xs text-center hover:bg-[#047857] shadow flex items-center justify-center gap-1.5 transition-all">
            Open in Google Maps
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
          </a>
          ${r.phone ? `
            <a href="tel:${r.phone.replace(/\s+/g, '')}" class="py-3 px-5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-bold text-xs hover:bg-gray-200">
              Call
            </a>
          ` : ''}
        </div>
      </div>
    `;

    dom.detailModal.classList.remove('hidden');
    dom.detailModal.classList.add('flex');
    setTimeout(() => {
      dom.detailModal.querySelector('.modal-backdrop').classList.add('open');
      dom.detailModal.querySelector('.modal-content').classList.add('open');
    }, 10);
    document.body.style.overflow = 'hidden';
  }

  function closeDetailModal() {
    if (!dom.detailModal) return;
    dom.detailModal.querySelector('.modal-backdrop').classList.remove('open');
    dom.detailModal.querySelector('.modal-content').classList.remove('open');
    setTimeout(() => {
      dom.detailModal.classList.add('hidden');
      dom.detailModal.classList.remove('flex');
      document.body.style.overflow = '';
    }, 150);
  }

  // Randomizer Modal
  function openSurpriseModal() {
    const candidates = (state.filteredResults && state.filteredResults.length > 0)
      ? state.filteredResults
      : state.restaurants;

    dom.randomModal.classList.remove('hidden');
    dom.randomModal.classList.add('flex');
    setTimeout(() => {
      dom.randomModal.querySelector('.modal-backdrop').classList.add('open');
      dom.randomModal.querySelector('.modal-content').classList.add('open');
    }, 10);
    document.body.style.overflow = 'hidden';

    spinRandomizer(candidates);
  }

  function spinRandomizer(candidates) {
    if (!candidates) {
      candidates = (state.filteredResults && state.filteredResults.length > 0)
        ? state.filteredResults
        : state.restaurants;
    }

    dom.randomModalCard.innerHTML = `
      <div class="py-8 flex flex-col items-center justify-center text-center">
        <div class="text-4xl animate-bounce mb-2">🎲</div>
        <div class="text-sm font-bold text-[#064e3b] dark:text-emerald-400">Picking a curated spot...</div>
      </div>
    `;

    setTimeout(() => {
      const winner = candidates[Math.floor(Math.random() * candidates.length)];
      renderRandomWinner(winner);
    }, 400);
  }

  function renderRandomWinner(r) {
    const imageUrl = getRestaurantImage(r);
    dom.randomModalCard.innerHTML = `
      <div class="bg-gray-50 dark:bg-gray-800/60 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
        <div class="h-32 overflow-hidden">
          <img src="${imageUrl}" alt="${escapeHtml(r.name)}" class="w-full h-full object-cover">
        </div>
        <div class="p-4">
          <h3 class="text-base font-bold text-gray-900 dark:text-white">${escapeHtml(r.name)}</h3>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">📍 ${escapeHtml(r.area)} • ${escapeHtml(r.cuisine)}</p>
          <div class="flex items-center gap-1.5 mt-2">
            ${getHalalBadge(r)}
            <span class="text-xs font-bold text-gray-600 dark:text-gray-300">${r.priceTier}</span>
          </div>
          <div class="mt-4 flex items-center gap-2">
            <a href="${r.gmapsUrl}" target="_blank" rel="noopener noreferrer" class="flex-1 py-2 px-3 rounded-full bg-[#064e3b] text-white text-xs font-bold text-center hover:bg-[#047857]">
              Open Maps
            </a>
            <button type="button" class="view-winner-btn py-2 px-4 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white text-xs font-bold" data-id="${r.id}">
              Details
            </button>
          </div>
        </div>
      </div>
    `;

    dom.randomModalCard.querySelector('.view-winner-btn').addEventListener('click', () => {
      closeRandomModal();
      openDetailModal(r.id);
    });
  }

  function closeRandomModal() {
    if (!dom.randomModal) return;
    dom.randomModal.querySelector('.modal-backdrop').classList.remove('open');
    dom.randomModal.querySelector('.modal-content').classList.remove('open');
    setTimeout(() => {
      dom.randomModal.classList.add('hidden');
      dom.randomModal.classList.remove('flex');
      document.body.style.overflow = '';
    }, 150);
  }

  function openHalalGuideModal() {
    dom.halalGuideModal.classList.remove('hidden');
    dom.halalGuideModal.classList.add('flex');
    setTimeout(() => {
      dom.halalGuideModal.querySelector('.modal-backdrop').classList.add('open');
      dom.halalGuideModal.querySelector('.modal-content').classList.add('open');
    }, 10);
    document.body.style.overflow = 'hidden';
  }

  function closeHalalGuideModal() {
    if (!dom.halalGuideModal) return;
    dom.halalGuideModal.querySelector('.modal-backdrop').classList.remove('open');
    dom.halalGuideModal.querySelector('.modal-content').classList.remove('open');
    setTimeout(() => {
      dom.halalGuideModal.classList.add('hidden');
      dom.halalGuideModal.classList.remove('flex');
      document.body.style.overflow = '';
    }, 150);
  }

  function setupEventListeners() {
    if (dom.themeToggle) dom.themeToggle.addEventListener('click', toggleTheme);

    // Search Input
    if (dom.searchInput) {
      dom.searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        if (dom.clearSearchBtn) {
          if (state.searchQuery) {
            dom.clearSearchBtn.classList.remove('hidden');
          } else {
            dom.clearSearchBtn.classList.add('hidden');
          }
        }
        applyFilters();
      });
    }

    if (dom.clearSearchBtn) {
      dom.clearSearchBtn.addEventListener('click', () => {
        state.searchQuery = '';
        dom.searchInput.value = '';
        dom.clearSearchBtn.classList.add('hidden');
        applyFilters();
      });
    }

    // Budget select
    if (dom.budgetSelect) {
      dom.budgetSelect.addEventListener('change', (e) => {
        state.selectedBudget = e.target.value;
        applyFilters();
      });
    }

    // Location select
    if (dom.locationSelect) {
      dom.locationSelect.addEventListener('change', (e) => {
        state.selectedLocation = e.target.value;
        applyFilters();
      });
    }

    // Find food action button
    if (dom.searchActionBtn) {
      dom.searchActionBtn.addEventListener('click', () => {
        document.getElementById('resultsSection').scrollIntoView({ behavior: 'smooth' });
      });
    }

    // Region Segment Control (All, HK, KLN, NT)
    if (dom.regionSegments) {
      dom.regionSegments.querySelectorAll('.region-chip').forEach(btn => {
        btn.addEventListener('click', () => {
          dom.regionSegments.querySelectorAll('.region-chip').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          state.selectedRegion = btn.dataset.region;
          applyFilters();
        });
      });
    }

    // Reset Buttons
    if (dom.emptyStateResetBtn) {
      dom.emptyStateResetBtn.addEventListener('click', () => {
        state.selectedCraving = 'all';
        state.selectedRegion = 'all';
        state.selectedLocation = 'all';
        state.selectedBudget = 'all';
        state.searchQuery = '';
        
        if (dom.searchInput) dom.searchInput.value = '';
        if (dom.budgetSelect) dom.budgetSelect.value = 'all';
        if (dom.locationSelect) dom.locationSelect.value = 'all';
        if (dom.clearSearchBtn) dom.clearSearchBtn.classList.add('hidden');
        
        if (dom.regionSegments) {
          dom.regionSegments.querySelectorAll('.region-chip').forEach(b => {
            if (b.dataset.region === 'all') b.classList.add('active');
            else b.classList.remove('active');
          });
        }
        
        updateCravingChipsUI();
        applyFilters();
      });
    }

    // Modals
    if (dom.surpriseMeBtn) dom.surpriseMeBtn.addEventListener('click', openSurpriseModal);
    if (dom.randomModalSpinBtn) dom.randomModalSpinBtn.addEventListener('click', () => spinRandomizer());
    if (dom.halalGuideBtn) dom.halalGuideBtn.addEventListener('click', openHalalGuideModal);

    if (dom.closeDetailModalBtn) dom.closeDetailModalBtn.addEventListener('click', closeDetailModal);
    if (dom.closeRandomModalBtn) dom.closeRandomModalBtn.addEventListener('click', closeRandomModal);
    if (dom.closeHalalGuideBtn) dom.closeHalalGuideBtn.addEventListener('click', closeHalalGuideModal);

    document.querySelectorAll('.modal-backdrop').forEach(bg => {
      bg.addEventListener('click', () => {
        closeDetailModal();
        closeRandomModal();
        closeHalalGuideModal();
      });
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeDetailModal();
        closeRandomModal();
        closeHalalGuideModal();
      }
    });
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
