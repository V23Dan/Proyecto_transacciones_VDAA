import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const rolUser = sequelize.define(
  "rolUser",
  {
    nameRol: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    documento: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ingreso: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    timestamps: true,
  }
);

export default sequelize.model("rolUser", rolUser);
