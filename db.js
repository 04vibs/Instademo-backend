const Sequelize = require('sequelize');
const db = new Sequelize(
    'instadb',
    'instauser'  ,
    'insta'      ,{

        dialect: 'mysql',
        host: 'localhost',

})


const User = db.define('users',{
    name:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,

    }


})

const image = db.define('images',{
    imagepath:{
        type: Sequelize.STRING,
        allowNull: true,
    }

})

image.belongsTo(User);

db.sync({force: false}).then(() => {
    console.log('Database has been synced')
}).catch((err) => {
    console.log(err);
});

module.exports = {
    User,image
}