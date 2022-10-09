export function search(users, str) {
  const strRegExp = new RegExp(`${str}`, "gi");
  return users.filter((user) => strRegExp.test(user.name));
}
