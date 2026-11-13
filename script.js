document
    .getElementById("generateBtn")
    .addEventListener("click", generateCharacter);

document
    .getElementById("traits")
    .addEventListener("input", validateTraits);

document
    .getElementById("species")
    .addEventListener("change", updateSpeciesInputs);

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

            break;

        case "Elemental":

            options.style.display = "block";

            affinity1.style.display = "block";
            affinity1Label.style.display = "block";

            affinity1Label.textContent =
                "Additional Immunity";

            break;

        case "Plant":

            options.style.display = "block";

            affinity1.style.display = "block";
            affinity1Label.style.display = "block";

            affinity1Label.textContent =
                "Elemental Vulnerability";

            break;
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

}

    if (
    species === "Demon" &&
    affinity1 === affinity2
) {
    warning.textContent =
        "A Demon's two resistances should be different.";
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
