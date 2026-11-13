document
    .getElementById("generateBtn")
    .addEventListener("click", generateCharacter);

document
    .getElementById("traits")
    .addEventListener("input", validateTraits);

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
    species: "",
    affinities: {
        fire: 0,
        ice: 0,
        bolt: 0,
        earth: 0,
        air: 0,
        light: 0,
        dark: 0,
        poison: 0,
        physical: 0
    },
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

function resetAffinities(character) {

    for (const element in character.affinities) {
        character.affinities[element] = 0;
    }

    character.specialRules = [];
}

switch(character.species) {

    case "Beast":

        character.specialRules.push(
            "Cannot acquire the Use Equipment Skill."
        );

        break;

    case "Construct":

        character.affinities.poison = 2;
        character.affinities.earth = 1;

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
}

