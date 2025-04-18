import {Sequelize} from "sequelize";

const sequelizeDB = new Sequelize({
    dialect: "sqlite",
    storage: "Comp.db",
    define: {
        timestamps: false
    }
});

export default sequelizeDB