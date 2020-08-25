// puerto
process.env.PORT = process.env.PORT || 3000;
process.env.NODE_ENV = process.env.NODE_ENV || "dev";
process.env.NODE_ENVDB = process.env.NODE_ENV === "dev"
    ? "mongodb://localhost:27017/cafe"
    : "mongodb+srv://kaaru:GamJTIoPV1bkQ7AX@cluster0.8bg3t.mongodb.net/test";
