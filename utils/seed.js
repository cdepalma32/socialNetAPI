const connection = require("../config/connection");
const { Thought, User } = require("../models");

// 🔌 Handle connection errors
connection.on("error", (err) => console.error(err));

// 🚀 Once connected, start seeding process
connection.once("open", async () => {
  console.log("🔗 connected");

  try {
    // 🧹 Drop existing thoughts collection if it exists
    await connection.db
      .dropCollection("thoughts")
      .catch((err) => console.log("🚫 No thoughts collection to drop"));
    // 🧹 Drop existing users collection if it exists
    await connection.db
      .dropCollection("users")
      .catch((err) => console.log("🚫 No users collection to drop"));

    // 🧑‍🤝‍🧑 Create example users first
    const users = [];
    for (let i = 0; i < 10; i++) {
      users.push({
        username: `user${i}`,
        email: `user${i}@example.com`,
      });
    }
    const userDocs = await User.insertMany(users);
    console.log("👥 Users created.");
    console.table(
      userDocs.map((user) => ({ Username: user.username, Email: user.email }))
    ); // 📊 Display created users in a table

    // 💭 Create thoughts and reference users
    const thoughtDocs = await Thought.insertMany(
      userDocs.map((user, index) => ({
        thoughtText:
          index % 2 === 0 ? "I love pancakes" : "Today is a good day",
        username: user.username, // Link to user's username
      }))
    );
    console.log("🧠 Thoughts created.");
    console.table(
      thoughtDocs.map((thought) => ({
        Thought: thought.thoughtText,
        By: thought.username,
      }))
    ); // 📊 Display created thoughts in a table

    // 🔄 Optionally update users to hold thought references if needed
    for (const user of userDocs) {
      const userThoughts = thoughtDocs
        .filter((thought) => thought.username === user.username)
        .map((thought) => thought._id);
      await User.findByIdAndUpdate(user._id, {
        $set: { thoughts: userThoughts },
      });
    }
    console.log("🔗 Users updated with thoughts.");
    console.log("✅ Seeding complete! 🌱");
    console.log("🖨 Final User-Thought Links:");
    userDocs.forEach(async (user) => {
      const updatedUser = await User.findById(user._id).populate("thoughts");
      console.log(
        `User: ${updatedUser.username}, Thoughts: ${updatedUser.thoughts
          .map((thought) => thought.thoughtText)
          .join(", ")}`
      );
    });
  } catch (err) {
    console.error("❌ Error seeding data:", err);
  } finally {
    process.exit(0); // 🏁 Finish the process
  }
});