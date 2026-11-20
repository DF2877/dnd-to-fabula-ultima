document
    .getElementById("name")
    .addEventListener("input", updateCharacter);

document
    .getElementById("traits")
    .addEventListener("input", updateCharacter);

document
    .getElementById("cr")
    .addEventListener("input", updateCharacter);

document
    .getElementById("hpInput")
    .addEventListener("input", updateCharacter);

document
    .getElementById("acInput")
    .addEventListener("input", updateCharacter);

document
    .getElementById("creatureType")
    .addEventListener("change", () => {

        updateSpeciesInputs();
        updateCharacter();

    });

document
    .getElementById("affinity1")
    .addEventListener("change", updateCharacter);

document
    .getElementById("affinity2")
    .addEventListener("change", updateCharacter);

document
    .querySelectorAll(".attribute-inputs input")
    .forEach(input => {
        input.addEventListener("input", updateCharacter);
    });

document
    .getElementById("addAttackBtn")
    .addEventListener("click", addAttackInput);

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

const speciesMap = {

    "Aberration": "Monster",
    "Beast": "Beast",
    "Celestial": "Monster",
    "Construct": "Construct",
    "Dragon": "Monster",
    "Elemental": "Elemental",
    "Fey": "Elemental",
    "Fiend": "Demon",
    "Giant": "Humanoid",
    "Humanoid": "Humanoid",
    "Monstrosity": "Monster",
    "Ooze": "Monster",
    "Plant": "Plant",
    "Undead": "Undead"

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

function validateAffinities() {

    const creatureType =
    document.getElementById("creatureType").value;
    
    const species =
    speciesMap[creatureType];

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

    skillCount: 0,

    idealHp: 30,

    idealDef: 6,

    idealMDef: 6,

    level: 0,

    traits: [],

    species: "",

    stats: {

        dex: 6,

        ins: 6,

        mig: 6,

        wlp: 6

    },
    
armor: "No Armor",
    
def: 6,
mdef: 6,

    affinities: {},

    specialRules: [],

    skillBudget: 0

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

    const creatureType =
    document.getElementById("creatureType").value;
    
    const species =
    speciesMap[creatureType];

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

let nextAttackId = 0;

function addAttackInput() {

    const attacksContainer =
        document.getElementById("attacksContainer");

    const attackDiv =
        document.createElement("div");

    attackDiv.className = "attack-input";

    attackDiv.dataset.attackId =
        nextAttackId++;
    
    attackDiv.innerHTML = `

    <div class="attackRow">

        <input
            type="text"
            class="attackName"
            placeholder="Attack Name">

        <select class="attackRange">

            <option value="melee">
                Melee
            </option>

            <option value="ranged">
                Ranged
            </option>

        </select>

        <button
            type="button"
            class="deleteAttackBtn">

            Delete

        </button>

    </div>

`;

    attackDiv
    .querySelectorAll("input, select")
    .forEach(control => {

        const eventType =
            control.tagName === "SELECT"
                ? "change"
                : "input";

        control.addEventListener(
            eventType,
            updateCharacter
        );

    });

    attacksContainer.appendChild(attackDiv);

}

function getSecondaryAttackAttribute(range) {

    const priorities =
        range === "melee"
            ? ["MIG", "DEX", "WLP", "INS"]
            : ["DEX", "MIG", "INS", "WLP"];

    let bestAttribute =
        priorities[0];

    let bestValue =
        character.stats[
            bestAttribute.toLowerCase()
        ];

    for (const attribute of priorities) {

        const value =
            character.stats[
                attribute.toLowerCase()
            ];

        if (value > bestValue) {

            bestValue = value;

            bestAttribute = attribute;
        }

    }

    return bestAttribute;
}

function calculateSkillBudget() {

    let budget = 0;

    budget += Math.floor(
        character.level / 10
    );

    for (const element in character.affinities) {

        if (
            character.affinities[element] === -1
        ) {

            budget +=
                element === "physical"
                ? 2
                : 1;

        }

    }

    return budget;

}

updateSpeciesInputs();

function updateCharacter() {

    character.skillCount = 0;
    
    const name =
        document.getElementById("name").value;

    const cr =
        parseCR(
            document.getElementById("cr").value
        );

    const hpInput =
    Number(
        document.getElementById("hpInput").value
    );

const acInput =
    Number(
        document.getElementById("acInput").value
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

    const creatureType =
    document.getElementById("creatureType").value;

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

    character.idealHp =
    30 + hpInput / 5;

character.idealDef =
    6 + (acInput - 5) / 3;

    character.idealDef =
    Math.max(
        6,
        Math.min(
            12,
            character.idealDef
        )
    );
    
    const effectiveMDefAC =
    (acInput + wisdom) / 2;
    
character.idealMDef =
    6 +
    (effectiveMDefAC - 5) / 3;

    character.idealMDef =
    Math.max(
        6,
        Math.min(
            12,
            character.idealMDef
        )
    );
    
character.level = level;
character.traits = traits;

    const species =
    speciesMap[creatureType];

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

    character.skillBudget =
    calculateSkillBudget();

    character.attacks = [];

document
    .querySelectorAll(".attack-input")
    .forEach(attackDiv => {

        const name =
            attackDiv
                .querySelector(".attackName")
                .value
                .trim();

        if (!name) {
            return;
        }

        const range =
    attackDiv
        .querySelector(".attackRange")
        .value;

        character.attacks.push({

    id: Number(
        attackDiv.dataset.attackId
    ),

    name: name,

    range: range

});

    });

    const attacksList =
    document.getElementById("attacksList");

attacksList.innerHTML = "";

character.attacks.forEach(attack => {

    const li =
        document.createElement("li");

    const icon =
        attack.range === "ranged"
            ? "🏹"
            : "⚔️";

    const primary =
        attack.range === "melee"
            ? "MIG"
            : "DEX";

    const secondary =
        getSecondaryAttackAttribute(
            attack.range
        );

    li.textContent =
        `${icon} ${attack.name} •【${primary} + ${secondary}】•【HR + 5】 physical damage`;

    attacksList.appendChild(li);

});

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

    const canUseArmor =
    character.specialRules.includes(
        "Use Equipment."
    );

    let armors = [
    {
        name: "No Armor",
        def: character.stats.dex,
        mdef: character.stats.ins
    }
];

if (canUseArmor) {

    armors.push(
        {
            name: "Silk Shirt",
            def: character.stats.dex,
            mdef: character.stats.ins + 2
        },
        {
            name:
                character.level < 20
                ? "Travel Garb"
                : "Combat Tunic",

            def: character.stats.dex + 1,
            mdef: character.stats.ins + 1
        },
        {
            name: "Sage Robe",
            def: character.stats.dex + 1,
            mdef: character.stats.ins + 2
        },
        {
            name: "Brigandine",
            def: 10,
            mdef: character.stats.ins
        },
        {
            name: "Bronze Plate",
            def: 11,
            mdef: character.stats.ins
        },
        {
            name: "Runic Plate",
            def: 11,
            mdef: character.stats.ins + 1
        },
        {
            name: "Steel Plate",
            def: 12,
            mdef: character.stats.ins
        }
    );
}

    let bestArmor =
    armors[0];

let bestFit =
    Math.abs(
        bestArmor.def -
        character.idealDef
    )
    +
    Math.abs(
        bestArmor.mdef -
        character.idealMDef
    );

for (const armor of armors) {

    const fit =
        Math.abs(
            armor.def -
            character.idealDef
        )
        +
        Math.abs(
            armor.mdef -
            character.idealMDef
        );

    if (fit < bestFit) {

        bestFit = fit;

        bestArmor = armor;
    }
}

    character.armor =
    bestArmor.name;

character.def =
    bestArmor.def;

character.mdef =
    bestArmor.mdef;

    for (let i = 0; i < 2; i++) {

    const currentFit =
        Math.abs(
            character.def -
            character.idealDef
        )
        +
        Math.abs(
            character.mdef -
            character.idealMDef
        );

    const fitA =
        Math.abs(
            character.def + 2 -
            character.idealDef
        )
        +
        Math.abs(
            character.mdef + 1 -
            character.idealMDef
        );

    const fitB =
        Math.abs(
            character.def + 1 -
            character.idealDef
        )
        +
        Math.abs(
            character.mdef + 2 -
            character.idealMDef
        );

    const bestNewFit =
        Math.min(fitA, fitB);

    if (bestNewFit >= currentFit) {
        break;
    }

    if (fitA <= fitB) {

        character.def += 2;
        character.mdef += 1;

    } else {

        character.def += 1;
        character.mdef += 2;
    }

    character.skillCount++;
}

    document.getElementById("defValue")
    .textContent =
    Math.round(character.def);

document.getElementById("mdefValue")
    .textContent =
    Math.round(character.mdef);

}

addAttackInput();
updateSpeciesInputs();
updateCharacter();
