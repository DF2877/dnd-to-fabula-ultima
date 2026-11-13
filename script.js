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

function setAffinity(elements, type, value) {

    if (
        strength[value] >
        strength[elements[type]]
    ) {
        elements[type] = value;
    }
}

function applyVulnerability(
    elements,
    type
) {

    const current = elements[type];

    switch(current) {

        case "ab":
            elements[type] = "im";
            break;

        case "im":
            elements[type] = "rs";
            break;

        case "rs":
            elements[type] = "neutral";
            break;

        default:
            elements[type] = "vu";
    }

}

const character = {

    species: species,
    traits: traits,

    affinities: affinities,

    rules: rules

};
