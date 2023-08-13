interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Business Owner'],
  customerRoles: ['Customer'],
  tenantRoles: ['Business Owner', 'SOP Writing Expert'],
  tenantName: 'Company',
  applicationName: 'Captain SOP',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
};
