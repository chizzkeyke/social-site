export interface SiderPropsLinksInterface {
   path: string
   namePath: string
}

export interface SiderPropsInterface {
   isOpen: boolean
   links: SiderPropsLinksInterface[]
   isClose: () => void
}