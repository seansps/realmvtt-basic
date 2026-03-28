// Here we need to determine if it was a hit or miss and display in the chat.
const tags = [
  {
    name: "Attack",
    tooltip: "Attack Roll",
  },
];

const mods = data.roll?.metadata?.modifiers || [];
const animation = data.roll?.metadata?.animation;
const tokenId = data.roll?.metadata?.tokenId;
const targetId = data.roll?.metadata?.targetId;

mods.forEach((mod) => {
  tags.push({
    name: `${mod.name} ${mod.value > 0 ? "+" : ""}${mod.value}`,
    tooltip: `Modifier for ${
      mod.name.charAt(0).toUpperCase() + mod.name.slice(1)
    }`,
  });
});

// Here you would check targets and their AC, etc.
api.sendMessage("", data.roll, [], tags);
if (animation && tokenId) {
  if (
    (animation.moveToDestination ||
      animation.stretchToDestination ||
      animation.destinationOnly) &&
    targetId
  ) {
    api.playAnimation(animation, tokenId, targetId);
  } else if (
    !animation.moveToDestination &&
    !animation.stretchToDestination &&
    !animation.destinationOnly
  ) {
    api.playAnimation(animation, tokenId, targetId);
  }
}
