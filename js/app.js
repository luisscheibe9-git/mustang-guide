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

  const state = {
    query: "",
    maxCostRank: 3,
    rootType: "category",  // "category" | "interest"
    expandedBranch: null,  // branch name open in category mode
    activeCategory: null,  // selected leaf category
    activeInterest: null   // selected leaf interest
  };

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
    state.activeCategory = state.activeCategory === cat ? null : cat;
    state.activeInterest = null;
    renderTree();
    renderResults();
    if (state.activeCategory) scrollToResults();
  }

  function selectInterest(tag) {
    state.activeInterest = state.activeInterest === tag ? null : tag;
    state.activeCategory = null;
    renderTree();
    renderResults();
    if (state.activeInterest) scrollToResults();
  }

  function scrollToResults() {
    const el = document.getElementById("results");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function backToBrowse() {
    state.activeCategory = null;
    state.activeInterest = null;
    renderTree();
    renderResults();
  }

  // ---------------- Results (leaves) ----------------
  function renderGrouped(items, container) {
    const byCategory = new Map();
    items.forEach((item) => {
      if (!byCategory.has(item.category)) byCategory.set(item.category, []);
      byCategory.get(item.category).push(item);
    });

    const orderedCats = CATEGORY_ORDER.filter((c) => byCategory.has(c))
      .concat([...byCategory.keys()].filter((c) => !CATEGORY_ORDER.includes(c)));

    let cardIndex = 0;
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
      catItems.forEach((item) => {
        const card = document.createElement("div");
        card.className = "card";
        card.style.setProperty("--i", Math.min(cardIndex++, 24));
        card.innerHTML = `
          <div class="card-top">
            <h3>${item.title}</h3>
            <span class="cost-badge ${costClass(item.cost)}">${item.cost}</span>
          </div>
          <p>${item.desc}</p>
          <div class="card-tags">${item.tags.map((t) => `<span class="tag-pill">${t}</span>`).join("")}</div>
        `;
        card.addEventListener("click", () => openModal(item));
        grid.appendChild(card);
      });

      section.appendChild(grid);
      container.appendChild(section);
    });
  }

  function renderResults() {
    const resultsEl = document.getElementById("results");
    const emptyEl = document.getElementById("empty-state");
    const statsEl = document.getElementById("stats");
    const browseWrap = document.getElementById("browse-wrap");

    resultsEl.innerHTML = "";

    let items = null;
    let mode = "idle";
    if (state.query) {
      mode = "search";
      items = RESOURCES.filter(matchesSearch);
    } else if (state.activeCategory) {
      mode = "category";
      items = RESOURCES.filter((r) => r.category === state.activeCategory && passCost(r));
    } else if (state.activeInterest) {
      mode = "interest";
      items = RESOURCES.filter((r) => r.tags.includes(state.activeInterest) && passCost(r));
    }

    browseWrap.style.display = state.query ? "none" : "";

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

    if (mode !== "search") {
      const crumb = document.createElement("div");
      crumb.className = "tree-crumb";
      const label = mode === "category" ? state.activeCategory : state.activeInterest;
      crumb.innerHTML = `<button type="button" class="tree-back">&larr; Back to browse</button><span class="tree-crumb-sep">/</span><span class="tree-crumb-current">${label}</span>`;
      crumb.querySelector(".tree-back").addEventListener("click", backToBrowse);
      resultsEl.appendChild(crumb);
    }

    renderGrouped(items, resultsEl);
  }

  function openModal(item) {
    const backdrop = document.getElementById("modal-backdrop");
    const modal = document.getElementById("modal");
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
    `;
    backdrop.classList.add("active");
    document.getElementById("modal-close").addEventListener("click", closeModal);
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
        if (state.rootType === root) return;
        state.rootType = root;
        state.expandedBranch = null;
        state.activeCategory = null;
        state.activeInterest = null;
        document.querySelectorAll(".browse-toggle-btn").forEach((b) => b.classList.toggle("active", b === btn));
        renderTree();
        renderResults();
      });
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
    state.expandedBranch = null;
    state.activeCategory = null;
    state.activeInterest = null;
    document.getElementById("search-input").value = "";
    document.getElementById("cost-slider").value = 3;
    document.getElementById("cost-slider-label").textContent = "Any price";
    document.querySelectorAll(".browse-toggle-btn").forEach((b) => b.classList.toggle("active", b.dataset.root === "category"));
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
  renderTree();
  renderResults();
})();
