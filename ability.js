const name = data?.roll?.metadata?.data?.name;
const animation = data?.roll?.metadata?.animation;
const tokenId = data?.roll?.metadata?.tokenId;
const targetId = data?.roll?.metadata?.targetId;

api.sendMessage(
  "",
  data.roll,
  [],
  [
    {
      name: name || "Ability",
      tooltip: `${name || ""} Ability Roll`,
    },
  ]
);

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
