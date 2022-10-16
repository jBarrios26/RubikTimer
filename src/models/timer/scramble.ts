export default interface Scramble {
  scramble: string;
  cubeType: CubeType;
}

export enum CubeType {
  threeByThree,
  fourByFour,
  twoByTwo,
}
