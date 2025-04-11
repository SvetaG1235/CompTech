import {Sequelize} from "sequelize";

const sequelizeDB = new Sequelize({
    dialect: "sqlite",
    storage: "Burger.db",
    define: {
        timestamps: false
    }
});

export default sequelizeDB