import ListItem from './ListItem.ts';

interface List {
  list: ListItem[];

  load(): void,

  save(): void,

  clearList(): void,

  addItem(item: ListItem): void;

  deleteItem(id: string): void,
}

export default class FullList implements List {
  static instance: FullList = new FullList();

  constructor(private _list: ListItem[] = []) {}

  get list(): ListItem[] {
    return this._list;
  }

  load(): void {
    const storedList = localStorage.getItem('list');
    if (typeof storedList !== 'string') return;

    const list: {
      _id: string;
      _name: string;
      _isChecked: boolean;
    }[] = JSON.parse(storedList);

    list.forEach(item => {
      const newItem = new ListItem(item._id, item._name, item._isChecked);
      FullList.instance.addItem(newItem);
    })
  }

  save(): void {
    localStorage.setItem('list', JSON.stringify(this._list));
  }

  clearList(): void {
    this._list = [];
    this.save();
  }

  addItem(item: ListItem): void {
    this._list.push(item);
    this.save();
  }

  deleteItem(id: string): void {
    this._list = this._list.filter((item: ListItem) => item.id !== id);
    this.save();
  }
}