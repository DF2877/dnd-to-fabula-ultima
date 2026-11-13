document
    .getElementById("generateBtn")
    .addEventListener("click", generateCharacter);

document
    .getElementById("traits")
    .addEventListener("input", validateTraits);

document
    .getElementById("species")
    .addEventListener("change", updateSpeciesInputs);

document
    .getElementById("affinity1")
    .addEventListener("change", validateAffinities);

document
    .getElementById("affinity2")
    .addEventListener("change", validateAffinities);

const affinityText = {
    "-1": "VU",
    "0": "",
    "1": "RS",
    "2": "IM",
    "3": "AB"
};

const allElements = [

    { value: "fire", label: "Fire" },
    { value: "ice", label: "Ice" },
    { value: "bolt", label: "Bolt" },
    { value: "earth", label: "Earth" },
    { value: "air", label: "Air" },
    { value: "light", label: "Light" },
    { value: "dark", label: "Dark" },
    { value: "poison", label: "Poison" },
    { value: "physical", label: "Physical" }

];

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

function validateAffinities() {

    const species =
        document.getElementById("species").value;

    const affinity1 =
        document.getElementById("affinity1").value;

    const affinity2 =
        document.getElementById("affinity2").value;

    const warning =
        document.getElementById("affinityWarning");

    warning.textContent = "";

    if (
        species === "Demon" &&
        affinity1 === affinity2
    ) {
        warning.textContent =
            "Recommended: choose two different resistances.";
    }
}

const character = {

    name: "",

    cr: 0,

    level: 0,

    traits: [],

    species: "",

    stats: {

        dex: 6,

        ins: 6,

        mig: 6,

        wlp: 6

    },

    affinities: {},

    specialRules: []

};

function convertAttribute(stat) {

    let die = Math.round(stat / 10) * 2 + 6;

    die = Math.max(6, die);
    die = Math.min(12, die);

    return die;
}

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

function populateAffinityDropdown(dropdown, options) {

    dropdown.innerHTML = "";

    options.forEach(option => {

        const el =
            document.createElement("option");

        el.value = option.value;

        el.textContent = option.label;

        dropdown.appendChild(el);

    });
}

function updateSpeciesInputs() {

    const species =
        document.getElementById("species").value;

    const options =
        document.getElementById("affinityOptions");

    const affinity1 =
        document.getElementById("affinity1");

    const affinity2 =
        document.getElementById("affinity2");

    const affinity1Label =
        document.getElementById("affinity1Label");

    const affinity2Label =
        document.getElementById("affinity2Label");

    options.style.display = "none";

    affinity1.style.display = "none";
    affinity2.style.display = "none";

    affinity1Label.style.display = "none";
    affinity2Label.style.display = "none";

    switch(species) {

        case "Demon":

            options.style.display = "block";

            affinity1.style.display = "block";
            affinity2.style.display = "block";

            affinity1Label.style.display = "block";
            affinity2Label.style.display = "block";

            affinity1Label.textContent =
                "Resistance #1";

            affinity2Label.textContent =
                "Resistance #2";

    populateAffinityDropdown(
        affinity1,
        allElements
    );

    populateAffinityDropdown(
        affinity2,
        allElements
    );

            break;

        case "Elemental":

            options.style.display = "block";

            affinity1.style.display = "block";
            affinity1Label.style.display = "block";

            affinity1Label.textContent =
                "Additional Immunity";

    populateAffinityDropdown(
        affinity1,
        allElements.filter(
            e => e.value !== "poison"
        )
    );
            
            break;

        case "Plant":

            options.style.display = "block";

            affinity1.style.display = "block";
            affinity1Label.style.display = "block";

            affinity1Label.textContent =
                "Elemental Vulnerability";

    populateAffinityDropdown(
        affinity1,
        [
            { value: "air", label: "Air" },
            { value: "bolt", label: "Bolt" },
            { value: "fire", label: "Fire" },
            { value: "ice", label: "Ice" }
        ]
    );

            break;
    }

    document.getElementById("affinityWarning")
    .textContent = "";
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

updateSpeciesInputs();

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

    const affinity1 =
    document.getElementById("affinity1").value;

const affinity2 =
    document.getElementById("affinity2").value;

    const strength =
    Number(document.getElementById("str").value);

const dexterity =
    Number(document.getElementById("dex").value);

const constitution =
    Number(document.getElementById("con").value);

const intelligence =
    Number(document.getElementById("int").value);

const wisdom =
    Number(document.getElementById("wis").value);

const charisma =
    Number(document.getElementById("cha").value);
    
    character.name = name;
character.cr = cr;
character.level = level;
character.traits = traits;
character.species = species;

    character.stats.dex =
    convertAttribute(dexterity);

character.stats.ins =
    convertAttribute(intelligence);

character.stats.mig =
    convertAttribute(
        (strength + constitution) / 2
    );

character.stats.wlp =
    convertAttribute(
        (wisdom + charisma) / 2
    );
    
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

    document.getElementById("dexValue")
    .textContent =
    `d${character.stats.dex}`;

document.getElementById("insValue")
    .textContent =
    `d${character.stats.ins}`;

document.getElementById("migValue")
    .textContent =
    `d${character.stats.mig}`;

document.getElementById("wlpValue")
    .textContent =
    `d${character.stats.wlp}`;

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

        case "Demon":

    setAffinity(affinity1, 1);
    setAffinity(affinity2, 1);

    break;

        case "Elemental":

    setAffinity("poison", 2);

    setAffinity(affinity1, 2);

    character.specialRules.push(
        "Immune to poisoned."
    );

    break;

        case "Plant":

    applyVulnerability(affinity1);

    character.specialRules.push(
        "Immune to dazed, shaken and enraged."
    );

    break;

        case "Undead":

    setAffinity("dark", 2);

    setAffinity("poison", 2);

    applyVulnerability("light");

    character.specialRules.push(
        "Immune to poisoned."
    );

    character.specialRules.push(
        "When an effect (such as an Arcanum, a potion or a spell) would cause an undead creature to recover Hit Points, whoever controls that effect may instead have the undead lose half as many Hit Points."
    );

    break;

        case "Monster":

    // No innate affinities
    // No innate special rules

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

    validateAffinities();

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
