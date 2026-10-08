const User = require("./user.model");
const Course = require("./course.model");
const Lesson = require("./lesson.model");
const Enrollment = require("./enrollment.model");

User.hasMany(Course, {
  as: "courses",
  foreignKey: "instructorId",
  onDelete: "CASCADE",
});
Course.belongsTo(User, {
  as: "instructor",
  foreignKey: "instructorId",
});
Course.hasMany(Lesson, {
  as: "lessons",
  foreignKey: "courseId",
  onDelete: "CASCADE",
});
Lesson.belongsTo(Course, {
  as: "course",
  foreignKey: "courseId",
  onDelete: "CASCADE",
});
User.belongsToMany(Course, {
  through: Enrollment,
  as: "enrolledCourses",
  foreignKey: "userId",
  otherKey: "courseId",
});
Enrollment.belongsTo(User, {
  as: "user",
  foreignKey: "userId",
  onDelete: "CASCADE",
});
User.hasMany(Enrollment, {
  as: "enrollments",
  foreignKey: "userId",
  onDelete: "CASCADE",
});
Course.hasMany(Enrollment, {
  as: "enrollments",
  foreignKey: "courseId",
  onDelete: "CASCADE",
});
Course.belongsToMany(User, {
  through: Enrollment,
  as: "students",
  foreignKey: "courseId",
  otherKey: "userId",
});
Enrollment.belongsTo(Course, {
  as: "course",
  foreignKey: "courseId",
  onDelete: "CASCADE",
});
module.exports = { User, Course, Lesson, Enrollment };
