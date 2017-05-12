// Require bycrypt to create a hash to compare password against
var bcrypt = require("bcrypt-nodejs");

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
         },
         first_name:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: { len: [1]}
         },
         last_name: {
             type: DataTypes.STRING,
             allowNull: false,
             validate: { len: [1]}
         },
         email: {
             type: DataTypes.STRING,
             allowNull: false,
             unique: true,
             validate: {len: [1], isEmail: true}
         },
         password: {
           type: DataTypes.STRING
         },
         phone_number: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: { len: [10]}
         },
         twitter_link: {
             type: DataTypes.STRING,
             allowNull: true,
         },
         facebook_link: {
             type: DataTypes.STRING,
             allowNull: true
         }
    },

    {

      classMethods: {
          associate: function(models) {
              User.belongsTo(models.Trip, {constraints: false});

          }
      },

      instanceMethods: {
        validPassword: function(password) {
          return bcrypt.compareSync(password, this.password);
        }
      },

      // Before a user is created, we will automatically hash their password
      hooks: {
        beforeCreate: function(user, options, cb) {
          user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
          cb(null, options);
        }
      }
    });
  return User;
};

      //
      // {
      //
      //   classMethods: {
      //       associate: function(models) {
      //           User.belongsTo(models.Trip, {constraints: false});
      //
      //       }
      //   },
      //
      //   instanceMethods: {
      //     validPassword: function(password) {
      //       return bcrypt.compareSync(password, this.password);
      //     }
      //     // validPassword: function(password, cb) {
      //     //   bcrypt.compare(password, this.password, function(err, res, cb) {
      //     //     if (err) {
      //     //       console.log(err);
      //     //       cb(err);
      //     //     }
      //     //     cb(res);
      //     //   });
      //     // }
      //   },
      //
      //   // Hash user password and store that in the database in place of the password field
      //   hooks: {
      //     beforeCreate: function(user) {
      //       user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
      //       // hashPassword = bcrypt.hash(user.password, null, null
      //       // return  function(err, hash) {
      //       //   console.log(hash);
      //       //   user.password = hash;
      //       // });
      //     }
      //   }
      // });
