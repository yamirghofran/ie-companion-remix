export interface Resource {
  id: number;
  name: string;
  description: string | null;
  content: string | null;
  type: string | null;
  items: ResourceItem[];
  createdAt: string;
  updatedAt: string;
}

export interface ResourceItem {
  id: number;
  name: string;
  description: string | null;
  url: string | null;
  type: string | null;
  resourceId: number;
  createdAt: string;
  updatedAt: string;
}

export type CreateResourceInput = Omit<Resource, 'id' | 'items' | 'createdAt' | 'updatedAt'>;
export type UpdateResourceInput = Partial<CreateResourceInput>;

export type CreateResourceItemInput = Omit<ResourceItem, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateResourceItemInput = Partial<Omit<CreateResourceItemInput, 'resourceId'>>;
