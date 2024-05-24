import MenuSchema from "../models/menu.model.js";

export default class MenuService {
  constructor() {
    this.menuSchema = new MenuSchema();
  }

  async menuElements() {
    try {
      const resMenu = await this.menuSchema.consultMenu();
      return resMenu;
    } catch (error) {
      console.log(`${error} in_service_orders`);
    }
  }
  async createAnElement(body) {
    try {
      await this.valideEntrances(body);
      if (body.level === 1) body.parent_id = null;
      if (body.level === 2 || body.level === 3) {
        const whereInsert = await this.menuSchema.consultFindWhereInsert(body);
        body.parent_id = whereInsert.id;
      }
      const resToCreate = await this.menuSchema.consultCreateElementMenu(body);
      if (resToCreate) {
        return { idElementCreate: resToCreate };
      }
    } catch (error) {
      throw error;
    }
  }
  async modifiedAnElement(idToModified, body) {
    try {
      await this.valideEntrances(body);
      const resUpdateElement = await this.menuSchema.consultModifiedElementMenu(
        idToModified,
        body
      );
      console.log(resUpdateElement);
      return resUpdateElement;
    } catch (error) {
      throw error;
    }
  }
  async deleteAnElement(idToDelete) {
    try {
      const resToDelete = await this.menuSchema.consultDeleteElementMenu(
        idToDelete
      );
      if (resToDelete.affectedRows === 0) {
        throw new Error("id Not Found");
      } else return { elementsAfeccted: resToDelete.affectedRows };
    } catch (error) {
      throw error;
    }
  }
  async valideEntrances(ins) {
    const regex = /[*;`]/g;
    if (
      typeof ins.name != "string" ||
      ins.name.match(regex) ||
      typeof ins.level != "number" ||
      ins.level === 0 ||
      ins.level > 3 ||
      ins.parent.match(regex)
    ) {
      throw new Error("invalidValues");
    }
  }
}
