const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
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
    const newUser = req.body;
    newUser.id = uuidv4();
    await usersService.createUser(newUser);
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
    }
    const user = await usersService.getUserBy(userId);
    res
      .status(StatusCode.OK)
      .json(User.toResponse(user));
  })
  .put( async (req, res) => {
    const userId = req.params.id;
    const newUser = req.body;
    if (!checkvalidityUIID(userId)) {
      res
        .status(StatusCode.BadRequest)
        .json({error: `User id = ${userId} is not valid`});
    }
    const user = await usersService.putUserBy(userId, newUser);
    res
      .status(StatusCode.OK)
      .json(User.toResponse(user));
  })
  .delete( async (req, res) => {
    const userId = req.params.id;
    if (!checkvalidityUIID(userId)) {
      res
        .status(StatusCode.BadRequest)
        .json({error: `User id = ${userId} is not valid`});
    }
    await usersService.deleteUserBy(userId);
    res
      .status(StatusCode.NoContent)
      .end();
});

module.exports = router;
