// Here we need to determine if it was a hit or miss and display in the chat.
const name = data.roll?.metadata?.name;
const tags = [
  {
    name: "Damage",
    tooltip: "Damage Roll",
  },
];
if (name) {
  tags.push({
    name: name,
    tooltip: `${name} Damage Roll`,
  });
}

const mods = data.roll?.metadata?.modifiers || [];

mods.forEach((mod) => {
  tags.push({
    name: `${mod.name} ${mod.value > 0 ? "+" : ""}${mod.value}`,
    tooltip: `Modifier for ${mod.name.charAt(0).toUpperCase() + mod.name.slice(1)}`,
  });
});

const message = `
\`\`\`Apply_Damage
let damage = ${data.roll.total};
let targets = [record];
if (!record) {
  targets = api.getSelectedTokens().map(target => target.token);
}
targets.forEach(target => {
  // Apply wounds
  if (target && target.data) {
      // If damage > 0, float text
      if (damage > 0) {
        api.floatText(target, \`-\$\{damage\}\`, '#FF0000');
      }
    
      var curhp = target.data?.curhp || 0;
      curhp -= damage;
      if (curhp < 0) { curhp = 0; }
      if (curhp > target.data?.hitpoints) { curhp = target.data?.hitpoints; }
      const oldHp = (target.data?.curhp || 0);
      api.setValueOnToken(target, "data.curhp", curhp);
      const unIdentified = target.identified === false;
      const targetName = !unIdentified ? target.name || target.record.name : target.unidentifiedName || target.record.unidentifiedName;

      const message = \`\$\{targetName\} took \$\{damage\} damage.\`;
      const macro = \`\\\`\\\`\\\`Undo\\n api.setValueOnTokenById('\$\{target._id\}', '\$\{target.recordType\}', 'data.curhp', '\$\{oldHp\}'); api.editMessage(null, '~\$\{message\}~'); \\n\\\`\\\`\\\`\`;

      api.sendMessage(\`\$\{message\}\\n\$\{macro\}\`);
  }
});
\`\`\`
`;

// Here you would check targets and apply damage, etc.
api.sendMessage(message, data.roll, [], tags);
