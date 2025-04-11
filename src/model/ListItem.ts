export interface Item {
  id: string;
  name: string;
  isChecked: boolean;
}

export default class ListItem implements Item {
  constructor(
      private _id: string = '',
      private _name: string = '',
      private _isChecked: boolean = false,
  ) {}

  get id(): string {
    return this._id;
  }

  set id(id: string) {
    this._id = id;
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get isChecked(): boolean {
    return this._isChecked;
  }

  set isChecked(isChecked: boolean) {
    this._isChecked = isChecked;
  }
}