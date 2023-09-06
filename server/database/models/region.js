export default (sequelize, DataTypes) => {
    return sequelize.define("regions", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        p_id: {
            type: DataTypes.INTEGER
        },
        region: {
            type: DataTypes.STRING
        }
    })
}