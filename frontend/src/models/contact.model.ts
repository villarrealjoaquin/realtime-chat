export interface Contact {
  id: string;
  username: string;
  email: string;
  alias: string;
  contacts?: Contact[];
}