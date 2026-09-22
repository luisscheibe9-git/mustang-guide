(function () {
  "use strict";

  const COST_TIERS = ["Free", "$", "$$", "$$$"];
  function costRank(cost) {
    if (cost === "Free") return 0;
    if (cost === "$") return 1;
    if (cost === "Discount") return 1;
    if (cost === "$$") return 2;
    return 3; // $$$
  }

  // Top of the tree: a handful of broad branches, each holding a few
  // of the 17 real categories, so the browse view starts small.
  const BRANCHES = [
    { name: "Free Stuff & Deals", categories: ["Discounts & Deals", "Happy Hour (21+)", "Freshman Regrets & Underused Benefits"] },
    { name: "Food & Drink", categories: ["Food & Local Spots", "Local Food Finds (Community Intel)"] },
    { name: "Outdoors & Trips", categories: ["Outdoors & Hikes", "Day Trips & Traditions"] },
    { name: "Campus Life", categories: ["Campus Rentals & Gear", "Recreation & Fitness", "Creative & Maker Spaces", "Clubs & Community"] },
    { name: "Support & Getting Around", categories: ["Wellness & Basic Needs", "Academic & Career Help", "Transportation"] },
    { name: "Insider Intel", categories: ["Hidden Gems (Community Intel)", "Real Talk: Skip It", "Know Before You Register"] }
  ];

  // The Cal Poly Bucket List — things every Mustang should do before they graduate.
  const MUST_DO_TITLES = [
    "Bishop Peak",
    "Madonna Mountain (Cerro San Luis)",
    "The Cal Poly \"P\" (Terrace Hill)",
    "Serenity Swing",
    "Poly Canyon / Architecture Graveyard",
    "Pirates Cove",
    "Montaña de Oro State Park",
    "Pismo Monarch Butterfly Grove",
    "Piedras Blancas Elephant Seal Rookery",
    "Bubblegum Alley",
    "Madonna Inn",
    "SLO Thursday Night Farmers' Market",
    "Apple Farm Restaurant & Bakery",
    "Mission San Luis Obispo de Tolosa",
    "Firestone Grill",
    "Hearst Castle",
    "Big Sur / McWay Falls",
    "Design Village",
    "The Tri-Tip Challenge",
    "Blue-Green Rivalry (Cal Poly vs. UCSB)",
    "Poly Royal Rodeo",
    "Open House (Poly Royal)",
    "Einstein Statue",
    "SLO Little 500"
  ];

  const state = {
    query: "",
    maxCostRank: 3,
    rootType: "category",  // "category" | "interest"
    mode: "browse",        // "browse" | "bucketlist"
    expandedBranch: null,  // branch name open in category mode
    activeCategory: null,  // selected leaf category
    activeInterest: null   // selected leaf interest
  };

  // ---------------- Bucket list persistence ----------------
  const BUCKET_STORAGE_KEY = "mustangGuideBucketList";
  function loadBucketState() {
    try {
      const raw = localStorage.getItem(BUCKET_STORAGE_KEY);
      if (!raw) return { done: new Set(), custom: new Set() };
      const parsed = JSON.parse(raw);
      return { done: new Set(parsed.done || []), custom: new Set(parsed.custom || []) };
    } catch (e) {
      return { done: new Set(), custom: new Set() };
    }
  }
  function saveBucketState() {
    try {
      localStorage.setItem(BUCKET_STORAGE_KEY, JSON.stringify({
        done: [...bucketState.done],
        custom: [...bucketState.custom]
      }));
    } catch (e) {
      // localStorage unavailable — bucket list just won't persist this session
    }
  }
  const bucketState = loadBucketState();
  function toggleDone(title) {
    if (bucketState.done.has(title)) bucketState.done.delete(title);
    else bucketState.done.add(title);
    saveBucketState();
  }
  function toggleCustomList(title) {
    if (bucketState.custom.has(title)) bucketState.custom.delete(title);
    else bucketState.custom.add(title);
    saveBucketState();
  }

  function costClass(cost) {
    if (cost === "Free") return "free";
    if (cost === "$") return "cheap";
    if (cost === "$$") return "mid";
    return "discount";
  }

  function passCost(item) {
    return costRank(item.cost) <= state.maxCostRank;
  }

  function matchesSearch(item) {
    if (!passCost(item)) return false;
    const words = state.query.toLowerCase().split(/\s+/).filter(Boolean);
    const hay = (item.title + " " + item.desc + " " + item.category + " " + item.tags.join(" ") + " " + (item.note || "")).toLowerCase();
    return words.every((w) => hay.includes(w));
  }

  function slugify(s) {
    return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }

  function countForCategory(cat) {
    return RESOURCES.filter((r) => r.category === cat && passCost(r)).length;
  }
  function countForInterest(tag) {
    return RESOURCES.filter((r) => r.tags.includes(tag) && passCost(r)).length;
  }
  function countForBranch(branch) {
    return branch.categories.reduce((sum, c) => sum + countForCategory(c), 0);
  }

  // ---------------- Tree (browse) ----------------
  function renderTree() {
    const treeEl = document.getElementById("tree");
    treeEl.innerHTML = "";

    if (state.rootType === "category") {
      BRANCHES.forEach((branch) => {
        const isOpen = state.expandedBranch === branch.name;
        const branchEl = document.createElement("div");
        branchEl.className = "tree-branch";

        const head = document.createElement("button");
        head.type = "button";
        head.className = "tree-branch-head" + (isOpen ? " open" : "");
        head.innerHTML = `<span class="tree-caret">${isOpen ? "&#9662;" : "&#9656;"}</span><span class="tree-branch-name">${branch.name}</span><span class="tree-count">${countForBranch(branch)}</span>`;
        head.addEventListener("click", () => {
          state.expandedBranch = isOpen ? null : branch.name;
          renderTree();
        });
        branchEl.appendChild(head);

        if (isOpen) {
          const list = document.createElement("div");
          list.className = "tree-children";
          branch.categories.forEach((cat) => {
            const leaf = document.createElement("button");
            leaf.type = "button";
            leaf.className = "tree-leaf" + (state.activeCategory === cat ? " active" : "");
            leaf.innerHTML = `<span class="tree-leaf-name">${cat}</span><span class="tree-count">${countForCategory(cat)}</span>`;
            leaf.addEventListener("click", () => selectCategory(cat));
            list.appendChild(leaf);
          });
          branchEl.appendChild(list);
        }
        treeEl.appendChild(branchEl);
      });
    } else {
      const list = document.createElement("div");
      list.className = "tree-children tree-children-flat";
      INTERESTS.forEach((tag) => {
        const leaf = document.createElement("button");
        leaf.type = "button";
        leaf.className = "tree-leaf" + (state.activeInterest === tag ? " active" : "");
        leaf.innerHTML = `<span class="tree-leaf-name">${tag}</span><span class="tree-count">${countForInterest(tag)}</span>`;
        leaf.addEventListener("click", () => selectInterest(tag));
        list.appendChild(leaf);
      });
      treeEl.appendChild(list);
    }
  }

  function selectCategory(cat) {
    state.mode = "browse";
    state.activeCategory = state.activeCategory === cat ? null : cat;
    state.activeInterest = null;
    updateBucketNavBtn();
    renderTree();
    renderResults();
    if (state.activeCategory) scrollToResults();
  }

  function selectInterest(tag) {
    state.mode = "browse";
    state.activeInterest = state.activeInterest === tag ? null : tag;
    state.activeCategory = null;
    updateBucketNavBtn();
    renderTree();
    renderResults();
    if (state.activeInterest) scrollToResults();
  }

  function scrollToResults() {
    const el = document.getElementById("results");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function backToBrowse() {
    state.mode = "browse";
    state.activeCategory = null;
    state.activeInterest = null;
    updateBucketNavBtn();
    renderTree();
    renderResults();
  }

  // ---------------- Card building (shared by browse results + bucket list) ----------------
  let cardIndexCounter = 0;
  function buildCard(item) {
    const card = document.createElement("div");
    card.className = "card";
    card.style.setProperty("--i", Math.min(cardIndexCounter++, 24));
    const done = bucketState.done.has(item.title);
    if (done) card.classList.add("card-done");
    card.innerHTML = `
      <div class="card-top">
        <div class="card-title-row">
          ${done ? '<span class="card-done-badge">&#10003;</span>' : ""}
          <h3>${item.title}</h3>
        </div>
        <span class="cost-badge ${costClass(item.cost)}">${item.cost}</span>
      </div>
      <p>${item.desc}</p>
      <div class="card-tags">${item.tags.map((t) => `<span class="tag-pill">${t}</span>`).join("")}</div>
    `;
    card.addEventListener("click", () => openModal(item));
    return card;
  }

  function renderGrouped(items, container) {
    const byCategory = new Map();
    items.forEach((item) => {
      if (!byCategory.has(item.category)) byCategory.set(item.category, []);
      byCategory.get(item.category).push(item);
    });

    const orderedCats = CATEGORY_ORDER.filter((c) => byCategory.has(c))
      .concat([...byCategory.keys()].filter((c) => !CATEGORY_ORDER.includes(c)));

    orderedCats.forEach((cat) => {
      const catItems = byCategory.get(cat);
      const section = document.createElement("section");
      section.className = "section";
      section.id = slugify(cat);

      const head = document.createElement("div");
      head.className = "section-head";
      head.innerHTML = `<h2>${cat}</h2><span class="section-count">${catItems.length}</span>`;
      section.appendChild(head);

      const grid = document.createElement("div");
      grid.className = "card-grid";
      catItems.forEach((item) => grid.appendChild(buildCard(item)));

      section.appendChild(grid);
      container.appendChild(section);
    });
  }

  // ---------------- Bucket list view ----------------
  function updateBucketNavBtn() {
    const btn = document.getElementById("bucket-nav-btn");
    const countEl = document.getElementById("bucket-nav-count");
    const mustDoItems = RESOURCES.filter((r) => MUST_DO_TITLES.includes(r.title));
    const doneCount = mustDoItems.filter((r) => bucketState.done.has(r.title)).length;
    countEl.textContent = `(${doneCount}/${mustDoItems.length})`;
    btn.classList.toggle("active", state.mode === "bucketlist");
  }

  function renderBucketList(container) {
    const crumb = document.createElement("div");
    crumb.className = "tree-crumb";
    crumb.innerHTML = `<button type="button" class="tree-back">&larr; Back to browse</button><span class="tree-crumb-sep">/</span><span class="tree-crumb-current">My Bucket List</span>`;
    crumb.querySelector(".tree-back").addEventListener("click", backToBrowse);
    container.appendChild(crumb);

    const mustDoItems = RESOURCES.filter((r) => MUST_DO_TITLES.includes(r.title));
    const doneMustDo = mustDoItems.filter((r) => bucketState.done.has(r.title)).length;
    const pct = mustDoItems.length ? Math.round((doneMustDo / mustDoItems.length) * 100) : 0;

    const section1 = document.createElement("div");
    section1.className = "bucket-section";
    section1.innerHTML = `
      <div class="bucket-section-head">
        <h2>The Cal Poly Bucket List</h2>
        <span class="bucket-progress-label">${doneMustDo} of ${mustDoItems.length} done</span>
      </div>
      <p class="bucket-section-sub">The things every Mustang should do before they graduate. Click one, then "Mark as done."</p>
      <div class="bucket-progress-bar"><div class="bucket-progress-fill" style="width:${pct}%"></div></div>
    `;
    const grid1 = document.createElement("div");
    grid1.className = "card-grid";
    grid1.style.marginTop = "18px";
    mustDoItems.forEach((item) => grid1.appendChild(buildCard(item)));
    section1.appendChild(grid1);
    container.appendChild(section1);

    const customItems = RESOURCES.filter((r) => bucketState.custom.has(r.title));
    const section2 = document.createElement("div");
    section2.className = "bucket-section";
    if (customItems.length === 0) {
      section2.innerHTML = `
        <div class="bucket-section-head"><h2>My List</h2></div>
        <p class="bucket-section-sub">Nothing here yet — open anything on the site and click "Add to my list."</p>
      `;
    } else {
      const doneCustom = customItems.filter((r) => bucketState.done.has(r.title)).length;
      section2.innerHTML = `
        <div class="bucket-section-head">
          <h2>My List</h2>
          <span class="bucket-progress-label">${doneCustom} of ${customItems.length} done</span>
        </div>
      `;
      const grid2 = document.createElement("div");
      grid2.className = "card-grid";
      grid2.style.marginTop = "18px";
      customItems.forEach((item) => grid2.appendChild(buildCard(item)));
      section2.appendChild(grid2);
    }
    container.appendChild(section2);
  }

  // ---------------- Results ----------------
  function renderResults() {
    const resultsEl = document.getElementById("results");
    const emptyEl = document.getElementById("empty-state");
    const statsEl = document.getElementById("stats");
    const browseWrap = document.getElementById("browse-wrap");

    resultsEl.innerHTML = "";
    cardIndexCounter = 0;

    if (state.query) {
      browseWrap.style.display = "none";
      const items = RESOURCES.filter(matchesSearch);
      statsEl.innerHTML = `Showing <b>${items.length}</b> of <b>${RESOURCES.length}</b> things you're not taking advantage of`;
      if (items.length === 0) {
        emptyEl.style.display = "block";
        return;
      }
      emptyEl.style.display = "none";
      renderGrouped(items, resultsEl);
      return;
    }

    if (state.mode === "bucketlist") {
      browseWrap.style.display = "none";
      emptyEl.style.display = "none";
      statsEl.innerHTML = `<b>${RESOURCES.length}</b> things you're not taking advantage of &mdash; track the ones you've done below.`;
      renderBucketList(resultsEl);
      return;
    }

    browseWrap.style.display = "";

    let items = null;
    let mode = "idle";
    if (state.activeCategory) {
      mode = "category";
      items = RESOURCES.filter((r) => r.category === state.activeCategory && passCost(r));
    } else if (state.activeInterest) {
      mode = "interest";
      items = RESOURCES.filter((r) => r.tags.includes(state.activeInterest) && passCost(r));
    }

    if (mode === "idle") {
      statsEl.innerHTML = `<b>${RESOURCES.length}</b> things you're not taking advantage of &mdash; pick a category or interest below to explore.`;
      emptyEl.style.display = "none";
      return;
    }

    statsEl.innerHTML = `Showing <b>${items.length}</b> of <b>${RESOURCES.length}</b> things you're not taking advantage of`;

    if (items.length === 0) {
      emptyEl.style.display = "block";
      return;
    }
    emptyEl.style.display = "none";

    const crumb = document.createElement("div");
    crumb.className = "tree-crumb";
    const label = mode === "category" ? state.activeCategory : state.activeInterest;
    crumb.innerHTML = `<button type="button" class="tree-back">&larr; Back to browse</button><span class="tree-crumb-sep">/</span><span class="tree-crumb-current">${label}</span>`;
    crumb.querySelector(".tree-back").addEventListener("click", backToBrowse);
    resultsEl.appendChild(crumb);

    renderGrouped(items, resultsEl);
  }

  // ---------------- Modal ----------------
  function openModal(item) {
    const backdrop = document.getElementById("modal-backdrop");
    const modal = document.getElementById("modal");
    const done = bucketState.done.has(item.title);
    const inList = bucketState.custom.has(item.title);
    modal.innerHTML = `
      <button class="modal-close" id="modal-close">&times;</button>
      <div class="modal-cat">${item.category}</div>
      <h3>${item.title}</h3>
      <p>${item.desc}</p>
      ${item.note ? `<p><b>Access:</b> ${item.note}</p>` : ""}
      <div class="modal-actions">
        ${item.link ? `<a class="btn-link" href="${item.link}" target="_blank" rel="noopener">Website</a>` : ""}
        ${item.map ? `<a class="btn-link btn-link-alt" href="${item.map}" target="_blank" rel="noopener">Directions</a>` : ""}
      </div>
      <div class="modal-bucket-actions">
        <button type="button" class="btn-bucket ${done ? "active" : ""}" id="modal-toggle-done">${done ? "&#10003; Done" : "Mark as done"}</button>
        <button type="button" class="btn-bucket-outline ${inList ? "active" : ""}" id="modal-toggle-list">${inList ? "&minus; Remove from my list" : "+ Add to my list"}</button>
      </div>
    `;
    backdrop.classList.add("active");
    document.getElementById("modal-close").addEventListener("click", closeModal);
    document.getElementById("modal-toggle-done").addEventListener("click", () => {
      toggleDone(item.title);
      openModal(item);
      updateBucketNavBtn();
      renderResults();
    });
    document.getElementById("modal-toggle-list").addEventListener("click", () => {
      toggleCustomList(item.title);
      openModal(item);
      renderResults();
    });
  }
  function closeModal() {
    document.getElementById("modal-backdrop").classList.remove("active");
  }
  document.getElementById("modal-backdrop").addEventListener("click", (e) => {
    if (e.target.id === "modal-backdrop") closeModal();
  });

  // ---------------- Cost slider ----------------
  function initCostSlider() {
    const slider = document.getElementById("cost-slider");
    const label = document.getElementById("cost-slider-label");

    function updateLabel() {
      const rank = Number(slider.value);
      label.textContent = rank >= 3 ? "Any price" : `Up to ${COST_TIERS[rank]}`;
    }

    slider.addEventListener("input", () => {
      state.maxCostRank = Number(slider.value);
      updateLabel();
      renderTree();
      renderResults();
    });
    updateLabel();
  }

  // ---------------- Browse-by toggle ----------------
  function initBrowseToggle() {
    document.querySelectorAll(".browse-toggle-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const root = btn.dataset.root;
        state.mode = "browse";
        if (state.rootType === root) {
          updateBucketNavBtn();
        } else {
          state.rootType = root;
          state.expandedBranch = null;
          state.activeCategory = null;
          state.activeInterest = null;
          document.querySelectorAll(".browse-toggle-btn").forEach((b) => b.classList.toggle("active", b === btn));
        }
        updateBucketNavBtn();
        renderTree();
        renderResults();
      });
    });
  }

  // ---------------- Bucket list nav + surprise me ----------------
  function initBucketNav() {
    document.getElementById("bucket-nav-btn").addEventListener("click", () => {
      state.mode = state.mode === "bucketlist" ? "browse" : "bucketlist";
      state.query = "";
      document.getElementById("search-input").value = "";
      state.activeCategory = null;
      state.activeInterest = null;
      updateBucketNavBtn();
      renderTree();
      renderResults();
      if (state.mode === "bucketlist") window.scrollTo({ top: document.querySelector(".filter-bar").offsetTop, behavior: "smooth" });
    });
  }

  function initSurpriseMe() {
    document.getElementById("surprise-btn").addEventListener("click", () => {
      const item = RESOURCES[Math.floor(Math.random() * RESOURCES.length)];
      openModal(item);
    });
  }

  document.getElementById("search-input").addEventListener("input", (e) => {
    state.query = e.target.value.trim();
    renderResults();
  });

  document.getElementById("btn-clear-filters").addEventListener("click", () => {
    state.query = "";
    state.maxCostRank = 3;
    state.rootType = "category";
    state.mode = "browse";
    state.expandedBranch = null;
    state.activeCategory = null;
    state.activeInterest = null;
    document.getElementById("search-input").value = "";
    document.getElementById("cost-slider").value = 3;
    document.getElementById("cost-slider-label").textContent = "Any price";
    document.querySelectorAll(".browse-toggle-btn").forEach((b) => b.classList.toggle("active", b.dataset.root === "category"));
    updateBucketNavBtn();
    renderTree();
    renderResults();
  });

  const backToTop = document.getElementById("back-to-top");
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("visible", window.scrollY > 600);
  });
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  initCostSlider();
  initBrowseToggle();
  initBucketNav();
  initSurpriseMe();
  updateBucketNavBtn();
  renderTree();
  renderResults();
})();
