// Env can take the value "deployment" or "local". If the env is local, get the env variables from the command line parameters. Otherwise, get them from deployment env vars.
let env = process.env.npm_config_env || "test";

let MONGO_DB_URI: string;

if (env === "deployment") {
    MONGO_DB_URI = process.env.mongo_db_uri || "";
} else {
    MONGO_DB_URI = process.env.npm_config_mongo_db_uri || "";
}

let jwtSignature: string = "jacobcaldwellisthecoolest:):):)";

export { MONGO_DB_URI, jwtSignature as jwtSecret };