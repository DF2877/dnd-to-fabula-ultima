document
    .getElementById("generateBtn")
    .addEventListener("click", generateCharacter);

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

function generateCharacter() {

    const name =
        document.getElementById("name").value;

    const crText =
        document.getElementById("cr").value;

    const cr =
        parseCR(crText);

    const level =
        calculateLevel(cr);

    document.getElementById("characterName").textContent =
        name || "Unnamed Character";

    document.getElementById("characterLevel").textContent =
        level;
}

const traits = traitsInput
    .split(",")
    .map(t => t.trim())
    .filter(t => t);

if (traits.length !== 4) {
    alert("Please enter exactly 4 traits.");
    return;
}

speciesSelect.addEventListener(
    "change",
    updateSpeciesInputs
);

const affinities = {

    air: "neutral",
    bolt: "neutral",
    dark: "neutral",
    earth: "neutral",
    fire: "neutral",
    ice: "neutral",
    light: "neutral",
    poison: "neutral",
    physical: "neutral"

};

const strength = {

    vu: 0,
    neutral: 1,
    rs: 2,
    im: 3,
    ab: 4

};

function setAffinity(type, value) {
    affinities[type] =
        Math.max(affinities[type], value);
}


function applyVulnerability(type) {
    affinities[type]--;
}

const character = {

    species: species,
    traits: traits,

    affinities: affinities,

    rules: rules

};

character.specialRules = [];

switch(character.species) {

    case "Beast":

        character.specialRules.push(
            "Cannot acquire the Use Equipment Skill."
        );

        break;

    case "Construct":

        setAffinity("earth", "rs");
        setAffinity("poison", "im");

        character.specialRules.push(
            "Immune to poisoned."
        );

        break;

    case "Demon":

        setAffinity(character.affinity1, "rs");
        setAffinity(character.affinity2, "rs");

        break;

    case "Elemental":

        setAffinity("poison", "im");
        setAffinity(character.affinity1, "im");

        character.specialRules.push(
            "Immune to poisoned."
        );

        break;

    case "Humanoid":

        character.specialRules.push(
            "Use Equipment."
        );

        break;

    case "Plant":

        applyVulnerability(character.affinity1);

        character.specialRules.push(
            "Immune to dazed, shaken and enraged."
        );

        break;

    case "Undead":

        setAffinity("dark", "im");
        setAffinity("poison", "im");

        applyVulnerability("light");

        character.specialRules.push(
            "Immune to poisoned."
        );

        character.specialRules.push(
            "When an effect would cause this creature to recover Hit Points, the controller of that effect may instead have it lose half as many Hit Points."
        );

        break;
}

const affinities = {
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

const affinityText = {
    "-1": "VU",
    "0": "",
    "1": "RS",
    "2": "IM",
    "3": "AB"
};
