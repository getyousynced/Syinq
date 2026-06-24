declare module "@iconscout/react-unicons" {
  import type { ComponentType, SVGProps } from "react";
  export type UniconProps = SVGProps<SVGSVGElement> & {
    size?: number | string;
    color?: string;
  };
  export const UilCar: ComponentType<UniconProps>;
  export const UilUsersAlt: ComponentType<UniconProps>;
  export const UilShoppingBag: ComponentType<UniconProps>;
  export const UilCommentDots: ComponentType<UniconProps>;
  const unicons: Record<string, ComponentType<UniconProps>>;
  export default unicons;
}
