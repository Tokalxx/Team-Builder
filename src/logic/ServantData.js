const EFFECTS = {
  DAMAGE_UP: [
    / Quick Card effectiveness/i,
    / Arts Card effectiveness/i,
    / Buster Card effectiveness/i,
    / ATK/i,
    / Attack/i,
    / NP Strength/i,
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
  DEBUFF: [/Charm/i, /immobilize/i, /NP Seal/i, /Skill Seal/i, /Stun/i],
};

const TARGETS = {
  SELF: [/your/i, /yourself/i],
  ALLY: [/ally/i, /ally's/i],
  ENEMY: [/enemy/i, /enemies/i],
};

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
      effects.includes("NP_GAIN") && targets.includes("ALLY"),
  },
  {
    role: "Sustain",
    value: 2,
    when: ({ effects }) =>
      effects.includes("SURVIVAL") &&
      (targets.includes("ALLY") || targets.includes("SELF")),
  },
  {
    role: "Debuffer",
    value: 4,
    when: ({ effects, targets }) =>
      effects.includes("DEBUFF") && targets.includes("ENEMY"),
  },
];

function normalize(text) {
  return text.toLowerCase().replace(/["▲]/g, "").replace(/\s+/g, " ").trim();
}

export function skillDataExtract(skillText) {
  const skills = normalize(skillText);

  const effects = [];
  const targets = [];

  for (const [effect, patterns] of Object.entries(EFFECTS)) {
    if (patterns.some((p) => p.test(skills))) {
      effects.push(effect);
    }
  }

  for (const [target, patterns] of Object.entries(TARGETS)) {
    if (patterns.some((p) => p.test(skills))) {
      targets.push(target);
    }
  }

  return { effects, targets };
}

function scoreSkill(skillText) {
  const { effects, targets } = skillDataExtract(skillText);

  return {
    DPS:
      effects.includes("DAMAGE_UP") &&
      (targets.includes("SELF") || targets.includes("ENEMY"))
        ? 1
        : 0,

    Support: effects.includes("NP_GAIN") && targets.includes("ALLY") ? 1 : 0,

    Sustain: effects.includes("SURVIVAL") && targets.includes("ALLY") ? 1 : 0,

    Debuffer: effects.includes("DEBUFF") && targets.includes("ENEMY") ? 1 : 0,
  };
}

export function classifyServantRoles(servant) {
  const texts = [
    ...(servant.skills?.map((s) => s.detail) ?? []),
    ...(servant.noblePhantasms?.map((np) => np.detail) ?? []),
  ];

  const totals = {
    DPS: 0,
    Support: 0,
    Sustain: 0,
    Debuffer: 0,
  };

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
    .filter(([_, value]) => value > 0)
    .map(([role]) => role);
}

function skillClassify(skills) {
  const data = skillDataExtract(skills);
  let roles = new Set();

  ROLE.forEach((rule) => {
    if (rule.when(data)) {
      roles.add(rule.value);
    }
  });
}
