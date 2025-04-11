import FullList from "../model/FullList"

interface DOMList {
  ul: HTMLUListElement,
  clear(): void,
  render(fullList: FullList): void,
}

export default class ListTemplate implements DOMList {

  ul: HTMLUListElement

  static instance: ListTemplate = new ListTemplate()

  private constructor() {
    this.ul = document.getElementById("listItems") as HTMLUListElement
  }

  clear(): void {
    this.ul.innerHTML = ''
  }

  render(fullList: FullList): void {
    this.clear()

    fullList.list.forEach(item => {
      const li = document.createElement("li") as HTMLLIElement
      li.className = "item"

      const check = document.createElement("input") as HTMLInputElement
      check.type = "checkbox"
      check.id = item.id
      check.checked = item.isChecked
      li.append(check)

      check.addEventListener('change', () => {
        item.isChecked = !item.isChecked
        fullList.save()
      })

      const label = document.createElement("label") as HTMLLabelElement
      label.htmlFor = item.id
      label.textContent = item.name
      li.append(label)

      const button = document.createElement("button") as HTMLButtonElement
      button.className = 'button'
      button.textContent = 'X'
      li.append(button)

      button.addEventListener('click', () => {
        fullList.deleteItem(item.id)
        this.render(fullList)
      })

      this.ul.append(li)
    })
  }
}