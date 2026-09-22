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

  const state = {
    query: "",
    interests: new Set(),
    maxCostRank: 3
  };

  function costClass(cost) {
    if (cost === "Free") return "free";
    if (cost === "$") return "cheap";
    if (cost === "$$") return "mid";
    return "discount";
  }

  function matches(item) {
    if (costRank(item.cost) > state.maxCostRank) return false;
    if (state.interests.size > 0) {
      const hasAny = item.tags.some((t) => state.interests.has(t));
      if (!hasAny) return false;
    }
    if (state.query) {
      const words = state.query.toLowerCase().split(/\s+/).filter(Boolean);
      const hay = (item.title + " " + item.desc + " " + item.category + " " + item.tags.join(" ") + " " + (item.note || "")).toLowerCase();
      if (!words.every((w) => hay.includes(w))) return false;
    }
    return true;
  }

  function slugify(s) {
    return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }

  function render() {
    const filtered = RESOURCES.filter(matches);
    const sectionsEl = document.getElementById("sections");
    const navEl = document.getElementById("category-nav");
    const emptyEl = document.getElementById("empty-state");
    const statsEl = document.getElementById("stats");

    statsEl.innerHTML = `Showing <b>${filtered.length}</b> of <b>${RESOURCES.length}</b> things you're not taking advantage of`;

    sectionsEl.innerHTML = "";
    navEl.innerHTML = "";

    if (filtered.length === 0) {
      emptyEl.style.display = "block";
      return;
    }
    emptyEl.style.display = "none";

    const byCategory = new Map();
    filtered.forEach((item) => {
      if (!byCategory.has(item.category)) byCategory.set(item.category, []);
      byCategory.get(item.category).push(item);
    });

    const orderedCats = CATEGORY_ORDER.filter((c) => byCategory.has(c))
      .concat([...byCategory.keys()].filter((c) => !CATEGORY_ORDER.includes(c)));

    let cardIndex = 0;
    orderedCats.forEach((cat) => {
      const items = byCategory.get(cat);
      const id = slugify(cat);

      const navLink = document.createElement("a");
      navLink.href = `#${id}`;
      navLink.textContent = `${cat} (${items.length})`;
      navEl.appendChild(navLink);

      const section = document.createElement("section");
      section.className = "section";
      section.id = id;

      const head = document.createElement("div");
      head.className = "section-head";
      head.innerHTML = `<h2>${cat}</h2><span class="section-count">${items.length}</span>`;
      section.appendChild(head);

      const grid = document.createElement("div");
      grid.className = "card-grid";

      items.forEach((item) => {
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
      sectionsEl.appendChild(section);
    });
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

  // ---------------- Interests: dropdown filter ----------------
  function renderInterestDropdown() {
    const list = document.getElementById("interest-list");
    const toggleLabel = document.getElementById("interest-toggle-label");

    INTERESTS.forEach((interest) => {
      const row = document.createElement("label");
      row.className = "interest-row";
      row.innerHTML = `<input type="checkbox" value="${interest}"> <span>${interest}</span>`;
      const checkbox = row.querySelector("input");
      checkbox.addEventListener("change", () => {
        if (checkbox.checked) state.interests.add(interest);
        else state.interests.delete(interest);
        updateInterestLabel();
        render();
      });
      list.appendChild(row);
    });

    function updateInterestLabel() {
      const n = state.interests.size;
      toggleLabel.textContent = n === 0 ? "Filter by interest" : `${n} interest${n === 1 ? "" : "s"} selected`;
      document.getElementById("interest-toggle").classList.toggle("active", n > 0);
    }

    const toggle = document.getElementById("interest-toggle");
    const dropdown = document.getElementById("interest-dropdown");
    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdown.classList.toggle("open");
    });
    document.addEventListener("click", (e) => {
      if (!dropdown.contains(e.target) && e.target !== toggle) {
        dropdown.classList.remove("open");
      }
    });

    document.getElementById("interest-clear").addEventListener("click", (e) => {
      e.stopPropagation();
      state.interests.clear();
      list.querySelectorAll("input").forEach((c) => (c.checked = false));
      updateInterestLabel();
      render();
    });

    updateInterestLabel();
  }

  // ---------------- Cost: slider filter ----------------
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
      render();
    });
    updateLabel();
  }

  document.getElementById("search-input").addEventListener("input", (e) => {
    state.query = e.target.value.trim();
    render();
  });

  document.getElementById("btn-clear-filters").addEventListener("click", () => {
    state.query = "";
    state.maxCostRank = 3;
    state.interests.clear();
    document.getElementById("search-input").value = "";
    document.getElementById("cost-slider").value = 3;
    document.getElementById("cost-slider-label").textContent = "Any price";
    document.querySelectorAll("#interest-list input").forEach((c) => (c.checked = false));
    document.getElementById("interest-toggle-label").textContent = "Filter by interest";
    document.getElementById("interest-toggle").classList.remove("active");
    render();
  });

  const backToTop = document.getElementById("back-to-top");
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("visible", window.scrollY > 600);
  });
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  renderInterestDropdown();
  initCostSlider();
  render();
})();
