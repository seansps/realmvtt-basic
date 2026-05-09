const name = data?.roll?.metadata?.name;
const animation = data?.roll?.metadata?.animation;
const tokenId = data?.roll?.metadata?.tokenId;
const targetId = data?.roll?.metadata?.targetId;

const tags = [
  {
    name: "Ability",
    tooltip: "Ability Roll",
  },
];
if (name) {
  tags.push({
    name: name,
    tooltip: `${name} Ability Roll`,
  });
}

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
