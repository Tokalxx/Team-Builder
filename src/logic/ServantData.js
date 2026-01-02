// =========================================
// EFFECT KEYWORDS
// Maps high-level effect categories to regex
// patterns found in skill / NP descriptions
// =========================================
const EFFECTS = {
  DAMAGE_UP: [
    /Quick Card effectiveness/i,
    /Arts Card effectiveness/i,
    /Buster Card effectiveness/i,
    /ATK/i,
    /Attack/i,
    /NP Strength/i,
    /Critical Strength/i,
    /Ignore DEF/i,
    /Ignore Invincible/i,
    /Sure Hit/i,
  ],
  NP_GAIN: [/NP Gauge/i, /NP Gain/i, /NP Charge/i],
  SURVIVAL: [
    /DEF/i,
    /Damage Cut/i,
    /Evade/i,
    /Invincible/i,
    /anti-Enforcement/i,
    /remove Debuffs/i,
    /Target Focus/i,
    /Debuff Resist/i,
    /Debuff Immune/i,
    /remove Debuffs/i,
    /Death Resistance/i,
    /Death Immune/i,
    /Buff Removal Resist/i,
    /Max HP/i,
    /Healing effectiveness/i,
    /restore HP/i,
    /Guts/i,
  ],
  DEBUFF: [
    /Charm/i,
    /immobilize/i,
    /NP Seal/i,
    /Skill Seal/i,
    /Stun/i,
    /Curse/i,
    /decrease Charge/i,
  ],
};

// =========================================
// TARGET KEYWORDS
// Determines who the skill affects
// =========================================
const TARGETS = {
  SELF: [/your/i, /yourself/i],
  ALLY: [/ally/i, /allies/i],
  ENEMY: [/enemy/i, /enemies/i],
};

// =========================================
// ROLE RULES
// Each rule describes:
// - role name
// - priority value
// - condition for when the role applies
// =========================================
const ROLE = [
  {
    role: "DPS",
    value: 1,
    when: ({ effects, targets }) =>
      effects.includes("DAMAGE_UP") && targets.includes("SELF"),
  },
  {
    role: "Support",
    value: 3,
    when: ({ effects, targets }) =>
      effects.includes("NP_GAIN") ||
      (effects.includes("DAMAGE_UP") && targets.includes("ALLY")),
  },
  {
    role: "Sustain",
    value: 2,
    when: ({ effects, targets }) =>
      effects.includes("SURVIVAL") && targets.includes("ALLY"),
  },
  {
    role: "Debuffer",
    value: 4,
    when: ({ effects, targets }) =>
      effects.includes("DEBUFF") && targets.includes("ENEMY"),
  },
];

// =========================================
// NORMALIZE TEXT
// Makes skill text consistent for regex matching
// =========================================
function normalize(text) {
  return text.toLowerCase().replace(/["▲]/g, "").replace(/\s+/g, " ").trim();
}

// =========================================
// EXTRACT EFFECTS & TARGETS FROM SKILL TEXT
// =========================================
export function skillDataExtract(skillText) {
  const skills = normalize(skillText);

  const effects = [];
  const targets = [];

  // Check which EFFECT categories appear in text
  for (const [effect, patterns] of Object.entries(EFFECTS)) {
    if (patterns.some((p) => p.test(skills))) {
      effects.push(effect);
    }
  }

  // Check which TARGET categories appear in text
  for (const [target, patterns] of Object.entries(TARGETS)) {
    if (patterns.some((p) => p.test(skills))) {
      targets.push(target);
    }
  }

  return { effects, targets };
}

// =========================================
// SCORE A SINGLE SKILL / NP
// Each role receives either 0 or 1
// =========================================
function scoreSkill(skillText) {
  const data = skillDataExtract(skillText);

  const scores = {
    DPS: 0,
    Support: 0,
    Sustain: 0,
    Debuffer: 0,
  };

  ROLE.forEach(({ role, when }) => {
    if (when(data)) {
      scores[role] += 1;
    }
  });

  return scores;
}

// =========================================
// CLASSIFY A SERVANT BASED ON ALL SKILLS + NP
// =========================================
export function classifyServantRoles(servant) {
  // Collect all skill and NP descriptions
  const texts = [
    ...(servant.skills?.map((s) => s.detail) ?? []),
    ...(servant.noblePhantasms?.map((np) => np.detail) ?? []),
  ];

  // Running totals per role
  const totals = {
    DPS: 0,
    Support: 0,
    Sustain: 0,
    Debuffer: 0,
  };

  // Score each skill / NP and accumulate totals
  texts.forEach((text) => {
    const score = scoreSkill(text);
    Object.keys(totals).forEach((role) => {
      totals[role] += score[role];
    });
  });

  return totals;
}

export function getServantRoles(totals) {
  return Object.entries(totals)
    .filter(([_, value]) => value > 1)
    .map(([role]) => role);
}

// =========================================
//Currently Unset
// =========================================
function skillClassify(skills) {
  const data = skillDataExtract(skills);
  let roles = new Set();

  ROLE.forEach((rule) => {
    if (rule.when(data)) {
      roles.add(rule.value);
    }
  });
}
