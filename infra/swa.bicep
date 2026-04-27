@description('Name of the Static Web App.')
param name string

@description('Azure region.')
param location string = resourceGroup().location

resource swa 'Microsoft.Web/staticSites@2024-04-01' = {
  name: name
  location: location
  sku: {
    name: 'Free'
    tier: 'Free'
  }
  properties: {
    allowConfigFileUpdates: true
    stagingEnvironmentPolicy: 'Enabled'
  }
}

output name string = swa.name
output defaultHostname string = swa.properties.defaultHostname
output resourceId string = swa.id
