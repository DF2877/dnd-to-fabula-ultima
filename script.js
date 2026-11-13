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
}
