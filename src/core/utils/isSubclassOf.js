export function isSubclassOf(subclass, superclass) {
  let proto = Object.getPrototypeOf(subclass);
  while (proto) {
    if (proto === superclass) return true;
    proto = Object.getPrototypeOf(proto);
  }
  return false;
}
