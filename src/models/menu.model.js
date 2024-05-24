import { connection } from "./connection/connectDb.js";

export default class MenuSchema {
  constructor() {}
  async consultMenu() {
    try {
      const [menuRes] = await connection.query(`SELECT * FROM menu`);
      return menuRes;
    } catch (error) {
      console.log(`${error} in_db_consult`);
      throw error;
    }
  }
  async consultCreateElementMenu(elementsInsert) {
    try {
      const [addElementWithParent] =
        await connection.query(`INSERT INTO menu (name, parent_id, level) VALUE
         ("${elementsInsert.name}",${elementsInsert.parent_id} , ${elementsInsert.level}) WHERE NOT EXISTS (
          SELECT 1
          FROM menu
          WHERE name = "${elementsInsert.name}"'
      );`);

      /* const [addElement] = await connection.query(
          `INSERT INTO menu (name, parent_id, level) VALUES ("${elementsInsert.name}",${elementsInsert.parent_id} , ${elementsInsert.level});`
        ); */

      return addElementWithParent;
    } catch (error) {
      console.log(`${error} in_db_consult`);
      throw error;
    }
  }
  async consultModifiedElementMenu(id, bodyModifi) {
    try {
      const [modifiedElement] = await connection.query(
        ` UPDATE menu
        SET name = '${bodyModifi.name}', level = ${bodyModifi.level}
        WHERE id = ${+id};`
      );

      console.log(modifiedElement);
      //return modifiedElement;
    } catch (error) {
      console.log(`${error} in_db_consult`);
      throw error;
    }
  }
  async consultDeleteElementMenu(idToD) {
    try {
      const [deleteElement] = await connection.query(
        `DELETE FROM menu WHERE id = ${idToD}`
      );

      return deleteElement;
    } catch (error) {
      console.log(`${error} in_db_consult`);
      throw error;
    }
  }

  async consultFindWhereInsert(els) {
    try {
      const [findElementMenu] = await connection.query(
        `SELECT id FROM menu WHERE name = ${els.parent} AND level = ${
          els.parent - 1
        };`
      );

      if (findElementMenu.length === 0) {
        throw new Error("parent not found");
      }
      return findElementMenu;
    } catch (error) {
      throw error;
    }
  }
}
