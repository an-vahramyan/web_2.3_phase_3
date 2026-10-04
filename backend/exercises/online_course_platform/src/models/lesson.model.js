const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Lesson = sequalize.define(
  "Lesson",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRRING(200),
      allowNull: false,
      validate: { notEmpty: true },
    },
    contet: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    videoUrl: {
      type: DataTypes.STRING(500),
      allowNull: true,
      validate: { isUrl: true },
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1, isInt: true },
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1, isInt: true },
    },
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "lessons",
    timestamps: true,
    indexes: [{ unique: true, fields: ["course_id", "order"] }],
  },
);
module.exports = Lesson;
