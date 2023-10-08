export interface User {
  name: string;
  password: string;
}

export const getEmptyUser = (): User => ({
  name: '',
  password: '',
});
