// puerto
process.env.PORT = process.env.PORT || 3000;
process.env.NODE_ENV = process.env.NODE_ENV || "dev";
process.env.NODE_ENVDB = process.env.NODE_ENV === "dev"
    ? "mongodb://localhost:27017/cafe"
    : process.env.mongoURI;
//caducidad token
process.env.TOKEN_EXP=60*60*24;
//seed token
process.env.TOKEN_SEED=process.env.TOKEN_SEED||"secret";