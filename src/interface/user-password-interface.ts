// Interface to my hash classes to my code

export interface IPassWordHesher {
  hash(pw: string): Promise < string >
}