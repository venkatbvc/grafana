import { ScopedVars } from './ScopedVars';

/**
 * Callback info for DataLink click events
 */
export interface DataLinkClickEvent<T = any> {
  origin: T;
  scopedVars: ScopedVars;
  e?: any; // mouse/react event?
}

/**
 * Link configuration.  The values may contain variables that need to be
 * processed before running
 */
export interface DataLink {
  title: string;
  targetBlank?: boolean;

  // 3: The URL if others did not set it first
  url: string;

  // 2: If exists, use this to construct the URL
  // Not saved in JSON/DTO
  onBuildHref?: (event: DataLinkClickEvent) => string;

  // 1: If exists, handle click directly
  // Not saved in JSON/DTO
  onClick?: (event: DataLinkClickEvent) => void;
}

export type LinkTarget = '_blank' | '_self';

/**
 * Processed Link Model.  The values are ready to use
 */
export interface LinkModel<T> {
  href: string;
  title: string;
  target: LinkTarget;
  origin: T;

  // If exists, call this when clicked
  // with context it is: React.MouseEvent<HTMLAnchorElement>
  onClick?: (e: any) => void;
}

/**
 * Provides a way to produce links on demand
 *
 * TODO: ScopedVars in in GrafanaUI package!
 */
export interface LinkModelSupplier<T extends object> {
  getLinks(scopedVars?: any): Array<LinkModel<T>>;
}
