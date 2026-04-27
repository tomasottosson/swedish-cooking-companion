targetScope = 'subscription'

@description('Azure region for all resources.')
param location string = 'westeurope'

@description('Name of the resource group.')
param resourceGroupName string = 'rg-swedish-cooking-companion'

@description('Name of the Static Web App.')
param staticWebAppName string = 'swedish-cooking-companion'

resource rg 'Microsoft.Resources/resourceGroups@2024-03-01' = {
  name: resourceGroupName
  location: location
}

module swa 'swa.bicep' = {
  scope: rg
  name: 'deploy-${staticWebAppName}'
  params: {
    name: staticWebAppName
    location: location
  }
}

output resourceGroupName string = rg.name
output staticWebAppName string = swa.outputs.name
output defaultHostname string = swa.outputs.defaultHostname
