import express from 'express';
import { User } from './user.model';
import  usersService from './user.service';
import  { StatusCode } from '../../common/constants';
import  { checkvalidityUIID } from  '../../common/check-valid-uiid';
import { IUser } from '../../common/i-user';

const router = express.Router();

router.route('/')
  .get( async (req: express.Request, res: express.Response): Promise<void> => {
    const users: User[] = usersService.getAll();
   res
    .status(StatusCode.OK)
    .json(users.map(User.toResponse));
  })
  .post( async (req: express.Request, res: express.Response) => {
    const UserBody: IUser = req.body;
    const newUser: User = usersService.createUser(UserBody);
    res
      .status(StatusCode.Created)
      .json(User.toResponse(newUser));
});

router.route('/:id')
  .get( async (req: express.Request, res: express.Response) => {
    const userId: string = req.params.id;
    if (!checkvalidityUIID(userId)) {
      res
        .status(StatusCode.BadRequest)
        .json({error: `User id = ${userId} is not valid`});
    } else {
      const user = usersService.getUserBy(userId);
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
  .put( async (req: express.Request, res: express.Response) => {
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
  .delete( async (req: express.Request, res: express.Response) => {
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

export = router;
