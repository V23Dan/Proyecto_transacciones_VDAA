import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const rol = sequelize.define(
  "rol",
  {
    idRol: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nameRol: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

export default sequelize.model("rol", rol);
