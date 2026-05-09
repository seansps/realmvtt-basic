const name = data?.roll?.metadata?.name;

const tags = [
  {
    name: "Attribute",
    tooltip: "Attribute Roll",
  },
];
if (name) {
  tags.push({
    name: name,
    tooltip: `${name} Attribute Roll`,
  });
}

api.sendMessage("", data.roll, [], tags);
