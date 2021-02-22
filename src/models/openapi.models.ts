export interface Tag {
  name: string
  description: string
}

export interface ApiSection extends Tag {
  'x-id': string
}

export interface ApiResource extends Tag {
  'x-section-id': string
}

export interface ServerShape {
  description: string
  url: string
}

export interface OpenApiShape {
  info: any
  components: {
    securitySchemes: any
    schemas: any
  }
  openapi: string
  paths: {
    [path: string]: {
      [operation: string]: any
    }
  }
  servers: ServerShape[]
  tags: (ApiSection | ApiResource)[]
}

export interface ApiOperation {
  operationId: string
  tags: string[]
  description: string
  path: string
  requestBody: OperationRequestBody
  responses: any
  security: any
  summary: string
  verb: string
  resource: ApiResource
  parameters?: OperationParameter[]
}

export interface OperationParameter {
  name: string
  in: string
  description: string
  required: boolean
  value?: any // added by us in openapi.service.tsx
  schema: {
    type: 'string' | 'integer' | 'boolean'
    enum?: any[]
    items?: {
      type: string
      enum?: string[]
      properties?: {
        [key: string]: {
          type?: string
          maxLength?: string
        }
      }
      readonly?: boolean
      format?: string
      example?: any
    }
  }
}

export interface OperationRequestBody {
  required: boolean
  description: string
  content: {
    'application/json': {
      schema: {
        allOf: {
          type: 'string'
          example: any
          properties: {
            [key: string]: {
              type: string
              maxLength?: number
              format?: string
              minLength?: string
            }
          }
        }[]
        required: string[]
      }
    }
  }
}

export interface OrderCloudProps {
  openapi: OpenApiShape
  sections: ApiSection[]
  resources: ApiResource[]
  operations: ApiOperation[]
  operationsById: {
    [operationId: string]: ApiOperation
  }
  operationsByResource: {
    [resource: string]: ApiOperation[]
  }
}
