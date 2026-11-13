document
    .getElementById("generateBtn")
    .addEventListener("click", generateCharacter);

document
    .getElementById("traits")
    .addEventListener("input", validateTraits);

const affinityText = {
    "-1": "VU",
    "0": "",
    "1": "RS",
    "2": "IM",
    "3": "AB"
};

function validateTraits() {

    const traits =
        document.getElementById("traits")
            .value
            .split(",")
            .map(t => t.trim())
            .filter(t => t);

    const warning =
        document.getElementById("traitsWarning");

    if (traits.length !== 4) {

        warning.textContent =
            `Recommended: 4 traits (currently ${traits.length}).`;

    } else {

        warning.textContent = "";

    }
}

const character = {

    name: "",

    cr: 0,

    level: 0,

    traits: [],

    species: "",

    affinities: {},

    specialRules: []

};

function parseCR(value) {

    value = value.trim();

    if (value.includes("/")) {

        const [num, den] = value.split("/");

        return Number(num) / Number(den);
    }

    return Number(value);
}

function calculateLevel(cr) {

    const doubled = cr * 2;

    return Math.ceil(doubled / 5) * 5;
}

function updateSpeciesInputs() {

    const species =
        document.getElementById("species").value;

    const options =
        document.getElementById("affinityOptions");

    if (
        species === "Demon" ||
        species === "Elemental" ||
        species === "Plant"
    ) {

        options.style.display = "block";

    } else {

        options.style.display = "none";

    }
}

function resetAffinities() {

    return {
        fire: 0,
        ice: 0,
        bolt: 0,
        earth: 0,
        air: 0,
        light: 0,
        dark: 0,
        poison: 0,
        physical: 0
    };
}

function setAffinity(element, value) {

    character.affinities[element] =
        Math.max(character.affinities[element], value);
}

function applyVulnerability(element) {

    character.affinities[element]--;
}

function generateCharacter() {

    const name =
        document.getElementById("name").value;

    const cr =
        parseCR(
            document.getElementById("cr").value
        );

    const level =
        calculateLevel(cr);

    const traitsText =
        document.getElementById("traits").value;

    const traits =
        traitsText
            .split(",")
            .map(t => t.trim())
            .filter(t => t);

    validateTraits();

    const species =
    document.getElementById("species").value;

    character.name = name;
character.cr = cr;
character.level = level;
character.traits = traits;
character.species = species;
    
    document.getElementById("characterName").textContent =
        name || "Unnamed Character";

    document.getElementById("characterLevel").textContent =
        level;

    document.getElementById("characterTraits").textContent =
        traits.join(", ");

    character.species =
    document.getElementById("species").value;

    document.getElementById("characterSpecies")
    .textContent = character.species;

character.affinities = resetAffinities();

character.specialRules = [];

switch (species) {

    case "Beast":

        character.specialRules.push(
            "Cannot acquire the Use Equipment Skill."
        );

        break;

    case "Construct":

        setAffinity(
            "earth",
            1
        );

        setAffinity(
            "poison",
            2
        );

        character.specialRules.push(
            "Immune to poisoned."
        );

        break;

    case "Humanoid":

        character.specialRules.push(
            "Use Equipment."
        );

        break;

}

for (const element in character.affinities) {

    const div =
        document.getElementById(
            element + "Element"
        );

    div.className = "element";

    const value =
        character.affinities[element];

    let state = "neutral";

    if (value === -1) state = "vu";
    if (value === 1) state = "rs";
    if (value === 2) state = "im";

    div.classList.add(state);

    const displayName =
        element.charAt(0).toUpperCase() +
        element.slice(1);

    div.innerHTML = `
    <div>${displayName}</div>
    <div>${affinityText[value] || "&nbsp;"}</div>
`;
    
}

const ruleList =
    document.getElementById(
        "specialRulesList"
    );

ruleList.innerHTML = "";

character.specialRules.forEach(rule => {

    const li =
        document.createElement("li");

    li.textContent = rule;

    ruleList.appendChild(li);
});

}
