// src/pages/Practice.jsx
const Practice = () => {
  const users = [
    { name: "Alice", age: 25, city: "Thessaloniki" },
    { name: "Bob", age: 30, city: "Athens" },
  ];

  // Try your Object.entries experiments
  users.map((user, idx) => {
    console.log(`User ${JSON.stringify(user)} with idx ${idx}:`);
    Object.entries(user).map(([key, value]) => {
      console.log(`${key}: ${value}`);
    });
  });

  users.map((user,idx) => {
    console.log(`User is ${user} with idx ${idx}`)
  })

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Practice Page</h1>
      <p>Open the console to see your logs 👀</p>
    </div>
  );
};

export default Practice;

