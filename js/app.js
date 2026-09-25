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
    "Bike Night (First Thursday)"
  ];

  const state = {
    query: "",
    maxCostRank: 3,
    rootType: "category",  // "category" | "interest"
    mode: "browse",        // "browse" | "bucketlist"
    expandedBranch: null,  // branch name open in category mode
    activeCategory: null,  // selected leaf category
    activeInterest: null,  // selected leaf interest
    renamingListId: null,      // list currently showing an inline rename field
    confirmDeleteListId: null  // list currently showing the inline delete confirmation
  };

  // ---------------- Bucket list persistence ----------------
  const BUCKET_STORAGE_KEY = "mustangGuideBucketList";
  function loadBucketState() {
    try {
      const raw = localStorage.getItem(BUCKET_STORAGE_KEY);
      if (!raw) return { done: new Set(), lists: [] };
      const parsed = JSON.parse(raw);
      let lists = parsed.lists;
      if (!lists && parsed.custom) {
        // migrate from the old single unnamed "custom" list
        lists = parsed.custom.length ? [{ id: "list-legacy", name: "My List", items: parsed.custom }] : [];
      }
      return {
        done: new Set(parsed.done || []),
        lists: (lists || []).map((l) => ({ id: l.id, name: l.name, items: l.items || [] }))
      };
    } catch (e) {
      return { done: new Set(), lists: [] };
    }
  }
  function saveBucketState() {
    try {
      localStorage.setItem(BUCKET_STORAGE_KEY, JSON.stringify({
        done: [...bucketState.done],
        lists: bucketState.lists
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
  function escapeHtml(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function createList(name) {
    const id = "list-" + Date.now() + "-" + Math.random().toString(36).slice(2, 7);
    bucketState.lists.push({ id, name: name.trim() || "Untitled list", items: [] });
    saveBucketState();
    return id;
  }
  function renameList(id, name) {
    const list = bucketState.lists.find((l) => l.id === id);
    if (list && name.trim()) {
      list.name = name.trim();
      saveBucketState();
    }
  }
  function deleteList(id) {
    bucketState.lists = bucketState.lists.filter((l) => l.id !== id);
    saveBucketState();
  }
  function toggleItemInList(listId, title) {
    const list = bucketState.lists.find((l) => l.id === listId);
    if (!list) return;
    const idx = list.items.indexOf(title);
    if (idx === -1) list.items.push(title);
    else list.items.splice(idx, 1);
    saveBucketState();
  }

  // ---------------- Completion ring ----------------
  function buildProgressRing(done, total) {
    const pct = total ? Math.round((done / total) * 100) : 0;
    const r = 24;
    const c = 2 * Math.PI * r;
    const offset = c * (1 - pct / 100);
    return `
      <svg class="progress-ring${pct >= 100 && total ? " complete" : ""}" width="56" height="56" viewBox="0 0 56 56" aria-hidden="true">
        <circle cx="28" cy="28" r="${r}" fill="none" stroke="#dddcd7" stroke-width="6"/>
        <circle cx="28" cy="28" r="${r}" fill="none" stroke="#c69214" stroke-width="6"
          stroke-dasharray="${c}" stroke-dashoffset="${offset}"
          stroke-linecap="round" transform="rotate(-90 28 28)"/>
        <text x="28" y="32" text-anchor="middle" class="progress-ring-text">${pct}%</text>
      </svg>
    `;
  }

  // ---------------- Confetti ----------------
  function fireConfetti(x, y, count) {
    const colors = ["#c69214", "#154734", "#36863a", "#ffffff", "#b88813"];
    const container = document.createElement("div");
    container.className = "confetti-container";
    document.body.appendChild(container);
    for (let i = 0; i < count; i++) {
      const piece = document.createElement("span");
      piece.className = "confetti-piece";
      const angle = Math.random() * Math.PI * 2;
      const distance = 60 + Math.random() * 160;
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance - 40;
      const rotate = Math.random() * 720 - 360;
      piece.style.left = x + "px";
      piece.style.top = y + "px";
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.setProperty("--dx", dx + "px");
      piece.style.setProperty("--dy", dy + "px");
      piece.style.setProperty("--rot", rotate + "deg");
      piece.style.animationDelay = (Math.random() * 0.15) + "s";
      container.appendChild(piece);
    }
    setTimeout(() => container.remove(), 1500);
  }

  // Returns the ids of every list ("mustdo" or a custom list id) that just
  // reached 100% completion because `title` was marked done.
  function listsJustCompletedBy(title) {
    const completed = [];
    const mustDoItems = RESOURCES.filter((r) => MUST_DO_TITLES.includes(r.title));
    if (MUST_DO_TITLES.includes(title) && mustDoItems.length && mustDoItems.every((r) => bucketState.done.has(r.title))) {
      completed.push("mustdo");
    }
    bucketState.lists.forEach((list) => {
      if (list.items.includes(title) && list.items.length && list.items.every((t) => bucketState.done.has(t))) {
        completed.push(list.id);
      }
    });
    return completed;
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
    state.renamingListId = null;
    state.confirmDeleteListId = null;
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

    const section1 = document.createElement("div");
    section1.className = "bucket-section";
    section1.innerHTML = `
      <div class="bucket-section-head">
        <div class="bucket-head-left">
          ${buildProgressRing(doneMustDo, mustDoItems.length)}
          <h2>The Cal Poly Bucket List</h2>
        </div>
        <span class="bucket-progress-label">${doneMustDo} of ${mustDoItems.length} done</span>
      </div>
      <p class="bucket-section-sub">The things every Mustang should do before they graduate. Click one, then "Mark as done."</p>
    `;
    const grid1 = document.createElement("div");
    grid1.className = "card-grid";
    grid1.style.marginTop = "18px";
    mustDoItems.forEach((item) => grid1.appendChild(buildCard(item)));
    section1.appendChild(grid1);
    container.appendChild(section1);
  }

  function renderMyLists(container) {
    const head = document.createElement("div");
    head.className = "bucket-section";
    head.innerHTML = `
      <div class="bucket-section-head"><h2>My Lists</h2></div>
      <p class="bucket-section-sub">Start your own list from scratch and name it whatever you want.</p>
      <div class="new-list-row">
        <input type="text" class="new-list-input" id="new-list-input" placeholder="Name a new list…" maxlength="60">
        <button type="button" class="chip new-list-btn" id="new-list-btn">+ Start new list</button>
      </div>
    `;
    container.appendChild(head);

    document.getElementById("new-list-btn").addEventListener("click", () => {
      const input = document.getElementById("new-list-input");
      const name = input.value.trim();
      if (!name) { input.focus(); return; }
      createList(name);
      renderResults();
    });
    document.getElementById("new-list-input").addEventListener("keydown", (e) => {
      if (e.key === "Enter") document.getElementById("new-list-btn").click();
    });

    if (bucketState.lists.length === 0) {
      const hint = document.createElement("p");
      hint.className = "bucket-section-sub";
      hint.textContent = "You haven't started a list yet.";
      container.appendChild(hint);
      return;
    }

    bucketState.lists.forEach((list) => {
      const items = RESOURCES.filter((r) => list.items.includes(r.title));
      const doneCount = items.filter((r) => bucketState.done.has(r.title)).length;
      const isRenaming = state.renamingListId === list.id;
      const isConfirmingDelete = state.confirmDeleteListId === list.id;

      const nameHtml = isRenaming
        ? `<input type="text" class="list-rename-input" id="rename-input-${list.id}" value="${escapeHtml(list.name)}" maxlength="60">`
        : `<div class="bucket-head-left">${buildProgressRing(doneCount, items.length)}<h2>${escapeHtml(list.name)}</h2></div>`;

      const actionsHtml = isConfirmingDelete
        ? `<span class="list-confirm-text">Delete this list?</span>
           <button type="button" class="list-action-btn list-action-danger" data-action="confirm-delete" data-list-id="${list.id}">Yes, delete</button>
           <button type="button" class="list-action-btn" data-action="cancel-delete" data-list-id="${list.id}">Cancel</button>`
        : isRenaming
        ? `<button type="button" class="list-action-btn" data-action="save-rename" data-list-id="${list.id}">Save</button>
           <button type="button" class="list-action-btn" data-action="cancel-rename" data-list-id="${list.id}">Cancel</button>`
        : `<button type="button" class="list-action-btn" data-action="rename" data-list-id="${list.id}">Rename</button>
           <button type="button" class="list-action-btn list-action-danger" data-action="delete" data-list-id="${list.id}">Delete list</button>`;

      const section = document.createElement("div");
      section.className = "bucket-section";
      section.innerHTML = `
        <div class="bucket-section-head">
          ${nameHtml}
          <span class="bucket-progress-label">${items.length ? `${doneCount} of ${items.length} done` : ""}</span>
        </div>
        <div class="list-actions">${actionsHtml}</div>
      `;
      if (items.length === 0) {
        const hint = document.createElement("p");
        hint.className = "bucket-section-sub";
        hint.textContent = "No items yet — add some from anywhere on the site.";
        section.appendChild(hint);
      } else {
        const grid = document.createElement("div");
        grid.className = "card-grid";
        grid.style.marginTop = "18px";
        items.forEach((item) => grid.appendChild(buildCard(item)));
        section.appendChild(grid);
      }
      container.appendChild(section);
    });

    container.querySelectorAll(".list-action-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.listId;
        const action = btn.dataset.action;
        if (action === "rename") {
          state.renamingListId = id;
          state.confirmDeleteListId = null;
        } else if (action === "cancel-rename") {
          state.renamingListId = null;
        } else if (action === "save-rename") {
          const input = document.getElementById(`rename-input-${id}`);
          if (input && input.value.trim()) renameList(id, input.value);
          state.renamingListId = null;
        } else if (action === "delete") {
          state.confirmDeleteListId = id;
          state.renamingListId = null;
        } else if (action === "cancel-delete") {
          state.confirmDeleteListId = null;
        } else if (action === "confirm-delete") {
          deleteList(id);
          state.confirmDeleteListId = null;
        }
        renderResults();
      });
    });

    const renameInput = container.querySelector(".list-rename-input");
    if (renameInput) {
      renameInput.focus();
      renameInput.select();
      renameInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          const id = renameInput.id.replace("rename-input-", "");
          const saveBtn = container.querySelector(`[data-action="save-rename"][data-list-id="${id}"]`);
          if (saveBtn) saveBtn.click();
        } else if (e.key === "Escape") {
          state.renamingListId = null;
          renderResults();
        }
      });
    }
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
      </div>
    `;
    backdrop.classList.add("active");
    document.getElementById("modal-close").addEventListener("click", closeModal);
    document.getElementById("modal-toggle-done").addEventListener("click", (e) => {
      const wasDone = bucketState.done.has(item.title);
      const rect = e.currentTarget.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      toggleDone(item.title);
      const justCompletedLists = !wasDone ? listsJustCompletedBy(item.title) : [];
      if (!wasDone) {
        fireConfetti(x, y, 26);
        if (justCompletedLists.length) {
          setTimeout(() => fireConfetti(window.innerWidth / 2, window.innerHeight * 0.25, 110), 300);
        }
      }
      openModal(item);
      updateBucketNavBtn();
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
