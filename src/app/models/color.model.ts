export enum Color {
  WHITE = 'WHITE',
  BLACK = 'BLACK',
}

export namespace Color {
  export function getOpposite(color: Color) {
    return color === Color.WHITE ? Color.BLACK : Color.WHITE;
  }
}
