const bcrypt = require("bcryptjs");
const { sequelize, ensureDatabaseExists } = require("./config/database");
const { User, Course, Lesson, Enrollment } = require("./models");
const { ROLES } = require("./constants/roles");

const run = async () => {
  await ensureDatabaseExists();
  await sequelize.authenticate();
  await sequelize.sync({ alter: true });

  const password = await bcrypt.hash("Password123!", 12);

  const [admin] = await User.findOrCreate({
    where: { email: "admin@example.com" },
    defaults: { fullName: "Main Admin", password, role: ROLES.ADMIN },
  });

  const [instructor] = await User.findOrCreate({
    where: { email: "instructor@example.com" },
    defaults: { fullName: "Main Instructor", password, role: ROLES.INSTRUCTOR },
  });

  const [student] = await User.findOrCreate({
    where: { email: "student@example.com" },
    defaults: { fullName: "Main Student", password, role: ROLES.STUDENT },
  });

  const [course] = await Course.findOrCreate({
    where: { title: "Node.js API Fundamentals" },
    defaults: {
      description: "REST API, Express and Sequelize fundamentals",
      category: "Programming",
      level: "beginner",
      price: 0,
      isPublished: true,
      instructorId: instructor.id,
    },
  });
  const [lesson1] = await Lesson.findOrCreate({
    where: { courseId: course.id, order: 1 },
    defaults: {
      title: "REST basics",
      content: "HTTP methods, routes and response codes",
      duration: 30,
      courseId: course.id,
      order: 1,
    },
  });

  await Lesson.findOrCreate({
    where: { courseId: course.id, order: 2 },
    defaults: {
      title: "Express structure",
      content: "Routes, controllers,services and middleware",
      duration: 40,
      courseId: course.id,
      order: 2,
    },
  });

  await Enrollment.findOrCreate({
    where: { userId: student.id, courseId: course.id },
    defaults: { status: "active", progress: 25 },
  });
  console.log("Seed completed");
  console.log("Admin: admin@example.com / Password123!");
  console.log("Instructor: instructor@example.com / Password123!");
  console.log("Student: student@example.com / Password123!");
};

run()
  .catch((err) => {
    console.error("seed failed:", err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await sequelize.close();
  });
