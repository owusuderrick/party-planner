const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "/2602-Derrick";
const RESOURCE = "/events"; // Parties API uses "events"
const API = BASE + COHORT + RESOURCE;

let parties = [];
let selectedParty = null;

/** Fetch all parties and update state */
async function getParties() {
  try {
    const res = await fetch(API);
    if (!res.ok) throw new Error("Failed to fetch parties");

    const data = await res.json();
    parties = data.data;
    render();
  } catch (err) {
    console.error("Error in getParties:", err);
    alert("Could not load parties.");
  }
}

/** Fetch a single party by ID and update state */
async function getParty(id) {
  try {
    const res = await fetch(`${API}/${id}`);
    if (!res.ok) throw new Error("Failed to fetch party");

    const data = await res.json();
    selectedParty = data.data;
    render();
  } catch (err) {
    console.error("Error in getParty:", err);
    alert("Could not load party details.");
  }
}

// === Component: Party List Item ===

function PartyListItem(party) {
  const li = document.createElement("li");
  const a = document.createElement("a");

  a.href = "#selected";
  a.textContent = party.name;

  a.addEventListener("click", () => {
    getParty(party.id);
  });

  li.appendChild(a);
  return li;
}

// Component: Party List

function PartyList() {
  const ul = document.createElement("ul");
  ul.classList.add("party-list");

  parties.forEach((party) => {
    ul.appendChild(PartyListItem(party));
  });

  return ul;
}

//  Component: Party Details

function PartyDetails() {
  const section = document.createElement("section");

  if (!selectedParty) {
    const p = document.createElement("p");
    p.textContent = "Please select a party to see details.";
    section.appendChild(p);
    return section;
  }

  const h3 = document.createElement("h3");
  h3.textContent = `${selectedParty.name} #${selectedParty.id}`;

  const date = document.createElement("p");
  date.textContent = `Date: ${selectedParty.date}`;

  const location = document.createElement("p");
  location.textContent = `Location: ${selectedParty.location}`;

  const desc = document.createElement("p");
  desc.textContent = selectedParty.description;

  section.append(h3, date, location, desc);
  return section;
}

// Render Function

function render() {
  const app = document.querySelector("#app");

  app.innerHTML = `
    <h1>Party Planner</h1>
    <main>
      <section>
        <h2>Upcoming Parties</h2>
        <PartyList></PartyList>
      </section>

      <section id="selected">
        <h2>Party Details</h2>
        <PartyDetails></PartyDetails>
      </section>
    </main>
  `;

  app.querySelector("PartyList").replaceWith(PartyList());
  app.querySelector("PartyDetails").replaceWith(PartyDetails());
}

async function init() {
  await getParties();
  render();
}

init();
