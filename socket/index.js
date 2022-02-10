const io = require("socket.io")(8900, {
    cors: {
        origin: "http://localhost:3000",
    },
});

let users = [];

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};

io.on("connection", (socket) => {
    //when connect
    console.log("a user connected.", users);

    //take userId and socketId from user
    socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
    });

    //send and get message
    socket.on("sendMessage", ({ 
        _id,
        conversation,
        senderId, 
        receiverId,
        text }) => {
    const user = users?.find((user) => user.userId === receiverId);
    io.to(user?.socketId).emit("getMessage", {
        _id,
        conversation,
        senderId,
        receiverId,
        text
    })
    });

    //send and get public message
    socket.on("sendPublicMessage", ({ 
        _id,
        conversation,
        senderId,
        members,
        text }) => {
    const onlineMembers = users?.filter(user => members.includes(user.userId))
    onlineMembers.filter(m => m !== senderId).map(m => 
        io.to(m.socketId).emit("getPublicMessage", {
        _id,
        conversation,
        senderId,
        members,
        text
    })
    )
    });

    //disconnect
    socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
    });
});