import { ComponentType } from 'react'

export type SSRPage<P = {}, T = {}> = ComponentType<T & { pageData: P }> & {
  loadData: () => Promise<P>;
};