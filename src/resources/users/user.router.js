const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const { StatusCode } = require('../../common/constants');
const { checkvalidityUIID } = require('../../common/check-valid-uiid');

router.route('/')
  .get( async (req, res) => {
    const users = await usersService.getAll();
   res
    .status(StatusCode.OK)
    .json(users.map(User.toResponse));
  })
  .post( async (req, res) => {
    const UserBody = req.body;
    const newUser = await usersService.createUser(UserBody);
    res
      .status(StatusCode.Created)
      .json(User.toResponse(newUser));
});

router.route('/:id')
  .get( async (req, res) => {
    const userId = req.params.id;
    if (!checkvalidityUIID(userId)) {
      res
        .status(StatusCode.BadRequest)
        .json({error: `User id = ${userId} is not valid`});
    } else {
      const user = await usersService.getUserBy(userId);
      if (!user) {
        res
        .status(StatusCode.NotFound)
        .json({error: `User id = ${userId} is not found`});
      } else {
        res
        .status(StatusCode.OK)
        .json(User.toResponse(user));
      }
    }
  })
  .put( async (req, res) => {
    const userId = req.params.id;
    const UserBody = req.body;
    if (!checkvalidityUIID(userId)) {
      res
        .status(StatusCode.BadRequest)
        .json({error: `User id = ${userId} is not valid`});
    } else {
      const updatedUser = await usersService.updateUserBy(userId, UserBody);
      if (!updatedUser) {
        res
        .status(StatusCode.NotFound)
        .json({error: `User id = ${userId} is not found`});
      } else {
        res
        .status(StatusCode.OK)
        .json(User.toResponse(updatedUser));
      }
    }

  })
  .delete( async (req, res) => {
    const userId = req.params.id;
    if (!checkvalidityUIID(userId)) {
      res
        .status(StatusCode.BadRequest)
        .json({error: `User id = ${userId} is not valid`});
    } else {
      const user = await usersService.getUserBy(userId);
      if (!user) {
        res
        .status(StatusCode.NotFound)
        .json({error: `User id = ${userId} is not found`});
      } else {
        await usersService.deleteUserBy(userId);
        res
          .status(StatusCode.NoContent)
          .end();
      }
    }
});

module.exports = router;
