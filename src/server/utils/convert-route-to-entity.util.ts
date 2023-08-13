const mapping: Record<string, string> = {
  companies: 'company',
  experts: 'expert',
  sops: 'sop',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
