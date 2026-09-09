import { NamespaceJson } from "../types/FabloConfigJson";
import { NamespaceConfig, OrgConfig } from "../types/FabloConfigExtended";
import defaults from "./defaults";

const extendNamespaceConfig = (namespaceJsonFormat: NamespaceJson, orgsTransformed: OrgConfig[]): NamespaceConfig => ({
  name: namespaceJsonFormat.name,
  policy: namespaceJsonFormat.policy ?? defaults.namespace.policy(orgsTransformed),
});

export const checkUniqueNamespaceNames = (namespacesJsonFormat: NamespaceJson[]): void => {
  const namespaceNames = new Set<string>();

  namespacesJsonFormat.forEach((namespace) => {
    if (namespaceNames.has(namespace.name)) {
      throw new Error(`Duplicate namespace '${namespace.name}' found. Namespace names must be unique.`);
    }
    namespaceNames.add(namespace.name);
  });
};

const extendNamespacesConfig = (namespacesJsonFormat: NamespaceJson[], orgsTransformed: OrgConfig[]): NamespaceConfig[] => {
  checkUniqueNamespaceNames(namespacesJsonFormat);
  return namespacesJsonFormat.map((ns) => extendNamespaceConfig(ns, orgsTransformed));
};

export default extendNamespacesConfig;