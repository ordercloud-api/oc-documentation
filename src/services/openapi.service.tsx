import SwaggerParser from 'swagger-parser'
import { groupBy, keyBy, mapValues, values, flatten } from 'lodash'
import {
  OrderCloudProps,
  OpenApiShape,
  ApiSection,
  ApiResource,
} from '../models/openapi.models.js'

interface OpenApiResult {
  oc?: OrderCloudProps
}
const result: OpenApiResult = {
  oc: null,
}

export const Initialize = async (
  parsedSpec?: OrderCloudProps
): Promise<OrderCloudProps> => {
  if (parsedSpec && !result.oc) {
    return (result.oc = {
      openapi: parsedSpec.openapi,
      sections: parsedSpec.sections,
      resources: parsedSpec.resources,
      operations: parsedSpec.operations,
      operationsById: parsedSpec.operationsById,
      operationsByResource: parsedSpec.operationsByResource,
    })
  }
  if (result.oc) return result.oc
  if (!parsedSpec && !result.oc) {
    const parsedSpec: any = await SwaggerParser.dereference(
      'https://api.ordercloud.io/v1/openapi/v3'
    )
    const sections = parsedSpec.tags.filter(tag => tag['x-id'])
    const resources = parsedSpec.tags
      .filter(tag => tag['x-section-id'])
      .concat(GetSubsectionsToAdd())
    const operations = flatten(
      values(
        mapValues(parsedSpec.paths, (ops, path) => {
          return values(
            mapValues(ops, (o, verb) => {
              const tags =
                o.tags[0] === 'Me' ? [GetSubSectionName(path)] : o.tags
              const resource = resources.filter(r => r.name === tags[0])[0]
              const section = sections.filter(
                s => s['x-id'] === resource['x-section-id']
              )[0]
              return { ...o, verb, path, tags, resource, section }
            })
          )
        })
      )
    )

    return (result.oc = {
      openapi: parsedSpec,
      sections,
      resources,
      operations,
      operationsById: keyBy(operations, 'operationId'),
      operationsByResource: groupBy(operations, o => {
        return o.tags[0]
      }),
    })
  }
}

class OpenApi {
  get spec(): OpenApiShape {
    return result.oc.openapi
  }

  get sections(): ApiSection[] {
    return result.oc.sections
  }

  get resources(): ApiResource[] {
    return result.oc.resources
  }

  get operations(): any[] {
    return result.oc.operations
  }

  get operationsById(): {
    [operationId: string]: any
  } {
    return result.oc.operationsById
  }

  get operationsByResource(): {
    [resource: string]: any
  } {
    return result.oc && result.oc.operationsByResource
  }

  public initialize = Initialize

  public findResourceByName(resourceName: string): ApiResource | undefined {
    return result.oc.resources.find(resource => resource.name === resourceName)
  }

  public findResource(operationId: string): ApiResource | undefined {
    const operation = result.oc.operationsById[operationId]
    const resourceName = operation.tags[0]
    return result.oc.resources.find(resource => resource.name === resourceName)
  }

  public findOperation(operationId: string): any | undefined {
    const operation = result.oc.operationsById[operationId]
    if (operation.parameters && operation.parameters.length) {
      operation.parameters.map(param => {
        switch (param.schema.type) {
          case 'string':
            param.value = ''
            break
          case 'integer':
            param.value = param.required ? 0 : undefined
            break
          case 'boolean':
            param.value = false
            break
          default:
            break
        }
      })
    }
    return operation
  }
}

/**
 * This section contains modifications to the OC API swagger spec.
 * They change how routes are grouped.
 * Instead of all the /me routes belonging directly to the MeAndMyStuff section, they are broken into subsections
 * Those new subsections are in the object below
 */

// This method is used to attach the correct subsection to routes.
const GetSubSectionName = (path: string) => {
  const sec = MeSubSections.find(sec => sec.paths.includes(path))
  return sec ? sec.name : null
}

const GetSubsectionsToAdd = () => {
  return MeSubSections.filter(sec => sec.name !== 'Me') // There is already a Me subsection
}

const MeSubSections = [
  {
    name: 'Me',
    'x-section-id': 'MeAndMyStuff',
    paths: ['/me', '/me/register', '/me/password'],
  },
  {
    name: 'My Cost Centers',
    'x-section-id': 'MeAndMyStuff',
    paths: ['/me/costcenters'],
  },
  {
    name: 'My User Groups',
    'x-section-id': 'MeAndMyStuff',
    paths: ['/me/usergroups'],
  },
  {
    name: 'My Addresses',
    'x-section-id': 'MeAndMyStuff',
    paths: ['/me/addresses', '/me/addresses/{addressID}'],
  },
  {
    name: 'My Credit Cards',
    'x-section-id': 'MeAndMyStuff',
    paths: ['/me/creditcards', '/me/creditcards/{creditcardID}'],
  },
  {
    name: 'My Categories',
    'x-section-id': 'MeAndMyStuff',
    paths: ['/me/categories', '/me/categories/{categoryID}'],
  },
  {
    name: 'My Products',
    'x-section-id': 'MeAndMyStuff',
    paths: [
      '/me/products',
      '/me/products/{productID}',
      '/me/products/{productID}/specs',
      '/me/products/{productID}/specs/{specID}',
    ],
  },
  {
    name: 'My Orders',
    'x-section-id': 'MeAndMyStuff',
    paths: ['/me/orders', '/me/orders/approvable'],
  },
  {
    name: 'My Promotions',
    'x-section-id': 'MeAndMyStuff',
    paths: ['/me/promotions', '/me/promotions/{promotionID}'],
  },
  {
    name: 'My Spending Accounts',
    'x-section-id': 'MeAndMyStuff',
    paths: ['/me/spendingAccounts', '/me/spendingaccounts/{spendingAccountID}'],
  },
  {
    name: 'My Shipments',
    'x-section-id': 'MeAndMyStuff',
    paths: [
      '/me/shipments',
      '/me/shipments/{shipmentID}',
      '/me/shipments/{shipmentID}/items',
    ],
  },
  {
    name: 'My Catalogs',
    'x-section-id': 'MeAndMyStuff',
    paths: ['/me/catalogs', '/me/catalogs/{catalogID}'],
  },
]

export default new OpenApi()
