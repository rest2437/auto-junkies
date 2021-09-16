# `Auto Junkies`

Auto Junkies is a subdivision of HoodRats Forum. Its primary purpose is to allow Users to post help adds and connect with Providers on a client and provider level so that they may arrange diagnosis and repairs outide of the Forum network.

---

![mock-up](./layout.png)

---

## Structure

---

- Home page lists options to sign in as User or Provider.
- Will have an option to view previous posts from users so potentially new users may have an idea of how to use the website.

---

### User Model

---

- Once logged in, Users will be able to navigate through their profile, create posts, edit posts, and delete posts. Users will also have a notifications tab where they can view the providers that are interested in completing the work.

---

### Provider Model

---

- Once logged in, Providers will be able to review Users posts so that they may express interest in their capability of completing the job in which the User posted. The Provider will not have access to view other providers, only users posts. Once the provider deems they are confident of the repair, they may express interest by "liking" the add which will in turn send the user a notification with the Providers information.

---

### languages + Dependencies

---

- Node.js
- Axios
- Bcrypt
- Connect-flash
- Dotenv
- Ejs
- Express-ejs-layouts
- Express-session
- Passport
- Passport-local
- Sequelize
- Sequelize-cli
- DB = PostgreSQL

---

### Models - Providers

- ```js
  Module.exports = (sequelize, DataTypes) => {
    class Provider extends Model {
      static associate(models) {}
    }
    Provider.init(
      {
        name: {
          type: DataTypes.STRING,
          validate: {
            len: {
              args: [1, 99],
              msg: "Name must be between 1 and 99 characters",
            },
          },
        },
        email: {
          type: DataTypes.STRING,
          validate: {
            isEmail: {
              msg: "Invalid email",
            },
          },
        },
        password: {
          type: DataTypes.STRING,
          validate: {
            len: {
              args: [8, 99],
              msg: "Password must be between 8 and 99 characters",
            },
          },
        },
      },
      {
        sequelize,
        modelName: "Provider",
      }
    );
  ```
  ***

### Models - Users

- ```js
  module.exports = (sequelize, DataTypes) => {
    class User extends Model {
      static associate(models) {
      }
    }
    User.init(
      {
        name: {
          type: DataTypes.STRING,
          validate: {
            len: {
              args: [1, 99],
              msg: "Name must be between 1 and 99 characters",
            },
          },
        },
        email: {
          type: DataTypes.STRING,
          validate: {
            isEmail: {
              msg: "Invalid email",
            },
          },
        },
        password: {
          type: DataTypes.STRING,
          validate: {
            len: {
              args: [8, 99],
              msg: "Password must be between 8 and 99 characters",
            },
          },
        },
      },
      {
        sequelize,
        modelName: "User",
      }
    );
  ```

---

### Blockers

---

- Getting both profiles separated was hard... One main thing that was fighting me in the beginning was using passport. Passport would not recognize the provider so we separated both like below

```js
//Provider//
providerRouter.post(
  "/login",
  passport.authenticate("provider-local", {
    successRedirect: "/",
    failureRedirect: "/provider/login",
    successFlash: "Welcome back ...",
    failureFlash: true,
  })
);

//User//
userRouter.post(
  "/login",
  passport.authenticate("user-local", {
    successRedirect: "/",
    failureRedirect: "/user/login",
    successFlash: "Welcome back ...",
    failureFlash: true,
  })
);
```

---
