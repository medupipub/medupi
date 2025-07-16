declare module "@glidejs/glide" {
    export default class Glide {
      constructor(selector: string | Element, options?: PortableTextBlock[]);
      mount(): void;
      destroy(): void;
      go(pattern: string): void;
      on(event: string, handler: Function): void;
      update(options?: any): void;
    }
  }
  