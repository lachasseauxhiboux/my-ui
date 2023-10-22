import { Constructor } from "./constructor.type";

export type MyColor = 'primary' | 'secondary' | 'filled' | 'call-end' | 'user-defined';

export interface Colorable<TColor = MyColor> {
  color: TColor;
}

type ColorableCtor<TColor> = Constructor<Colorable<TColor>>;

